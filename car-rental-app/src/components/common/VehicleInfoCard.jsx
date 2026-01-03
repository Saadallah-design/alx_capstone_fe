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
      <h3 className="font-bold text-lg mb-2.5 pr-8 relative z-10">{vehicle.title}</h3>
      <span className="absolute top-[20%] right-[20%] text-[30px] text-gray-300 group-hover:text-red-500 group-hover:rotate-[3deg] group-hover:translate-x-[2px] group-hover:scale-[1.2] transition-all duration-200 z-10">
        ➡️
      </span>
      <p className="text-sm leading-relaxed relative z-10 mt-0" style={{ width: "24ch" }}>
        {vehicle.description}
      </p>
    </div>
  );
}
