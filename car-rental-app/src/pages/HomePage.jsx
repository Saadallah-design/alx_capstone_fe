
import HeroSection from '../components/common/HeroSection';
import CategorySection from '../components/home/CategorySection';
import LocationsSection from '../components/home/LocationsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import Footer from '../components/common/Footer';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      <CategorySection />
      <LocationsSection />
      <FeaturesSection />
      
      {/* Call to Action Banner */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Ready to hit the road?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Join thousands of happy travelers exploring Phuket with freedom and style.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/search" className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl shadow-white/10">
                   Book Your Vehicle
                </a>
                <a href="/register" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                   Create Account
                </a>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
