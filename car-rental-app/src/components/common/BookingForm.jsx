import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/apiClient';

export default function BookingForm({ vehicle, onClose }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [bookingData, setBookingData] = useState({
    vehicle_id: vehicle.id,
    start_date: searchParams.get('pickupDate') || new Date().toISOString().split('T')[0],
    end_date: searchParams.get('dropoffDate') || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pickup_location_id: vehicle.branch?.id || 1, // Default to vehicle branch
    dropoff_location_id: vehicle.branch?.id || 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // The backend expects ISO format or similar
      // Assuming the input date is YYYY-MM-DD, we can add a default time
      const payload = {
        vehicle_id: bookingData.vehicle_id,
        pickup_location_id: bookingData.pickup_location_id,
        dropoff_location_id: bookingData.dropoff_location_id,
        start_date: `${bookingData.start_date}T10:00:00Z`,
        end_date: `${bookingData.end_date}T10:00:00Z`,
      };

      await apiClient.post('/api/bookings/', payload);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        navigate('/dashboard'); // Go to customer dashboard (or home for now if dashboard is agency-only)
      }, 2000);
    } catch (err) {
      console.error("Booking failed:", err);
      setError(err.response?.data?.message || err.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateDays = () => {
    const start = new Date(bookingData.start_date);
    const end = new Date(bookingData.end_date);
    const diff = end - start;
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const totalPrice = calculateDays() * parseFloat(vehicle.daily_rental_rate);

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl animate-bounce">
          <i className="fi fi-rr-check"></i>
        </div>
        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Reservation Sent!</h3>
        <p className="text-gray-400 text-sm mt-2">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Complete Reservation</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
          <i className="fi fi-rr-cross-small text-xl"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
            <i className="fi fi-rr-exclamation"></i>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Pickup Date</label>
            <input 
              type="date" 
              required
              min={new Date().toISOString().split('T')[0]}
              value={bookingData.start_date}
              onChange={(e) => setBookingData({...bookingData, start_date: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl text-xs font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Return Date</label>
            <input 
              type="date" 
              required
              min={bookingData.start_date}
              value={bookingData.end_date}
              onChange={(e) => setBookingData({...bookingData, end_date: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl text-xs font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</p>
            <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{calculateDays()} Days</p>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estimated Total</p>
            <p className="text-xl font-black text-gray-900 tracking-tighter">฿{totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-100 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <i className="fi fi-rr-check"></i>
              Confirm & Request Rental
            </>
          )}
        </button>
        
        <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest">
            {isAuthenticated ? `Booking as ${user?.name || user?.email}` : "You will be asked to login or register first"}
        </p>
      </form>
    </div>
  );
}
