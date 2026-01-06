import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../context/AuthContext';

export default function AgencyProfile() {
  const { agency, user, refreshUser } = useAuth();
  const isAdmin = user?.role === 'AGENCY_ADMIN';
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    agency_name: '',
    address: '',
    contact_email: '',
    phone_number: '',
    license_number: '',
    city: ''
  });

  const cities = [
    { value: 'PATONG', label: 'Patong' },
    { value: 'KATA', label: 'Kata' },
    { value: 'KARON', label: 'Karon' },
    { value: 'PHUKET_TOWN', label: 'Phuket Town' },
    { value: 'KAMALA', label: 'Kamala' },
    { value: 'BANG_TAO', label: 'Bang Tao' },
    { value: 'RAWAI', label: 'Rawai' },
    { value: 'CHALONG', label: 'Chalong' },
  ];

  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/core/agencies/me/');
        setFormData({
          agency_name: response.data.agency_name || '',
          address: response.data.address || '',
          contact_email: response.data.contact_email || '',
          phone_number: response.data.phone_number || '',
          license_number: response.data.license_number || '',
          city: response.data.city || 'PATONG'
        });
      } catch (err) {
        console.error("Failed to fetch agency data:", err);
        setError("Failed to load agency profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgencyData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await apiClient.patch('/api/core/agencies/me/', formData);
      setSuccess(true);
      await refreshUser();
      // Optional: hide success message after a few seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Agency update failed:", err);
      setError(err.response?.data?.detail || "Failed to update agency profile. Please check your details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="bg-gray-900 p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Agency Profile</h2>
              <p className="mt-2 text-gray-400 text-sm font-medium">Manage your agency's public information and business details.</p>
            </div>
            <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center hidden sm:flex">
              <i className="fi fi-rr-building text-3xl text-white"></i>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-[-20%] right-[-5%] h-64 w-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-30%] left-[-10%] h-48 w-48 bg-gray-400/10 rounded-full blur-2xl"></div>
        </div>

        <div className="p-8 lg:p-12">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
              <i className="fi fi-rr-exclamation text-lg"></i>
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <i className="fi fi-rr-check-circle text-lg"></i>
              Your agency profile has been updated successfully!
            </div>
          )}

          {!isAdmin && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-100 text-amber-600 rounded-2xl text-xs font-medium flex items-center gap-3">
              <i className="fi fi-rr-lock text-lg"></i>
              Only Agency Admins can modify the agency profile. You have view-only access.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="section">
              {/* ... same grouping ... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Agency Name</label>
                  <input 
                    name="agency_name" required value={formData.agency_name} onChange={handleChange}
                    disabled={!isAdmin}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="e.g. Phuket Elite Rentals"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">HQ City</label>
                  <select 
                    name="city" value={formData.city} onChange={handleChange}
                    disabled={!isAdmin}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {cities.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="section">
              {/* ... same grouping ... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Business Email</label>
                  <input 
                    name="contact_email" type="email" required value={formData.contact_email} onChange={handleChange}
                    disabled={!isAdmin}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="agency@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Contact Number</label>
                  <input 
                    name="phone_number" required value={formData.phone_number} onChange={handleChange}
                    disabled={!isAdmin}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="+66 81 234 5678"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Headquarters Address</label>
                <textarea 
                  name="address" required value={formData.address} onChange={handleChange}
                  disabled={!isAdmin}
                  rows="3"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium resize-none shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Full street address, building number..."
                ></textarea>
              </div>
            </div>

            <div className="section">
              {/* ... same grouping ... */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                  Business License Number
                  <i className="fi fi-rr-info text-[10px] text-gray-300"></i>
                </label>
                <input 
                  name="license_number" required value={formData.license_number} onChange={handleChange}
                  disabled={!isAdmin}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="e.g. LIC-2024-XXXX"
                />
              </div>
            </div>

            {isAdmin && (
              <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center">
                <button 
                  type="submit" disabled={saving}
                  className={`flex-1 w-full sm:w-auto py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:bg-black hover:scale-[1.02] transition-all flex items-center justify-center gap-3 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {saving ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <i className="fi fi-rr-disk text-lg text-emerald-400"></i>
                      Save Changes
                    </>
                  )}
                </button>
                
                <p className="text-xs text-center text-gray-400 italic">
                  Changes to business details may require re-verification.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
