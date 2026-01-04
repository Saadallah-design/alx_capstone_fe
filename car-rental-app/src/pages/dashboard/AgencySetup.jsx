import { useState } from 'react';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../context/AuthContext';

export default function AgencySetup() {
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    agency_name: '',
    address: '',
    contact_email: '',
    phone_number: '',
    license_number: '',
    city: 'PATONG'
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiClient.post('/api/core/agencies/apply/', formData);
      // Backend automatically verifies staff/admins and promotes roles
      await refreshUser();
      window.location.reload(); // Force full reload to update context and UI
    } catch (err) {
      console.error("Agency setup failed:", err);
      setError(err.response?.data?.detail || "Failed to create agency profile. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-gray-900 p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="h-14 w-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
              <i className="fi fi-rr-building text-2xl text-white"></i>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Setup Your Agency</h2>
            <p className="mt-2 text-gray-400 text-sm font-medium">Complete your profile to start managing your fleet and branches.</p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-[-10%] right-[-5%] h-64 w-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] left-[-10%] h-48 w-48 bg-gray-400/10 rounded-full blur-2xl"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3 animate-shake">
              <i className="fi fi-rr-exclamation text-lg"></i>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Agency Name</label>
              <input 
                name="agency_name" required value={formData.agency_name} onChange={handleChange}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium"
                placeholder="e.g. Phuket Elite Rentals"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Operation City</label>
              <select 
                name="city" value={formData.city} onChange={handleChange}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium appearance-none"
              >
                {cities.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Contact Email</label>
              <input 
                name="contact_email" type="email" required value={formData.contact_email} onChange={handleChange}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium"
                placeholder="agency@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
              <input 
                name="phone_number" required value={formData.phone_number} onChange={handleChange}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium"
                placeholder="+66 81 234 5678"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Business Address</label>
            <textarea 
              name="address" required value={formData.address} onChange={handleChange}
              rows="2"
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium resize-none"
              placeholder="Full street address in your city..."
            ></textarea>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Business License Number</label>
            <input 
              name="license_number" required value={formData.license_number} onChange={handleChange}
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none text-gray-900 font-medium"
              placeholder="e.g. LIC-2024-XXXX"
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className={`w-full py-4 mt-6 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:bg-black hover:scale-[1.01] transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <i className="fi fi-rr-check text-lg"></i>
                Create Agency Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
