import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '', // Temporary password for first login
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/core/agencies/staff/');
        setStaff(response.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
        if (err.response?.status === 404) {
             setError("Staff Management API endpoint not found. Please ensure the proposed backend changes are implemented.");
        } else {
             setError("Failed to load staff list. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await apiClient.post('/api/core/agencies/staff/', formData);
      setStaff(prev => [...prev, response.data]);
      setIsModalOpen(false);
      setFormData({ username: '', email: '', first_name: '', last_name: '', password: '' });
    } catch (err) {
      console.error("Error adding staff:", err);
      const errorMessage = err.response?.data ? 
        Object.entries(err.response.data).map(([key, value]) => `${key}: ${value}`).join(', ') : 
        "Failed to add staff member. Please check the fields.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this staff member? They will lose access to the agency dashboard.")) return;

    try {
      await apiClient.delete(`/api/core/agencies/staff/${id}/`);
      setStaff(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Error removing staff:", err);
      setError("Failed to remove staff member.");
    }
  };

  const handleToggleStatus = async (member) => {
    try {
      const response = await apiClient.patch(`/api/core/agencies/staff/${member.id}/`, {
        is_active: !member.is_active
      });
      setStaff(prev => prev.map(s => s.id === member.id ? response.data : s));
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update staff status.");
    }
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Staff Management</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">Manage your team's access and roles within the agency.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:bg-black hover:scale-[1.02] transition-all flex items-center text-sm gap-2"
        >
          <i className="fi fi-rr-user-add flex items-center"></i>
          Hire Staff
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-5 rounded-3xl border border-red-100 text-sm font-medium flex items-start gap-3 animate-in fade-in duration-300">
          <i className="fi fi-rr-info text-lg mt-0.5"></i>
          <div>
            <p className="font-bold">Staff Management Notice</p>
            <p className="mt-1 opacity-80">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Team Member</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Username / ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {staff.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <i className="fi fi-rr-users text-2xl text-gray-200"></i>
                      </div>
                      <h4 className="font-bold text-gray-900">No staff members yet</h4>
                      <p className="text-gray-400 text-sm max-w-xs mt-1">Start building your team by clicking the "Hire Staff" button.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-gray-900/5 rounded-xl flex items-center justify-center font-bold text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all">
                          {member.full_name?.[0]?.toUpperCase() || member.username?.[0]?.toUpperCase() || 'S'}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 leading-tight">{member.full_name || 'Agnecy Staff'}</p>
                          <p className="text-xs text-gray-400 font-medium">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-mono text-xs text-gray-500 font-medium">
                      @{member.username}
                      <span className="block opacity-40">Joined: {new Date(member.joined_at).toLocaleDateString()}</span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button 
                        onClick={() => handleToggleStatus(member)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
                          member.is_active 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-red-50 text-red-400 border border-red-100'
                        }`}
                      >
                        {member.is_active ? 'Active' : 'Deactivated'}
                      </button>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleRemove(member.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                        title="Remove Staff"
                      >
                        <i className="fi fi-rr-trash text-lg"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Hire New Staff Member</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <i className="fi fi-rr-cross-small text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Staff Email Address</label>
                <input 
                  name="email" type="email" required value={formData.email} onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-100 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:bg-white focus:border-transparent transition-all outline-none font-medium text-lg"
                  placeholder="name@example.com"
                />
                <p className="text-xs text-gray-400 ml-1 leading-relaxed">
                  We'll check if this user already has an account. If not, they'll be invited to join your agency.
                </p>
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-auto">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit" disabled={submitting}
                  className={`px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:bg-black transition-all flex items-center gap-2 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {submitting ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <i className="fi fi-rr-paper-plane text-xs"></i>
                      Send Invitation
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
