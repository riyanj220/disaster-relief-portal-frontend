import { motion } from "framer-motion";

const Features = () => {
  const steps = [
    {
      title: "Submit Request",
      desc: "Citizens in need submit requests for food, medical, or shelter.",
      icon: "📋",
      color: "blue",
    },
    {
      title: "Smart Priority",
      desc: "Our engine prioritizes requests based on urgency and vulnerability.",
      icon: "⚡",
      color: "yellow",
    },
    {
      title: "Resource Match",
      desc: "Admins allocate inventory and assign skilled volunteers.",
      icon: "🤝",
      color: "emerald",
    },
    {
      title: "Real-time Tracking",
      desc: "Monitor the status of relief efforts from dispatch to completion.",
      icon: "📊",
      color: "blue",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 px-8 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">
            How the Platform Works
          </h3>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto font-medium">
            Our systematic approach ensures that every second counts and every
            resource reaches the right hands.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-8 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -12 }}
              className="relative z-10 group"
            >
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center h-full">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black ring-4 ring-gray-50">
                  {index + 1}
                </div>

                {/* Animated Icon Container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner"
                >
                  {step.icon}
                </motion.div>

                <h4 className="text-xl font-black text-slate-800 mb-3 tracking-tight">
                  {step.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>

                {/* Hover Indicator Line */}
                <div className="mt-6 w-0 group-hover:w-full h-1 bg-blue-600 transition-all duration-500 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
