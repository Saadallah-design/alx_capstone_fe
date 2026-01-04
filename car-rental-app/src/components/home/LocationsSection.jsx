
import { Link } from 'react-router-dom';

const locations = [
  { id: 'PATONG', label: 'Patong Beach', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&q=80&w=800' },
  { id: 'PHUKET_TOWN', label: 'Phuket Town', image: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&q=80&w=800' },
  { id: 'KATA', label: 'Kata Beach', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
  { id: 'KAMALA', label: 'Kamala Beach', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800' },
];

export default function LocationsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl mb-4">Popular Pickup Locations</h2>
            <p className="text-lg text-gray-500">Pick up your ride exactly where you need it. We have verified agencies across the island.</p>
          </div>
          <Link to="/search" className="inline-flex items-center gap-2 font-bold text-gray-900 hover:text-blue-600 transition-colors">
             View map <i className="fi fi-rr-arrow-right"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <Link 
              key={loc.id} 
              to={`/search?location=${loc.id}`}
              className="group block relative aspect-[4/5] rounded-[2rem] overflow-hidden"
            >
              <img 
                src={loc.image} 
                alt={loc.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                 <div className="flex items-center gap-2 text-white mb-1">
                    <i className="fi fi-rr-marker text-sm opacity-80"></i>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">Popular</span>
                 </div>
                 <h3 className="text-xl font-bold text-white group-hover:underline decoration-2 underline-offset-4">{loc.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
