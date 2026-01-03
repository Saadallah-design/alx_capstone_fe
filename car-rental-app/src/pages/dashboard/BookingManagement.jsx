export default function BookingManagement() {
  return (
    <div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-100 text-center">
      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="fi fi-rr-calendar-clock text-4xl text-gray-300"></i>
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Booking Management</h3>
      <p className="text-gray-500 max-w-sm mx-auto mb-8 text-sm">
        View and manage all incoming rental requests here. Approve, deny, or track active rentals.
      </p>
      <div className="flex justify-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black text-gray-900">2</span>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Pending</span>
        </div>
        <div className="w-px h-10 bg-gray-100"></div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black text-gray-900">5</span>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Active</span>
        </div>
      </div>
    </div>
  );
}
