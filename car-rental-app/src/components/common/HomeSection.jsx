import { useState, useRef } from "react";
import VehicleCard from "./VehicleCard";
import VehicleInfoCard from "./VehicleInfoCard";

// Mock data - TODO: Replace with API call to Django backend
// Endpoint: GET /api/v1/vehicles/featured/
const MOCK_VEHICLES = [
  {
    id: "tab1",
    icon: "🚙",
    name: "Sedans",
    category: "best in city",
    price: "$119.00",
    title: "Daily Plans",
    description: "Starting from $25.00\n2023 new brand cars available",
    image: "https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-23-1.png"
  },
  {
    id: "tab2",
    icon: "🚗",
    name: "SUVs",
    category: "SUVs",
    price: "$90.00",
    title: "SUVs 2024",
    description: "Starting from $25.00\n2023 new brand cars available",
    image: "https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-22-1-1.png"
  },
  {
    id: "tab3",
    icon: "🚐",
    name: "Pickup",
    category: "Pickup",
    price: "$100.00",
    title: "Something Big",
    description: "Starting from $25.00\n2023 new brand cars available",
    image: "https://salaheddinelp.com/wp-content/uploads/2024/10/Untitled-design-23-1.png"
  },
  {
    id: "tab4",
    icon: "🏍️",
    name: "Bikes",
    category: "bicycles",
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
    <section className="min-h-screen flex flex-col lg:flex-row bg-[#F0E2CB]">
      {/* Left Container - Vehicle Image Showcase */}
      <div className="w-full lg:w-1/2 relative px-4 py-8 lg:py-0">
        {/* Vehicle Category Icons */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10 bg-white/30 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
          <ul className="flex gap-5">
            {vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <button
                  onClick={() => setActiveTab(vehicle.id)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                    activeTab === vehicle.id
                      ? "bg-yellow-400 shadow-lg scale-110"
                      : "bg-cyan-100 hover:bg-yellow-400 hover:shadow-md"
                  }`}
                  aria-label={`View ${vehicle.name}`}
                >
                  {vehicle.icon}
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

      {/* Right Container - Hero Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 px-6 py-12 lg:px-12">
        <div className="flex items-center gap-5">
          <span className="text-4xl">➡️</span>
          <h3 className="text-lg lg:text-xl font-semibold">
            Best Cars Rental Service in Phuket
          </h3>
        </div>

        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight">
          Drive Through Phuket in Style!
        </h1>

        <p className="text-lg lg:text-xl text-gray-700 font-semibold">
          Just fast and elegant style
        </p>

        <p className="text-gray-600 leading-relaxed max-w-xl">
          Experience the freedom of exploring Phuket's beautiful beaches, vibrant culture, 
          and stunning landscapes with our premium car rental service. From city sedans to 
          rugged SUVs, we have the perfect vehicle for your adventure.
        </p>

        <div className="flex flex-wrap gap-5 pt-4">
          <button 
            onClick={() => onVehicleSelect(activeVehicle.id)}
            className="flex items-center gap-3 bg-[#C14438] text-white px-7 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <span className="font-semibold text-base lg:text-lg">Explore Now</span>
            <span className="text-xl">➡️</span>
          </button>

          <button className="flex items-center gap-3 bg-white text-gray-800 px-7 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-gray-200">
            <span className="font-semibold text-base lg:text-lg">Watch Video</span>
            <span className="text-xl">▶️</span>
          </button>
        </div>
      </div>
    </section>
  );
}
