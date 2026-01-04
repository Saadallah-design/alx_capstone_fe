import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/bookings/');
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleAction = async (bookingId, action) => {
    // In a real app, this would be a PATCH to /api/bookings/{id}/
    // with status: 'Confirmed' or 'Cancelled'
    try {
      const newStatus = action === 'approve' ? 'Confirmed' : 'Cancelled';
      await apiClient.patch(`/api/bookings/${bookingId}/`, { status: newStatus });
      
      // Update local state
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: newStatus } : b
      ));
    } catch (err) {
      console.error(`Error ${action}ing booking:`, err);
      alert(`Failed to ${action} booking.`);
    }
  };

  const filteredBookings = bookings.filter(b => 
    filter === 'all' ? true : b.status?.toLowerCase() === filter.toLowerCase()
  );

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-gray-900 text-white';
      case 'pending': return 'bg-gray-100 text-gray-500';
      case 'cancelled': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-gray-100 rounded-2xl animate-pulse w-48"></div>
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-6 border-b border-gray-50 flex gap-4">
              <div className="h-10 w-10 bg-gray-50 rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-50 rounded animate-pulse w-1/4"></div>
                <div className="h-3 bg-gray-50 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Bookings</h2>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Manage your rental schedule and requests</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          {['all', 'pending', 'confirmed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === tab 
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-200' 
                  : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-center gap-4 text-red-600 italic font-medium">
          <i className="fi fi-rr-exclamation text-xl"></i>
          {error}
        </div>
      )}

      {filteredBookings.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl border border-gray-100 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fi fi-rr-inbox text-3xl text-gray-200"></i>
          </div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">No bookings found</h3>
          <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">There are no {filter !== 'all' ? filter : ''} bookings to display at the moment.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer / Vehicle</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Price</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-gray-200 group-hover:scale-105 transition-transform">
                          {booking.user_name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-extrabold text-gray-900 tracking-tight leading-none">{booking.user_name || booking.user_email || 'Guest'}</p>
                          <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                            <i className="fi fi-rr-car-side mr-1 text-[10px]"></i>
                            {booking.vehicle?.make} {booking.vehicle?.model}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 tracking-tight">
                          <i className="fi fi-rr-calendar text-gray-300"></i>
                          {new Date(booking.start_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                          <i className="fi fi-rr-arrow-small-right text-gray-200"></i>
                          {new Date(booking.end_date).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p className="font-black text-gray-900 tracking-tight">฿{booking.total_price?.toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {booking.status?.toLowerCase() === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAction(booking.id, 'approve')}
                              className="h-9 w-9 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all shadow-md shadow-gray-200"
                              title="Approve Booking"
                            >
                              <i className="fi fi-rr-check text-xs"></i>
                            </button>
                            <button
                              onClick={() => handleAction(booking.id, 'cancel')}
                              className="h-9 w-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
                              title="Cancel Booking"
                            >
                              <i className="fi fi-rr-cross-small text-xs"></i>
                            </button>
                          </>
                        )}
                        {booking.status?.toLowerCase() !== 'pending' && (
                           <button
                             className="h-9 w-9 bg-gray-50 text-gray-300 rounded-xl flex items-center justify-center cursor-not-allowed"
                             disabled
                           >
                             <i className="fi fi-rr-menu-dots text-xs"></i>
                           </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
