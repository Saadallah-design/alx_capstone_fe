
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

export default function BookingSuccess() {
  return (
    <>
      <Navbar currentPage="success" />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="h-32 w-32 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
            <i className="fi fi-rr-check text-6xl text-green-500"></i>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 uppercase">Booking Confirmed!</h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-12">
            Your vehicle has been successfully reserved. We've sent a confirmation email with all the details.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
            <Link 
                to="/my-bookings" 
                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200"
            >
                View My Bookings
            </Link>
            <Link 
                to="/search" 
                className="px-8 py-4 bg-white text-gray-900 border border-gray-100 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
                Book Another
            </Link>
        </div>
      </div>
    </>
  );
}
