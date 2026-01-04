import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';
import Navbar from '../components/common/Navbar';

export default function MyBookings() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
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
        setError("Failed to load your bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'completed':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status?.toLowerCase() === filter);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar currentPage="bookings" />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fi fi-rr-lock text-3xl text-gray-300"></i>
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Login Required</h2>
            <p className="text-gray-400 mt-2 mb-8 max-w-sm">Please login to view your booking history.</p>
            <Link 
              to="/login" 
              className="inline-block px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200"
            >
              Login Now
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar currentPage="bookings" />
      <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
              <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <i className="fi fi-rr-angle-small-right"></i>
              <span className="text-gray-900">My Bookings</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">
              My Rentals
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Welcome back, <span className="font-bold text-gray-900">{user?.name || user?.email}</span>
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
                  filter === status 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-200' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 animate-pulse">
                  <div className="flex gap-6">
                    <div className="w-32 h-24 bg-gray-100 rounded-2xl"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-100 rounded-full w-1/3"></div>
                      <div className="h-4 bg-gray-50 rounded-full w-1/2"></div>
                      <div className="h-4 bg-gray-50 rounded-full w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center">
              <i className="fi fi-rr-exclamation text-3xl text-red-300 mb-4 block"></i>
              <p className="text-red-600 font-bold">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredBookings.length === 0 && (
            <div className="bg-white rounded-3xl p-16 border border-gray-100 text-center shadow-sm">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fi fi-rr-calendar-clock text-4xl text-gray-200"></i>
              </div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">No Bookings Found</h3>
              <p className="text-gray-400 mt-2 mb-8 max-w-sm mx-auto">
                {filter === 'all' 
                  ? "You haven't made any rental bookings yet. Start exploring our fleet!"
                  : `No ${filter} bookings found.`}
              </p>
              <Link 
                to="/search" 
                className="inline-block px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200"
              >
                Browse Fleet
              </Link>
            </div>
          )}

          {/* Bookings List */}
          {!loading && !error && filteredBookings.length > 0 && (
            <div className="space-y-4">
              {filteredBookings.map(booking => (
                <div 
                  key={booking.id} 
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Vehicle Image */}
                    <div className="w-full md:w-40 h-28 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                      {booking.vehicle?.main_image ? (
                        <img 
                          src={booking.vehicle.main_image} 
                          alt={`${booking.vehicle?.make} ${booking.vehicle?.model}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fi fi-rr-car text-3xl text-gray-200"></i>
                        </div>
                      )}
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase">
                            {booking.vehicle?.make || 'Vehicle'} {booking.vehicle?.model || ''}
                          </h3>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                            Booking #{booking.id}
                          </p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                          {booking.status || 'Unknown'}
                        </span>
                        {booking.status === 'PENDING' && (
                            <button
                                onClick={() => navigate('/payment', { state: { booking } })}
                                className="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-md shadow-gray-200 ml-2"
                            >
                                Pay Now
                            </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Pickup</p>
                          <p className="font-bold text-gray-900">{formatDate(booking.start_date)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Return</p>
                          <p className="font-bold text-gray-900">{formatDate(booking.end_date)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Location</p>
                          <p className="font-bold text-gray-900 truncate">{booking.pickup_location?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Total</p>
                          <p className="font-black text-gray-900">฿{parseFloat(booking.total_price || 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
