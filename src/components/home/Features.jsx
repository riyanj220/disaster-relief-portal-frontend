
const Features = () => {
  const steps = [
    { title: "Submit Request", desc: "Citizens in need submit requests for food, medical, or shelter.", icon: "📋" },
    { title: "Smart Priority", desc: "Our engine prioritizes requests based on urgency and vulnerability.", icon: "⚡" },
    { title: "Resource Match", desc: "Admins allocate inventory and assign skilled volunteers.", icon: "🤝" },
    { title: "Real-time Tracking", desc: "Monitor the status of relief efforts from dispatch to completion.", icon: "📊" }
  ];

  return (
    <section className="py-20 bg-gray-50 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-800">How the Platform Works</h3>
          <p className="text-gray-500 mt-2">A systematic approach to disaster management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;