import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

export default function HeroSection() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    location: "",
    pickupDate: "",
    pickupTime: "10:00",
    dropoffDate: "",
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
    window.location.href = `/search?${queryParams}`;
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Find Your Perfect Ride in{" "}
            <span className="text-yellow-300 inline-block transform hover:scale-105 transition-transform">
              Phuket
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-2">
            Explore the island with freedom. Rent from trusted local agencies.
          </p>
          <p className="text-sm md:text-base text-blue-200 max-w-xl mx-auto">
            🌴 From scooters to SUVs • 📍 Airport & beach pickup • 💯 Best rates guaranteed
          </p>
        </div>

        {/* Search Form Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm bg-opacity-95">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {/* Location */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📍 Pickup Location
                  </label>
                    <select
                      name="location"
                      value={searchData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                      disabled={loading}
                    >
                      <option value="">{loading ? "Loading locations..." : "Select location..."}</option>
                      {branches.map(branch => (
                        <option key={branch.id} value={branch.slug || branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                </div>

                {/* Pickup Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Pickup Date
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={searchData.pickupDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Pickup Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🕐 Time
                  </label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={searchData.pickupTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Dropoff Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Return Date
                  </label>
                  <input
                    type="date"
                    name="dropoffDate"
                    value={searchData.dropoffDate}
                    onChange={handleInputChange}
                    min={searchData.pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Available Cars
              </button>
            </form>

            {/* Quick Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="group cursor-default">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                    500+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Available Cars</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                    50+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Local Agencies</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                    10K+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Happy Customers</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                    4.8★
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-8 text-white">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Verified Agencies</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Free Cancellation</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">No Hidden Fees</span>
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
