
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                   <i className="fi fi-br-steering-wheel text-gray-900 text-sm"></i>
                </div>
                <span className="font-black text-xl tracking-tighter">Drive Phuket</span>
             </div>
             <p className="text-gray-400 text-sm leading-relaxed mb-8">
               Premium vehicle rental platform connecting you with verified local agencies. Experience the freedom of the open road with complete peace of mind.
             </p>
             <div className="flex gap-4">
                <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all">
                  <i className="fi fi-brands-instagram"></i>
                </a>
                <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all">
                  <i className="fi fi-brands-facebook"></i>
                </a>
                <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all">
                  <i className="fi fi-brands-twitter"></i>
                </a>
             </div>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6">Platform</h4>
             <ul className="space-y-4 text-gray-400 text-sm font-medium">
                <li><Link to="/search" className="hover:text-white transition-colors">Browse Fleet</Link></li>
                <li><Link to="/search" className="hover:text-white transition-colors">Locations</Link></li>
                <li><Link to="/apply-agency" className="hover:text-white transition-colors">Partner with Us</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Agency Login</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6">Support</h4>
             <ul className="space-y-4 text-gray-400 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6">Newsletter</h4>
             <p className="text-gray-400 text-sm mb-4">Subscribe for latest offers and travel tips.</p>
             <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-white/30 transition-colors"
                />
                <button className="bg-white text-gray-900 px-4 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                   Go
                </button>
             </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-gray-400 text-sm font-medium">© 2024 Drive Phuket. All rights reserved.</p>
           <p className="text-gray-500 text-xs font-medium">Designed with <i className="fi fi-sr-heart text-red-500 mx-1"></i> in Cape Town</p>
        </div>
      </div>
    </footer>
  );
}
