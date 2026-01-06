import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../context/AuthContext';

export default function BranchManagement() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'AGENCY_ADMIN';
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    country: 'Thailand',
    phone_number: '',
    email: '',
    opening_time: '08:00:00',
    closing_time: '20:00:00',
    is_pickup_point: true,
    is_dropoff_point: true,
    is_active: true,
  });

  const [editingBranch, setEditingBranch] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/branches/');
        // Filter to show only branches belonging to the current agency if needed, 
        // though the backend should handle this via get_queryset.
        setBranches(response.data);
      } catch (err) {
        console.error("Error fetching branches:", err);
        setError("Failed to load branches. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      city: branch.city,
      address: branch.address,
      country: branch.country || 'Thailand',
      phone_number: branch.phone_number,
      email: branch.email,
      opening_time: branch.opening_time,
      closing_time: branch.closing_time,
      is_pickup_point: branch.is_pickup_point,
      is_dropoff_point: branch.is_dropoff_point,
      is_active: branch.is_active,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this branch? This action cannot be undone.")) return;
    
    try {
      await apiClient.delete(`/api/branches/${slug}/`);
      setBranches(prev => prev.filter(b => b.slug !== slug));
    } catch (err) {
      console.error("Error deleting branch:", err);
      setError("Failed to delete branch. It might be linked to existing rentals.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let response;
      if (editingBranch) {
        response = await apiClient.patch(`/api/branches/${editingBranch.slug}/`, formData);
        setBranches(prev => prev.map(b => b.id === editingBranch.id ? response.data : b));
      } else {
        response = await apiClient.post('/api/branches/', formData);
        setBranches(prev => [...prev, response.data]);
      }
      
      setIsModalOpen(false);
      setEditingBranch(null);
      setFormData({ 
        name: '', city: '', address: '', country: 'Thailand',
        phone_number: '', email: '', opening_time: '08:00:00', 
        closing_time: '20:00:00', is_pickup_point: true, 
        is_dropoff_point: true, is_active: true 
      });
    } catch (err) {
      console.error("Error saving branch:", err);
      const errorMessage = err.response?.data ? 
        Object.entries(err.response.data).map(([key, value]) => `${key}: ${value}`).join(', ') : 
        "Failed to save branch. Please check the fields.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBranch(null);
    setFormData({ 
      name: '', city: '', address: '', country: 'Thailand',
      phone_number: '', email: '', opening_time: '08:00:00', 
      closing_time: '20:00:00', is_pickup_point: true, 
      is_dropoff_point: true, is_active: true 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pickup Locations</h2>
          <p className="text-gray-500 text-sm">Manage the branches where customers can pick up vehicles.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => {
              setEditingBranch(null);
              setFormData({
                name: '', city: '', address: '', country: 'Thailand',
                phone_number: '', email: '', opening_time: '08:00:00',
                closing_time: '20:00:00', is_pickup_point: true,
                is_dropoff_point: true, is_active: true
              });
              setIsModalOpen(true);
            }}
            className="flex items-center bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-black hover:scale-105 transition-all text-sm"
          >
            <i className="fi fi-rr-plus mr-2 flex items-center"></i>
            Add New Branch
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">{editingBranch ? 'Edit Branch' : 'New Branch'}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <i className="fi fi-rr-cross-small text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Branch Name</label>
                  <input 
                    name="name" required value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Patong Beach Office"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                  <input 
                    name="city" required value={formData.city} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Phuket"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input 
                    name="phone_number" required value={formData.phone_number} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                    placeholder="+66 81 234 5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input 
                    name="email" type="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                    placeholder="branch@agency.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Address</label>
                <textarea 
                  name="address" required value={formData.address} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  placeholder="Street name, building number..."
                  rows="2"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Opening Time</label>
                  <input 
                    name="opening_time" type="time" required value={formData.opening_time} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Closing Time</label>
                  <input 
                    name="closing_time" type="time" required value={formData.closing_time} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                        type="checkbox" name="is_pickup_point" 
                        checked={formData.is_pickup_point} onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Pickup Point</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                        type="checkbox" name="is_dropoff_point" 
                        checked={formData.is_dropoff_point} onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Dropoff Point</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                        type="checkbox" name="is_active" 
                        checked={formData.is_active} onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Active</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3 mt-auto">
                <button 
                  type="button" onClick={closeModal}
                  className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={submitting}
                  className={`px-8 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-xl shadow-lg shadow-gray-200 hover:bg-black transition-all ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {submitting ? (editingBranch ? 'Updating...' : 'Creating...') : (editingBranch ? 'Update Branch' : 'Create Branch')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-sm italic">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
             <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fi fi-rr-marker text-2xl text-gray-300"></i>
             </div>
             <h3 className="font-bold text-gray-900">No branches added yet</h3>
             <p className="text-gray-500 text-sm mt-1">Add your first pickup location to start managing your fleet.</p>
          </div>
        ) : (
          branches.map((branch) => (
            <div key={branch.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center">
                    <i className="fi fi-rr-marker text-xl text-gray-900"></i>
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest border px-2 py-1 rounded-md ${branch.is_active ? 'text-emerald-600 border-emerald-100 bg-emerald-50' : 'text-gray-400 border-gray-100'}`}>
                      {branch.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
               </div>
               <h3 className="text-lg font-bold text-gray-900 truncate">{branch.name}</h3>
               <p className="text-gray-500 text-sm mt-1 flex items-center">
                 <i className="fi fi-rr-map-marker mr-2 text-[10px]"></i>
                 {branch.city}
               </p>
               <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                  {isAdmin ? (
                    <>
                      <button 
                        onClick={() => handleDelete(branch.slug)}
                        className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => handleEdit(branch)}
                        className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                      >
                        Edit Settings
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-full text-center">
                      View Only
                    </span>
                  )}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
