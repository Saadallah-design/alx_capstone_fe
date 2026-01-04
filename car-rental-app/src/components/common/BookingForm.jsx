
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../context/AuthContext';

export default function BookingForm({ vehicle, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    start_date: today,
    start_time: "10:00",
    end_date: tomorrow,
    end_time: "10:00",
    pickup_location: "",
    dropoff_location: ""
  });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  // Fetch branches on mount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await apiClient.get('/api/branches/');
        setBranches(response.data);
        // Default to first branch if available
        if (response.data.length > 0) {
            setFormData(prev => ({
                ...prev,
                pickup_location: response.data[0].id,
                dropoff_location: response.data[0].id
            }));
        }
      } catch (err) {
        console.error("Error fetching branches:", err);
      }
    };
    fetchBranches();
  }, []);

  // Calculate total cost whenever dates change
  useEffect(() => {
    const start = new Date(`${formData.start_date}T${formData.start_time}`);
    const end = new Date(`${formData.end_date}T${formData.end_time}`);
    
    if (end > start) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // Minimum 1 day
      const daysToCharge = diffDays > 0 ? diffDays : 1;
      setTotalCost(daysToCharge * parseFloat(vehicle.daily_rental_rate));
    } else {
      setTotalCost(0);
    }
  }, [formData.start_date, formData.start_time, formData.end_date, formData.end_time, vehicle.daily_rental_rate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
        // Build the current booking URL state to redirect back after login
        // For now, just simple redirect
        navigate('/login?redirect=' + window.location.pathname);
        return;
    }

    try {
      setLoading(true);
      
      const payload = {
        vehicle: vehicle.id,
        pickup_location: formData.pickup_location,
        dropoff_location: formData.dropoff_location,
        start_date: `${formData.start_date}T${formData.start_time}:00Z`,
        end_date: `${formData.end_date}T${formData.end_time}:00Z`,
        total_rental_cost: totalCost // Backend calculates this too, but good for UI sync
      };

      await apiClient.post('/api/bookings/', payload);
      navigate('/booking-success');
      
    } catch (err) {
      console.error("Booking error:", err.response?.data);
      const errorMsg = err.response?.data?.non_field_errors?.[0] 
        || err.response?.data?.detail 
        || "Booking failed. Please check your dates and try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div>
           <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Reserve Vehicle</h3>
           <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{vehicle.make} {vehicle.model}</p>
        </div>
        <button onClick={onClose} className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors">
          <i className="fi fi-rr-cross-small text-xl"></i>
        </button>
      </div>

      <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold flex items-center gap-3">
                <i className="fi fi-rr-exclamation"></i>
                {error}
            </div>
        )}

        <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Start Date</label>
                    <input 
                        type="date" 
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        min={today}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none"
                        required 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Time</label>
                    <input 
                        type="time" 
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none"
                        required 
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">End Date</label>
                    <input 
                        type="date" 
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        min={formData.start_date}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none"
                        required 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Time</label>
                    <input 
                        type="time" 
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none"
                        required 
                    />
                </div>
            </div>

            {/* Locations */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Pickup Location</label>
                    <div className="relative">
                        <i className="fi fi-rr-marker absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <select 
                            name="pickup_location"
                            value={formData.pickup_location}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none appearance-none"
                            required
                        >
                            <option value="">Select Pickup Branch</option>
                            {branches.map(branch => (
                                <option key={branch.id} value={branch.id}>{branch.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Drop-off Location</label>
                    <div className="relative">
                        <i className="fi fi-rr-flag absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <select 
                            name="dropoff_location"
                            value={formData.dropoff_location}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none appearance-none"
                            required
                        >
                             <option value="">Select Dropoff Branch</option>
                            {branches.map(branch => (
                                <option key={branch.id} value={branch.id}>{branch.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </form>
      </div>

      <div className="p-8 border-t border-gray-100 bg-gray-50 mt-auto">
        <div className="flex justify-between items-end mb-6">
            <div>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Total Estimated Cost</p>
                <p className="text-xs text-gray-400 font-medium">Includes taxes & fees</p>
            </div>
            <div className="text-right">
                <p className="text-3xl font-black text-gray-900 tracking-tighter">฿{totalCost.toLocaleString()}</p>
            </div>
        </div>

        <button 
            type="submit" 
            form="booking-form"
            disabled={loading || totalCost <= 0}
            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 ${
                loading || totalCost <= 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-gray-900 text-white hover:bg-black hover:scale-[1.02] shadow-gray-200'
            }`}
        >
            {loading ? (
                <>
                    <i className="fi fi-rr-spinner animate-spin"></i>
                    Processing...
                </>
            ) : (
                <>
                    Confirm Booking
                    <i className="fi fi-rr-arrow-right"></i>
                </>
            )}
        </button>
      </div>
    </div>
  );
}
