export default function FleetManagement() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
      <div className="text-4xl mb-4">🚗</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">My Fleet</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        This is where you'll manage your rental inventory. Add new cars, update pricing, or view maintenance status.
      </p>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
        + Add New Vehicle
      </button>
    </div>
  );
}
