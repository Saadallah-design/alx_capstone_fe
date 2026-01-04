import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function HowItWorksPage() {
    const customerSteps = [
        {
            number: '01',
            icon: 'fi-rr-search',
            title: 'Browse & Compare',
            description: 'Search our extensive fleet of vehicles. Filter by type, price, location, and features to find your perfect match.'
        },
        {
            number: '02',
            icon: 'fi-rr-calendar',
            title: 'Select Dates & Location',
            description: 'Choose your pickup and drop-off dates, times, and locations. Our system checks real-time availability.'
        },
        {
            number: '03',
            icon: 'fi-rr-credit-card',
            title: 'Book & Pay Securely',
            description: 'Complete your booking with our secure payment system. Get instant confirmation via email.'
        },
        {
            number: '04',
            icon: 'fi-rr-car',
            title: 'Pick Up & Drive',
            description: 'Show your booking confirmation at the agency. Complete a quick inspection and hit the road!'
        }
    ];

    const agencySteps = [
        {
            number: '01',
            icon: 'fi-rr-edit',
            title: 'Apply to Join',
            description: 'Fill out our simple application form with your agency details and business information.'
        },
        {
            number: '02',
            icon: 'fi-rr-shield-check',
            title: 'Get Verified',
            description: 'Our team reviews your application to ensure quality standards. Verification typically takes 24-48 hours.'
        },
        {
            number: '03',
            icon: 'fi-rr-add',
            title: 'List Your Fleet',
            description: 'Add your vehicles with photos, specifications, and pricing. Set your availability and rental terms.'
        },
        {
            number: '04',
            icon: 'fi-rr-chart-line',
            title: 'Manage & Grow',
            description: 'Receive bookings, manage your fleet, and track earnings through your dedicated dashboard.'
        }
    ];

    const faqs = [
        {
            question: 'Do I need a credit card to book?',
            answer: 'Yes, a valid credit card is required for booking. We accept Visa, Mastercard, and American Express.'
        },
        {
            question: 'What documents do I need to rent a vehicle?',
            answer: 'You\'ll need a valid driver\'s license (held for at least 1 year), passport or ID, and the credit card used for booking.'
        },
        {
            question: 'Can I cancel or modify my booking?',
            answer: 'Yes, cancellation and modification policies vary by agency. Check the specific terms during booking. Most agencies offer free cancellation up to 24 hours before pickup.'
        },
        {
            question: 'Is insurance included?',
            answer: 'Basic insurance is typically included in the rental price. Additional coverage options are available at checkout.'
        },
        {
            question: 'What if I have an issue during my rental?',
            answer: 'Contact the rental agency directly for immediate assistance. Our 24/7 support team is also available to help resolve any issues.'
        }
    ];

    return (
        <>
            <Navbar currentPage="how-it-works" />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">
                        How It Works
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Renting a vehicle in Phuket has never been easier. Whether you're a customer or an agency, 
                        we've streamlined the process to get you on the road faster.
                    </p>
                </div>
            </div>

            {/* For Customers */}
            <div className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-gray-600 mb-4">
                            For Customers
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
                            Rent in 4 Easy Steps
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From browsing to driving, we've made the rental process simple and transparent.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {customerSteps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-gray-900 transition-all h-full">
                                    <div className="text-6xl font-black text-gray-100 mb-4">
                                        {step.number}
                                    </div>
                                    <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 -mt-2">
                                        <i className={`fi ${step.icon} text-white text-xl`}></i>
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                                {index < customerSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <i className="fi fi-rr-arrow-right text-2xl text-gray-300"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link 
                            to="/search" 
                            className="inline-block px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-black transition-all shadow-xl shadow-gray-200"
                        >
                            Start Browsing
                        </Link>
                    </div>
                </div>
            </div>

            {/* For Agencies */}
            <div className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            For Agencies
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
                            Join Our Platform
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Expand your reach and grow your business by partnering with Phuket Rentals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {agencySteps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-900 transition-all h-full">
                                    <div className="text-6xl font-black text-gray-100 mb-4">
                                        {step.number}
                                    </div>
                                    <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 -mt-2">
                                        <i className={`fi ${step.icon} text-white text-xl`}></i>
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                                {index < agencySteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <i className="fi fi-rr-arrow-right text-2xl text-gray-300"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link 
                            to="/apply-agency" 
                            className="inline-block px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-black transition-all shadow-xl shadow-gray-200"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600">
                            Got questions? We've got answers.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center bg-gray-900 rounded-3xl p-8 text-white">
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-3">
                            Still Have Questions?
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Our support team is available 24/7 to help you.
                        </p>
                        <a 
                            href="mailto:support@phuketrentals.com" 
                            className="inline-block px-8 py-3 bg-white text-gray-900 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-all"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
