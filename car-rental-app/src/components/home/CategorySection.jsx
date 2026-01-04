
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'CAR',
    label: 'Cars',
    icon: 'fi fi-rr-car',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    count: '120+ Available'
  },
  {
    id: 'SCOOTER',
    label: 'Scooters',
    icon: 'fi fi-rr-motorcycle',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
    count: '50+ Available'
  },
  {
    id: 'BIG_BIKE',
    label: 'Big Bikes',
    icon: 'fi fi-rr-biking',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
    count: '15+ Available'
  },
  {
    id: 'BICYCLE',
    label: 'Bicycles',
    icon: 'fi fi-rr-bicycle',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=800',
    count: '30+ Available'
  }
];

export default function CategorySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">Browse by Category</h2>
          <p className="mt-4 text-lg text-gray-500">Find the perfect vehicle for your Phuket adventure, from city zippers to coastline cruisers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/search?type=${cat.id}`}
              className="group relative h-96 rounded-[2.5rem] overflow-hidden bg-gray-100 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <img 
                  src={cat.image} 
                  alt={cat.label} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/10 text-white group-hover:bg-white group-hover:text-gray-900 transition-colors duration-300">
                  <i className={`${cat.icon} text-xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">{cat.label}</h3>
                <p className="text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {cat.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
