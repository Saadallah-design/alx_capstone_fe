import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

export default function HeroSection() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];
  const twoDaysLater = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [searchData, setSearchData] = useState({
    location: "",
    type: "",
    pickupDate: today,
    pickupTime: "10:00",
    dropoffDate: twoDaysLater,
    dropoffTime: "10:00",
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await apiClient.get('/api/branches/');
        setBranches(response.data);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search data:", searchData);
    // Construct query parameters and navigate to search page
    const queryParams = new URLSearchParams(searchData).toString();
    navigate(`/search?${queryParams}`);
  };

  return (
    <div className="relative bg-gray-950 overflow-hidden font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
            DRIVE YOUR <br />
            <span className="text-gray-400">DREAMS</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 font-medium px-4">
            Explore Phuket with absolute freedom. Premium rentals from trusted local partners.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4">
            <span>• Verified Fleet</span>
            <span>• 24/7 VIP Support</span>
            <span>• Best Rates</span>
          </div>
        </div>

        {/* Search Form Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm bg-opacity-95 mx-2 sm:mx-0">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                {/* Location */}
                <div className="sm:col-span-2 lg:col-span-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    <i className="fi fi-rr-marker text-gray-900"></i> Pickup Location
                  </label>
                    <select
                      name="location"
                      value={searchData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm font-bold bg-gray-50/50"
                      required
                      disabled={loading}
                    >
                      <option value="">{loading ? "Loading locations..." : "Select location..."}</option>
                      {branches.map(branch => (
                        <option key={branch.id} value={branch.name}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                </div>

                {/* Vehicle Type */}
                <div className="sm:col-span-1 lg:col-span-1">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    <i className="fi fi-rr-car-side text-gray-900"></i> Type
                  </label>
                  <select
                    name="type"
                    value={searchData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm font-bold bg-gray-50/50"
                  >
                    <option value="">All Types</option>
                    <option value="CAR">Cars</option>
                    <option value="SCOOTER">Scooters</option>
                    <option value="BIG_BIKE">Big Bikes</option>
                    <option value="BICYCLE">Bicycles</option>
                  </select>
                </div>

                {/* Pickup Date */}
                <div className="sm:col-span-1 lg:col-span-1">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    <i className="fi fi-rr-calendar text-gray-900"></i> Pickup Date
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={searchData.pickupDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm font-bold bg-gray-50/50"
                    required
                  />
                </div>

                {/* Pickup Time */}
                <div className="sm:col-span-1 lg:col-span-1">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    <i className="fi fi-rr-clock text-gray-900"></i> Time
                  </label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={searchData.pickupTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm font-bold bg-gray-50/50"
                    required
                  />
                </div>

                {/* Dropoff Date */}
                <div className="sm:col-span-1 lg:col-span-1">
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    <i className="fi fi-rr-calendar-check text-gray-900"></i> Return Date
                  </label>
                  <input
                    type="date"
                    name="dropoffDate"
                    value={searchData.dropoffDate}
                    onChange={handleInputChange}
                    min={searchData.pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm font-bold bg-gray-50/50"
                    required
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-5 px-8 rounded-2xl shadow-xl shadow-gray-200 transform hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 text-lg uppercase tracking-tight"
              >
                <i className="fi fi-rr-search text-xl"></i>
                Search Available Cars
              </button>
            </form>

            {/* Quick Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="group cursor-default">
                  <div className="text-3xl font-black text-gray-900 group-hover:scale-110 transition-transform tracking-tighter">
                    500+
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Available Cars</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-3xl font-black text-gray-900 group-hover:scale-110 transition-transform tracking-tighter">
                    50+
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Local Agencies</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-3xl font-black text-gray-900 group-hover:scale-110 transition-transform tracking-tighter">
                    10K+
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Happy Customers</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-3xl font-black text-gray-900 group-hover:scale-110 transition-transform tracking-tighter">
                    4.8★
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-10 text-white">
          <div className="flex items-center gap-2 px-2 py-2">
            <i className="fi fi-rr-check-circle text-gray-400 text-lg"></i>
            <span className="text-[10px] uppercase font-bold tracking-widest">Verified Agencies</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2">
            <i className="fi fi-rr-headset text-gray-400 text-lg"></i>
            <span className="text-[10px] uppercase font-bold tracking-widest">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2">
            <i className="fi fi-rr-undo text-gray-400 text-lg"></i>
            <span className="text-[10px] uppercase font-bold tracking-widest">Free Cancellation</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2">
            <i className="fi fi-rr-shield-check text-gray-400 text-lg"></i>
            <span className="text-[10px] uppercase font-bold tracking-widest">No Hidden Fees</span>
          </div>
        </div>
      </div>

      {/* Add animations to index.css */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
