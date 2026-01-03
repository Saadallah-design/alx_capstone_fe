export default function BookingManagement() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
      <div className="text-4xl mb-4">📅</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Management</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        View and manage all incoming rental requests here. Approve, deny, or track active rentals.
      </p>
      <div className="flex justify-center gap-4">
        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">Pending: 2</span>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active: 5</span>
      </div>
    </div>
  );
}
