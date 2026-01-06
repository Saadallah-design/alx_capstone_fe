import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

export default function FleetManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null); // Null for Add mode, vehicle object for Edit mode

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'Economy',
    transmission: 'AUTOMATIC',
    fuel_type: 'PETROL',
    vehicle_type: 'CAR',
    daily_rental_rate: '',
    licence_plate: '',
    branch_id: '',
    // Specs
    seats: 4,
    engine_capacity_cc: '',
    is_air_conditioned: true,
    is_helmet_included: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesRes, branchesRes] = await Promise.all([
          apiClient.get('/api/vehicles/'),
          apiClient.get('/api/branches/')
        ]);
        setVehicles(vehiclesRes.data);
        setBranches(branchesRes.data);
        if (branchesRes.data.length > 0) {
          setFormData(prev => ({ ...prev, branch_id: branchesRes.data[0].id }));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTypeChange = (value) => {
    setFormData(prev => ({ 
      ...prev, 
      vehicle_type: value,
      // Default adjustments based on type
      seats: value === 'CAR' ? 4 : 2,
      is_air_conditioned: value === 'CAR',
      is_helmet_included: value !== 'CAR'
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Structure the data for the backend (including nested specs)
      const vehicleData = {
        make: formData.make,
        model: formData.model,
        year: formData.year,
        vehicle_type: formData.vehicle_type,
        daily_rental_rate: formData.daily_rental_rate,
        licence_plate: formData.licence_plate,
        current_location: formData.branch_id,
        specs: {
          transmission: formData.transmission,
          fuel_type: formData.fuel_type,
          seats: formData.seats,
          engine_capacity_cc: formData.engine_capacity_cc || null,
          is_air_conditioned: formData.is_air_conditioned,
          is_helmet_included: formData.is_helmet_included,
        }
      };

      const formDataToSend = new FormData();
      // Add vehicle data as a single JSON blob if your backend supports it, 
      // or append fields individually if it expects flat multipart.
      // Based on my recommendation, we'll append individual fields but structure flat for simplicity
      // and let the user's manual backend update handle the nesting if they prefer.
      // HOWEVER, let's try to match the "nested" expectation by sending them with dots or brackets if common,
      // but since I gave the code for 'specs_data = validated_data.pop("specs")', 
      // the best way is to send 'specs' as a JSON string IF the parser handles it, 
      // OR send them as individual fields and reconstruct in the serializer.
      
      // Let's go with a hybrid: append flat fields but name them so they're easy to identify,
      // OR send the whole data object as a JSON string under one key.
      
      // I'll append them individually for maximum compatibility with standard MultiPartParser
      Object.keys(vehicleData).forEach(key => {
        if (key === 'specs') {
          // If the backend recom I gave is used, it expects a dict. 
          // But FormData can only take strings/blobs. 
          // So we send individual specs fields or the whole object as JSON.
          formDataToSend.append('specs', JSON.stringify(vehicleData[key]));
        } else {
          formDataToSend.append(key, vehicleData[key]);
        }
      });
      
      selectedImages.forEach((image, index) => {
        formDataToSend.append(`images[${index}][image]`, image);
        // Automatically make the first image the main one
        if (index === 0) {
          formDataToSend.append(`images[${index}][is_main]`, 'true');
        }
      });

      let response;
      if (editingVehicle) {
        response = await apiClient.patch(`/api/vehicles/${editingVehicle.slug}/`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? response.data : v));
      } else {
        response = await apiClient.post('/api/vehicles/', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setVehicles(prev => [response.data, ...prev]);
      }
      
      handleCloseModal();
    } catch (err) {
      console.error("Error saving vehicle:", err);
      const msg = err.response?.data ? 
        Object.entries(err.response.data).map(([k, v]) => `${k}: ${v}`).join(', ') : 
        "Failed to save vehicle.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (vehicle) => {
    if (!window.confirm(`Are you sure you want to delete the ${vehicle.make} ${vehicle.model}?`)) return;
    
    try {
      await apiClient.delete(`/api/vehicles/${vehicle.slug}/`);
      setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      setError("Failed to delete vehicle. It might be linked to existing bookings.");
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      category: vehicle.category || 'Economy',
      transmission: vehicle.specs?.transmission || 'AUTOMATIC',
      fuel_type: vehicle.specs?.fuel_type || 'PETROL',
      vehicle_type: vehicle.vehicle_type || 'CAR',
      daily_rental_rate: vehicle.daily_rental_rate || '',
      licence_plate: vehicle.licence_plate || '',
      branch_id: vehicle.current_location || '',
      seats: vehicle.specs?.seats || (vehicle.vehicle_type === 'CAR' ? 4 : 2),
      engine_capacity_cc: vehicle.specs?.engine_capacity_cc || '',
      is_air_conditioned: vehicle.specs?.is_air_conditioned ?? true,
      is_helmet_included: vehicle.specs?.is_helmet_included ?? false,
    });
    setImagePreviews(vehicle.images?.map(img => img.image) || []);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      category: 'Economy',
      transmission: 'AUTOMATIC',
      fuel_type: 'PETROL',
      vehicle_type: 'CAR',
      daily_rental_rate: '',
      licence_plate: '',
      branch_id: branches[0]?.id || '',
      seats: 4,
      engine_capacity_cc: '',
      is_air_conditioned: true,
      is_helmet_included: false,
    });
    setSelectedImages([]);
    setImagePreviews([]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedImages(prev => [...prev, ...files]);
      
      // Create preview URLs
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      URL.revokeObjectURL(prev[index]); // Clean up memory
      return prev.filter((_, i) => i !== index);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fleet Management</h2>
          <p className="text-gray-500">Manage your rental inventory and pricing.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-black hover:scale-[1.02] transition-all flex items-center text-sm"
        >
          <i className="fi fi-rr-plus mr-2 flex items-center"></i>
          Add New Vehicle
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">
                {editingVehicle ? `Edit ${editingVehicle.make} ${editingVehicle.model}` : 'Add New Vehicle'}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <i className="fi fi-rr-cross-small text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Make</label>
                  <input 
                    name="make" required value={formData.make} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Toyota"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Model</label>
                  <input 
                    name="model" required value={formData.model} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Corolla"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type</label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { id: 'CAR', label: 'Car', icon: 'fi-rr-car' },
                    { id: 'SCOOTER', label: 'Scooter', icon: 'fi-rr-motorcycle' },
                    { id: 'BIG_BIKE', label: 'Big Bike', icon: 'fi-rr-motorcycle' },
                    { id: 'BICYCLE', label: 'Bicycle', icon: 'fi-rr-bicycle' }
                  ].map(type => (
                    <label 
                      key={type.id}
                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border-2 transition-all cursor-pointer ${formData.vehicle_type === type.id ? 'border-gray-900 bg-gray-50 text-gray-900' : 'border-gray-100 hover:border-gray-200 text-gray-400'}`}
                    >
                      <input 
                        type="radio" name="vehicle_type" value={type.id} 
                        checked={formData.vehicle_type === type.id} 
                        onChange={() => handleTypeChange(type.id)} className="hidden" 
                      />
                      <i className={`fi ${type.icon} text-xl`}></i>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Licence Plate</label>
                  <input 
                    name="licence_plate" required value={formData.licence_plate} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. ABC-1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Branch Location</label>
                  <select 
                    name="branch_id" required value={formData.branch_id} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                  >
                    <option value="">Select a branch</option>
                    {branches.map(branch => (
                      <option key={branch.id} value={branch.id}>{branch.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                  <input 
                    type="number" name="year" required value={formData.year} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Price / Day (฿)</label>
                  <input 
                    type="number" name="daily_rental_rate" required value={formData.daily_rental_rate} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Seats</label>
                    <input 
                      type="number" name="seats" required value={formData.seats} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900"
                    />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Transmission</label>
                  <select 
                    name="transmission" value={formData.transmission} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                  >
                    <option value="AUTOMATIC">Automatic</option>
                    <option value="MANUAL">Manual</option>
                    <option value="SEMI_AUTOMATIC">Semi-Automatic</option>
                    <option value="NA">N/A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fuel Type</label>
                  <select 
                    name="fuel_type" value={formData.fuel_type} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                  >
                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="ELECTRIC">Electric</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {(formData.vehicle_type === 'SCOOTER' || formData.vehicle_type === 'BIG_BIKE') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Engine CC</label>
                    <input 
                      type="number" name="engine_capacity_cc" value={formData.engine_capacity_cc} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="e.g. 150"
                    />
                  </div>
                )}
                {formData.vehicle_type === 'CAR' && (
                   <label className="flex items-center gap-2 cursor-pointer group pt-6">
                        <input 
                            type="checkbox" name="is_air_conditioned" 
                            checked={formData.is_air_conditioned} onChange={handleChange}
                            className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Air Conditioned</span>
                    </label>
                )}
                {(formData.vehicle_type === 'SCOOTER' || formData.vehicle_type === 'BIG_BIKE') && (
                   <label className="flex items-center gap-2 cursor-pointer group pt-6">
                        <input 
                            type="checkbox" name="is_helmet_included" 
                            checked={formData.is_helmet_included} onChange={handleChange}
                            className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Helmet Included</span>
                    </label>
                )}
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Images</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    id="vehicle-images"
                  />
                  <label 
                    htmlFor="vehicle-images" 
                    className="flex flex-col items-center justify-center cursor-pointer py-4"
                  >
                    <i className="fi fi-rr-picture text-3xl text-gray-300 mb-2"></i>
                    <span className="text-sm font-medium text-gray-500">Click to upload images</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</span>
                  </label>
                </div>
                
                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-20 object-cover rounded-lg border border-gray-100"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button 
                  type="button" onClick={handleCloseModal}
                  className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={submitting}
                  className={`px-8 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-xl shadow-lg shadow-gray-200 hover:bg-black transition-all ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {submitting ? 'Saving...' : editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 italic">
          {error}
        </div>
      )}

      {!loading && vehicles.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fi fi-rr-car-side text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Your fleet is empty</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8 text-sm">
            Launch your agency by adding your first vehicle to the platform.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200"
          >
            Add First Vehicle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {vehicle.images?.[0]?.image ? (
                  <img 
                    src={vehicle.images[0].image} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image available
                  </div>
                )}
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-blue-600 uppercase tracking-wider shadow-sm">
                  {vehicle.category_name || vehicle.category}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{vehicle.make} {vehicle.model}</h3>
                    <p className="text-sm text-gray-500">{vehicle.year} • {vehicle.specs?.transmission || vehicle.transmission}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-bold text-lg">฿{vehicle.daily_rental_rate}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">per day</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleEdit(vehicle)}
                    className="flex-1 py-2 text-sm font-semibold text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(vehicle)}
                    className="p-2.5 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-all duration-200"
                  >
                    <i className="fi fi-rr-trash text-lg flex items-center"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
