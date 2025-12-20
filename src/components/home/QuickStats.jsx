import { motion } from "framer-motion";

const QuickStats = () => {
  // Animation variant for the container (staggered children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Items will appear one after another
      },
    },
  };

  // Animation variant for individual stat items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative bg-slate-900 py-16 px-8 overflow-hidden">
      {/* Subtle Divider Line to blend with Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-gray-700 to-transparent"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Triggers animation when scrolled into view
        viewport={{ once: true, amount: 0.3 }} // amount: 0.3 means trigger when 30% of section is visible
        className="max-w-6xl mx-auto"
      >
        {/* Glassmorphism Card Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 shadow-2xl">
          {/* Stat 1 */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h4 className="text-5xl font-black text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]">
              1,240+
            </h4>
            <p className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold">
              Requests Resolved
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            variants={itemVariants}
            className="space-y-2 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0"
          >
            <h4 className="text-5xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">
              850
            </h4>
            <p className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold">
              Active Volunteers
            </p>
          </motion.div>

          {/* Stat 3 - Visual Progress */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative mb-2">
              <h4 className="text-5xl font-black text-white">92%</h4>
              {/* Small pulse dot */}
              <span className="absolute -top-1 -right-4 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <p className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold mb-5">
              Resources Deployed
            </p>

            <div className="w-full max-w-50 h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "92%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "anticipate" }}
                className="bg-linear-to-r from-emerald-600 to-emerald-400 h-full shadow-[0_0_15px_#10b981]"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default QuickStats;
