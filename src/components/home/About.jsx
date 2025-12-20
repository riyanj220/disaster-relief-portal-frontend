import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-24 bg-white px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left Side: Content Reveal */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Why <span className="text-blue-600">ReliefPortal?</span>
            </h2>
            <div className="w-24 h-2 bg-emerald-500 rounded-full"></div>
          </div>

          <p className="text-gray-600 leading-relaxed text-xl font-medium">
            During disasters, the biggest challenge isn't the lack of
            resources—it's the
            <span className="text-slate-900 font-bold">
              {" "}
              lack of coordination
            </span>
            . ReliefPortal was built to ensure every request is heard and every
            resource is utilized efficiently.
          </p>

          <ul className="space-y-4">
            {[
              "AI-Driven Priority Engine",
              "Real-time Inventory Tracking",
              "Verified Volunteer Network",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * i, duration: 0.5 }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-gray-800 font-bold bg-gray-50 p-4 rounded-xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-md transition-all cursor-default"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                  ✔
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Side: Vision Card with Floating Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Animated Background Blob */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] group-hover:bg-blue-400/20 transition-colors duration-500"></div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative z-10 bg-linear-to-br from-blue-600 to-blue-800 p-12 rounded-4xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Decorative Icon */}
            <div className="text-blue-200/20 text-9xl absolute -top-4 -right-4 font-serif">
              “
            </div>

            <blockquote className="relative z-10 italic text-white text-2xl leading-relaxed font-light">
              "Our goal is to reduce response time from days to minutes. In a
              disaster,{" "}
              <span className="text-blue-200 font-bold underline decoration-emerald-400 decoration-4 underline-offset-4">
                every second saved
              </span>{" "}
              is a life potentially protected."
            </blockquote>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-1 bg-emerald-400 rounded-full"></div>
              <p className="font-black uppercase tracking-tighter text-blue-100 text-sm">
                Platform Vision 2025
              </p>
            </div>
          </motion.div>

          {/* Bottom decorative card shadow */}
          <div className="absolute inset-0 bg-blue-900 translate-x-4 translate-y-4 rounded-4xl-z-10 opacity-10"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
