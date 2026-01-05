import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [vehicles, setVehicles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [filters, setFilters] = useState({
    vehicle_type: searchParams.get('type') || 'all',
    transmission: 'all',
    priceRange: 10000,
    branch: searchParams.get('location') || 'all',
  });
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    // Update filters if URL params change (e.g. new search from home)
    setFilters(prev => ({
      ...prev,
      vehicle_type: searchParams.get('type') || 'all',
      branch: searchParams.get('location') || 'all',
    }));
    // Close mobile filters on navigation/search
    setShowFiltersMobile(false);
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [vehiclesRes, branchesRes] = await Promise.all([
          apiClient.get('/api/vehicles/'),
          apiClient.get('/api/branches/')
        ]);
        setVehicles(vehiclesRes.data);
        setBranches(branchesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredVehicles = vehicles.filter(v => {
    // API uses daily_rental_rate instead of price_per_day
    const price = parseFloat(v.daily_rental_rate || 0);
    // Use vehicle_type field from backend
    const typeMatch = filters.vehicle_type === 'all' || v.vehicle_type === filters.vehicle_type;
    // Transmission is nested in specs
    const transmissionMatch = filters.transmission === 'all' || v.specs?.transmission?.toLowerCase() === filters.transmission.toLowerCase();
    const priceMatch = price <= filters.priceRange;
    
    // API returns branch_name string directly on the vehicle
    const branchMatch = filters.branch === 'all' || 
                       v.branch_name === filters.branch || 
                       v.branch?.slug === filters.branch || 
                       v.branch?.id?.toString() === filters.branch;
    
    return typeMatch && transmissionMatch && priceMatch && branchMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-10 bg-gray-200 rounded-2xl animate-pulse w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="h-[400px] bg-white rounded-3xl border border-gray-100 animate-pulse hidden md:block"></div>
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-white rounded-3xl border border-gray-100 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 lg:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Available Fleet</h2>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-3">
              Showing {filteredVehicles.length} vehicles matching your search
            </p>
          </div>
          
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowFiltersMobile(true)}
            className="lg:hidden w-full bg-white border border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-sm transition-all active:scale-95"
          >
            <i className="fi fi-rr-settings-sliders"></i>
            Filter Vehicles
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filters Overlay */}
          {showFiltersMobile && (
            <div 
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setShowFiltersMobile(false)}
            ></div>
          )}

          {/* Filters Sidebar */}
          <aside className={`
            ${showFiltersMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            fixed lg:sticky inset-y-0 left-0 w-[280px] sm:w-[320px] lg:w-full h-full lg:h-auto lg:top-24 z-[70] lg:z-0
            bg-white lg:bg-transparent transition-all duration-300 overflow-y-auto lg:overflow-visible
            p-8 lg:p-0 border-r lg:border-none border-gray-100 lg:block
          `}>
            <div className="bg-white lg:p-8 lg:rounded-3xl lg:border lg:border-gray-100 lg:shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <i className="fi fi-rr-settings-sliders text-gray-900"></i>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-900">Refine Search</h3>
                </div>
                <button 
                  onClick={() => setShowFiltersMobile(false)}
                  className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-400"
                >
                  <i className="fi fi-rr-cross-small text-xl flex items-center"></i>
                </button>
              </div>

              {/* Location Filter */}
              <div className="mb-8">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4 block">Pickup Location</label>
                <select
                  value={filters.branch}
                  onChange={(e) => setFilters(prev => ({ ...prev, branch: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 px-4 py-4 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition-all"
                >
                  <option value="all">Everywhere in Phuket</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.name}>{branch.name}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4 block">Vehicle Type</label>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Types' },
                    { id: 'CAR', label: 'Cars' },
                    { id: 'SCOOTER', label: 'Scooters' },
                    { id: 'BIG_BIKE', label: 'Big Bikes' },
                    { id: 'BICYCLE', label: 'Bicycles' }
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFilters(prev => ({ ...prev, vehicle_type: type.id }))}
                      className={`w-full text-left px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
                        filters.vehicle_type === type.id ? 'bg-gray-900 text-white shadow-lg shadow-gray-200' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transmission Filter */}
              <div className="mb-8">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4 block">Transmission</label>
                <div className="flex gap-2">
                  {['all', 'Automatic', 'Manual'].map(trans => (
                    <button
                      key={trans}
                      onClick={() => setFilters(prev => ({ ...prev, transmission: trans }))}
                      className={`flex-1 px-2 py-3.5 rounded-xl text-[10px] font-black uppercase transition-all border ${
                        filters.transmission === trans ? 'bg-gray-900 border-gray-900 text-white shadow-lg shadow-gray-200' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-900'
                      }`}
                    >
                      {trans === 'all' ? 'Any' : trans}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="pb-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4 block">Max Price: ฿{filters.priceRange}</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
                  className="w-full accent-gray-900 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-300">
                  <span>฿0</span>
                  <span>฿10,000</span>
                </div>
              </div>

              {/* Mobile Filter Action */}
              <button 
                onClick={() => setShowFiltersMobile(false)}
                className="lg:hidden w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-200"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {error && (
              <div className="p-8 bg-red-50 rounded-3xl border border-red-100 text-red-600 mb-8 flex items-center gap-4 italic font-medium">
                <i className="fi fi-rr-exclamation"></i>
                {error}
              </div>
            )}

            {filteredVehicles.length === 0 ? (
              <div className="bg-white p-20 rounded-3xl border border-gray-100 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fi fi-rr-search-alt text-3xl text-gray-200"></i>
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">No vehicles found</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">Try adjusting your filters or search criteria to find what you're looking for.</p>
                <button 
                  onClick={() => setFilters({ vehicle_type: 'all', transmission: 'all', priceRange: 10000, branch: 'all' })}
                  className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-gray-200 transition-all duration-500 overflow-hidden group">
                    <div className="relative h-48 bg-gray-50 overflow-hidden">
                      {vehicle.images?.[0]?.image ? (
                        <img 
                          src={vehicle.images[0].image} 
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fi fi-rr-car text-6xl text-gray-100"></i>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-sm">
                        {vehicle.category}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-black text-gray-900 tracking-tight leading-none uppercase">{vehicle.make} {vehicle.model}</h4>
                          <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">Year {vehicle.year || '2024'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-gray-900 leading-none">฿{parseFloat(vehicle.daily_rental_rate).toLocaleString()}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">per day</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 py-4 border-y border-gray-50 mb-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <i className="fi fi-rr-settings"></i>
                          {vehicle.transmission || 'Automatic'}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <i className="fi fi-rr-gas-pump"></i>
                          {vehicle.fuel_type || 'Gasoline'}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
                        <i className="fi fi-rr-marker text-gray-900"></i>
                        <span>{vehicle.branch_name || 'Main Phuket Branch'}</span>
                      </div>

                      <Link 
                        to={`/vehicles/${vehicle.slug}`}
                        className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-bold text-center block hover:bg-black transition-all shadow-lg shadow-gray-100 group-hover:shadow-gray-200 transform group-hover:-translate-y-1"
                      >
                        BOOK NOW
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
