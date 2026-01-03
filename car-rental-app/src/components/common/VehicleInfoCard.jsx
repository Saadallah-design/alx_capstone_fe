/**
 * VehicleInfoCard - Vehicle information display card
 * Shows vehicle title, description, and animated arrow
 */
export default function VehicleInfoCard({ vehicle }) {
  return (
    <div 
      className="absolute left-0 top-5 inline-block rounded-[20px] p-[15px] max-w-[280px] group transition-all duration-300 overflow-hidden"
      style={{
        lineHeight: "1.4rem",
      }}
    >
      <h3 className="font-extrabold text-xl mb-2 pr-8 relative z-10 text-gray-900 tracking-tight">{vehicle.title}</h3>
      <div className="absolute top-[15%] right-[10%] text-[24px] text-gray-200 group-hover:text-gray-900 group-hover:rotate-[15deg] group-hover:translate-x-[5px] transition-all duration-300 z-10">
        <i className="fi fi-rr-arrow-small-right"></i>
      </div>
      <p className="text-sm leading-relaxed relative z-10 mt-0" style={{ width: "24ch" }}>
        {vehicle.description}
      </p>
    </div>
  );
}
