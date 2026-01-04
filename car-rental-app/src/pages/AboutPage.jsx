import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function AboutPage() {
    const stats = [
        { value: '500+', label: 'Vehicles Available' },
        { value: '10,000+', label: 'Happy Customers' },
        { value: '50+', label: 'Partner Agencies' },
        { value: '24/7', label: 'Customer Support' }
    ];

    const values = [
        {
            icon: 'fi-rr-shield-check',
            title: 'Trust & Transparency',
            description: 'We believe in honest pricing and clear terms. No hidden fees, no surprises.'
        },
        {
            icon: 'fi-rr-heart',
            title: 'Customer First',
            description: 'Your satisfaction is our priority. We go the extra mile to ensure a smooth rental experience.'
        },
        {
            icon: 'fi-rr-star',
            title: 'Quality Fleet',
            description: 'Every vehicle is carefully vetted and maintained to the highest standards.'
        },
        {
            icon: 'fi-rr-marker',
            title: 'Local Expertise',
            description: 'Born in Phuket, we know the island inside out and provide authentic local insights.'
        }
    ];

    return (
        <>
            <Navbar currentPage="about" />
            
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')] bg-cover bg-center"></div>
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">
                        About Phuket Rentals
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Your trusted partner for exploring the beautiful island of Phuket on your own terms.
                    </p>
                </div>
            </div>

            {/* Our Story */}
            <div className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
                            Our Story
                        </h2>
                        <div className="w-20 h-1 bg-gray-900 mx-auto"></div>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Founded in 2020, Phuket Rentals was born from a simple observation: tourists and locals alike 
                            deserved a better way to rent vehicles in Phuket. Traditional rental agencies were fragmented, 
                            pricing was opaque, and the booking process was unnecessarily complicated.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We set out to change that. By creating a unified platform that connects trusted local rental 
                            agencies with customers, we've made it easier than ever to find, compare, and book the perfect 
                            vehicle for your Phuket adventure.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Today, we're proud to serve thousands of customers annually, partnering with over 50 verified 
                            agencies across the island. Whether you're here for a weekend getaway or a month-long stay, 
                            we're here to help you explore Phuket with freedom and confidence.
                        </p>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission & Values */}
            <div className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
                            Our Values
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            These core principles guide everything we do, from selecting partner agencies to 
                            designing our platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-gray-900 transition-all">
                                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                                    <i className={`fi ${value.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="py-20 px-4 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-6">
                        Why Choose Phuket Rentals?
                    </h2>
                    <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
                        We're more than just a booking platform. We're your local partner in making your 
                        Phuket experience unforgettable.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-gray-800 rounded-2xl p-6">
                            <i className="fi fi-rr-check-circle text-4xl text-green-400 mb-4"></i>
                            <h4 className="font-bold text-lg mb-2">Verified Partners</h4>
                            <p className="text-gray-400 text-sm">All agencies are thoroughly vetted for quality and reliability.</p>
                        </div>
                        <div className="bg-gray-800 rounded-2xl p-6">
                            <i className="fi fi-rr-dollar text-4xl text-green-400 mb-4"></i>
                            <h4 className="font-bold text-lg mb-2">Best Prices</h4>
                            <p className="text-gray-400 text-sm">Compare rates across agencies to find the perfect deal.</p>
                        </div>
                        <div className="bg-gray-800 rounded-2xl p-6">
                            <i className="fi fi-rr-headset text-4xl text-green-400 mb-4"></i>
                            <h4 className="font-bold text-lg mb-2">24/7 Support</h4>
                            <p className="text-gray-400 text-sm">Our team is always here to help, whenever you need us.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-6">
                        Ready to Explore Phuket?
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                        Browse our fleet of vehicles and start your adventure today. Or, if you're a rental agency, 
                        join our platform and reach thousands of customers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/search" 
                            className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-black transition-all shadow-xl shadow-gray-200"
                        >
                            Browse Vehicles
                        </Link>
                        <Link 
                            to="/apply-agency" 
                            className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-900 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-gray-50 transition-all"
                        >
                            Become a Partner
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
