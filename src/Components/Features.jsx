import { FaTruck, FaLock, FaUndo, FaClock } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      desc: "On orders over $100",
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
      desc: "100% protected payments",
    },
    {
      icon: <FaUndo />,
      title: "Easy Returns",
      desc: "30-day return policy",
    },
    {
      icon: <FaClock />,
      title: "24/7 Support",
      desc: "Dedicated customer service",
    },
  ];

  return (
    <div className="bg-gray-100 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-md
                         hover:shadow-xl hover:-translate-y-2
                         transition-all duration-300"
            >
              <div className="text-3xl text-red-500 mb-4 flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
