import { useState, useRef } from "react";
import VehicleCard from "./VehicleCard";
import VehicleInfoCard from "./VehicleInfoCard";

// Mock data - TODO: Replace with API call to Django backend
// Endpoint: GET /api/v1/vehicles/featured/
const MOCK_VEHICLES = [
  {
    id: "tab1",
    icon: "fi fi-rr-car",
    name: "Sedans",
    category: "City Classic",
    price: "$119.00",
    title: "Daily Plans",
    description: "Starting from $25.00\n2023 new brand cars available",
    image: "https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-23-1.png"
  },
  {
    id: "tab2",
    icon: "fi fi-rr-car-side",
    name: "SUVs",
    category: "Pro SUVs",
    price: "$90.00",
    title: "SUVs 2024",
    description: "Starting from $25.00\n2023 new brand cars available",
    image: "https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-22-1-1.png"
  },
  {
    id: "tab3",
    icon: "fi fi-rr-truck-side",
    name: "Pickup",
    category: "Heavy Duty",
    price: "$100.00",
    title: "Utility Power",
    description: "Starting from $25.00\n2023 new brand cars available",
    image: "https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-23-1.png"
  },
  {
    id: "tab4",
    icon: "fi fi-rr-motorcycle",
    name: "Bikes",
    category: "Eco Ride",
    price: "$9.00",
    title: "Eco Friendly",
    description: "Keep the environment clean eco-friendly bikes for your daily trips in town.",
    image: "https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-23-1.png"
  }
];

/**
 * HomeSection - Vehicle showcase with tabbed interface
 * 
 * Props:
 * @param {Array} vehicles - Array of vehicle objects from API (optional, uses mock data if not provided)
 * @param {Function} onVehicleSelect - Callback when user clicks on a vehicle
 * 
 * TODO: Integrate with Django backend
 * - Fetch data from: GET /api/v1/vehicles/featured/
 * - Handle loading states
 * - Handle error states
 * - Add pagination if needed
 */
export default function HomeSection({ 
  vehicles = MOCK_VEHICLES,
  onVehicleSelect = (vehicleId) => console.log(`Vehicle selected: ${vehicleId}`)
}) {
  const [activeTab, setActiveTab] = useState(vehicles[0]?.id || "tab1");
  const [cardTransform, setCardTransform] = useState("");
  const cardRef = useRef(null);

  const activeVehicle = vehicles.find(v => v.id === activeTab) || vehicles[0];

  // 3D card hover effect handler
  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    setCardTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleCardMouseLeave = () => {
    setCardTransform("rotateX(0deg) rotateY(0deg)");
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-gray-50 font-sans">
      {/* Left Container - Vehicle Image Showcase */}
      <div className="w-full lg:w-1/2 relative px-4 py-8 lg:py-0">
        {/* Vehicle Category Icons */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10 bg-white/30 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
          <ul className="flex gap-5">
            {vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <button
                  onClick={() => setActiveTab(vehicle.id)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 ${
                    activeTab === vehicle.id
                      ? "bg-gray-900 text-white shadow-xl scale-110"
                      : "bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
                  }`}
                  aria-label={`View ${vehicle.name}`}
                >
                  <i className={vehicle.icon}></i>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Vehicle Image Tabs */}
        <div className="h-[500px] lg:h-[80vh] w-full relative mt-20 lg:mt-0 lg:absolute lg:bottom-0">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`w-full h-full absolute inset-0 transition-opacity duration-500 ${
                activeTab === vehicle.id ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
              }`}
            >
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-contain object-bottom absolute bottom-0 left-0"
              />

              {/* Glassmorphic Pricing Card - Top Right */}
              <VehicleCard
                vehicle={vehicle}
                isActive={activeTab === vehicle.id}
                cardRef={cardRef}
                cardTransform={cardTransform}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              />

              {/* Vehicle Info Card - Left Side */}
              <VehicleInfoCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 px-6 py-12 lg:px-12 bg-white">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fi fi-rr-star text-sm"></i>
          </div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Premium Rental Service in Phuket
          </h3>
        </div>

        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-none tracking-tighter">
          DRIVE PHUKET <br />
          <span className="text-gray-300">IN STYLE.</span>
        </h1>

        <p className="text-lg lg:text-xl text-gray-500 font-bold tracking-tight">
          Sophistication meets freedom on every road.
        </p>

        <p className="text-gray-400 leading-relaxed max-w-xl text-sm font-medium">
          Experience the absolute freedom of exploring Phuket's breathtaking coastlines 
          and hidden gems with our curated boutique fleet. We deliver excellence, 
          from luxury sedans to rugged all-terrain performers.
        </p>

        <div className="flex flex-wrap gap-5 pt-4">
          <button 
            onClick={() => onVehicleSelect(activeVehicle.id)}
            className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-xl shadow-gray-200 hover:bg-black hover:scale-[1.02] transition-all duration-300"
          >
            <span className="font-bold text-base uppercase tracking-tight">Explore Fleet</span>
            <i className="fi fi-rr-arrow-right text-lg"></i>
          </button>

          <button className="flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl shadow-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 font-bold uppercase tracking-tight text-sm">
            <span>Watch Film</span>
            <i className="fi fi-rr-play text-lg"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
