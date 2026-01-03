import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import BookingForm from '../components/common/BookingForm';

export default function VehicleDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/vehicles/${slug}/`);
        setVehicle(response.data);
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError("We couldn't find the vehicle you're looking for.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24 px-4 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-gray-100 rounded-2xl mb-4"></div>
          <div className="h-4 w-32 bg-gray-50 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-white py-24 px-4 text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-4">{error || "Vehicle Not Found"}</h2>
        <Link to="/search" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
          Return to fleet
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-12">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <i className="fi fi-rr-angle-small-right"></i>
          <Link to="/search" className="hover:text-gray-900 transition-colors">Fleet</Link>
          <i className="fi fi-rr-angle-small-right"></i>
          <span className="text-gray-900">{vehicle.make} {vehicle.model}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery Section */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-gray-50 rounded-[2.5rem] overflow-hidden group relative shadow-2xl shadow-gray-100">
              {vehicle.images?.[activeImage]?.image ? (
                <img 
                  src={vehicle.images[activeImage].image} 
                  alt={vehicle.model}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="fi fi-rr-car text-8xl text-gray-100"></i>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {vehicle.images?.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-24 w-32 min-w-[8rem] rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-gray-900 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.image} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  {vehicle.category || 'Luxury'}
                </span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <i className="fi fi-rr-marker"></i>
                  {vehicle.branch_name || 'Main Branch'}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none mb-4 uppercase">
                {vehicle.make} <br />
                <span className="text-gray-400">{vehicle.model}</span>
              </h1>
              <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-md">
                Experience the pinnacle of Phuket driving with our meticulously maintained {vehicle.model}. 
                Available for immediate rental across our premium locations.
              </p>
            </div>

            {/* Spec Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-gray-100 mb-10">
              <div className="space-y-2">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Transmission</p>
                <div className="flex items-center gap-2">
                  <i className="fi fi-rr-settings text-gray-900"></i>
                  <span className="text-xs font-black text-gray-900 uppercase">{vehicle.transmission || 'Auto'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Fuel Type</p>
                <div className="flex items-center gap-2">
                  <i className="fi fi-rr-gas-pump text-gray-900"></i>
                  <span className="text-xs font-black text-gray-900 uppercase">{vehicle.fuel_type || 'Gas'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Year</p>
                <div className="flex items-center gap-2">
                  <i className="fi fi-rr-calendar text-gray-900"></i>
                  <span className="text-xs font-black text-gray-900 uppercase">{vehicle.year || '2024'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Color</p>
                <div className="flex items-center gap-2">
                  <i className="fi fi-rr-palette text-gray-900"></i>
                  <span className="text-xs font-black text-gray-900 uppercase">{vehicle.color || 'Onyx'}</span>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-auto pt-8">
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Premium Rate</span>
                <span className="text-4xl font-black text-gray-900 tracking-tighter">
                  ฿{parseFloat(vehicle.daily_rental_rate).toLocaleString()}
                </span>
                <span className="text-xs font-bold text-gray-400 mb-1">/ DAY</span>
              </div>
              
              <button 
                onClick={() => setShowBooking(true)}
                className="group w-full bg-gray-900 text-white py-6 px-10 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all hover:bg-black hover:scale-[1.02] shadow-2xl shadow-gray-200 flex items-center justify-between"
              >
                <span>Reserve this vehicle</span>
                <i className="fi fi-rr-arrow-small-right text-2xl group-hover:translate-x-2 transition-transform"></i>
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <i className="fi fi-rr-shield-check text-gray-300"></i>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fi fi-rr-badge-check text-gray-300"></i>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal Overlay */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowBooking(false)}
          ></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <BookingForm 
              vehicle={vehicle} 
              onClose={() => setShowBooking(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
