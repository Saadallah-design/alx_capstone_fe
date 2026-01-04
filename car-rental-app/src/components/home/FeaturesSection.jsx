
export default function FeaturesSection() {
  const features = [
    {
      icon: 'fi fi-rr-shield-check',
      title: 'Full Insurance Coverage',
      description: 'Drive with total peace of mind. Our comprehensive insurance plans cover you against the unexpected.'
    },
    {
      icon: 'fi fi-rr-time-fast',
      title: 'Free Delivery',
      description: 'We bring the car to you. Free delivery to your hotel or villa in Patong, Kata, and Karon areas.'
    },
    {
      icon: 'fi fi-rr-headset',
      title: '24/7 Roadside Support',
      description: 'Never stranded. Our dedicated support team is just a call away, day or night, anywhere on the island.'
    },
    {
      icon: 'fi fi-rr-wallet',
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprise charges. What you see is what you pay, with guaranteed best rates.'
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">Why Choose Drive Phuket?</h2>
          <p className="mt-4 text-lg text-gray-500">More than just a rental. We provide a premium travel experience tailored to your needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-110">
                <i className={`${feature.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
