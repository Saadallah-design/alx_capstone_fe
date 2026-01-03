/**
 * VehicleCard - Glassmorphic pricing card component
 * Displays vehicle category, rental price, and has 3D hover effect
 */
export default function VehicleCard({ 
  vehicle, 
  isActive,
  cardRef,
  cardTransform,
  onMouseMove,
  onMouseLeave
}) {
  return (
    <div
      ref={isActive ? cardRef : null}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="absolute top-5 right-5 w-52 h-52 rounded-[15px] p-4 transition-transform duration-200 ease-out will-change-transform overflow-hidden z-20"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)",
        transform: cardTransform,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glossy overlay gradient (pseudo ::before element) */}
      <div 
        className="absolute inset-0 rounded-[15px] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
          zIndex: -1,
        }}
      />
      
      {/* Card Header */}
      <div 
        className="flex items-center gap-2 border border-yellow-400 rounded-[10px] px-2 py-2 mb-2.5 relative" 
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <span className="text-xl">👑</span>
        <h3 className="text-gray-400 font-semibold text-sm capitalize">{vehicle.category}</h3>
      </div>

      {/* Price */}
      <div className="mb-4">
        <h3 className="text-gray-400 text-lg">Rent</h3>
        <h4 className="text-black text-[1.8rem] font-bold">{vehicle.price}</h4>
      </div>

      {/* Footer Icons */}
      <div className="absolute bottom-2.5 left-5 right-5 flex justify-between items-center text-gray-400 text-[30px]">
        <span>📍</span>
        <span className="transition-transform duration-500 ease-in-out hover:-rotate-[25deg] cursor-pointer icon-to-rotate">
          ➡️
        </span>
      </div>
    </div>
  );
}
