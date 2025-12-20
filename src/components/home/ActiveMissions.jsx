import { motion } from "framer-motion";

const ActiveMissions = () => {
  const missions = [
    {
      id: 1,
      region: "Northern Province",
      type: "Flood Relief",
      status: "Critical",
      progress: 65,
      color: "red",
    },
    {
      id: 2,
      region: "Eastern Coast",
      type: "Medical Supplies",
      status: "In Progress",
      progress: 40,
      color: "blue",
    },
    {
      id: 3,
      region: "Western Valley",
      type: "Shelter Setup",
      status: "Stable",
      progress: 90,
      color: "emerald",
    },
  ];

  // Animation variants for the grid container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="services" className="py-24 bg-gray-50/50 px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Fade-in */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Active Relief Missions
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mt-3 rounded-full"></div>
            <p className="text-gray-500 mt-4 text-lg">
              Real-time tracking of ongoing field operations.
            </p>
          </div>
          <button className="hidden md:block group text-blue-600 font-bold text-lg hover:text-blue-700 transition">
            View All Missions{" "}
            <span className="inline-block transition-transform group-hover:translate-x-2">
              →
            </span>
          </button>
        </motion.div>

        {/* Missions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {missions.map((mission) => (
            <motion.div
              key={mission.id}
              variants={cardVariants}
              whileHover={{ y: -10 }} // Lift effect on hover
              className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors duration-300"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm
                    ${
                      mission.status === "Critical"
                        ? "bg-red-50 text-red-600 ring-1 ring-red-100"
                        : mission.status === "Stable"
                        ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"
                        : "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                    }`}
                  >
                    {mission.status}
                  </span>
                  <span className="text-gray-300 text-xs font-mono font-bold">
                    ID-{mission.id}2025
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {mission.type}
                </h3>
                <p className="text-gray-500 font-medium flex items-center gap-2 mb-8">
                  <span className="text-blue-500">📍</span> {mission.region}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                      Deployment
                    </span>
                    <span className="text-sm font-black text-slate-700">
                      {mission.progress}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 ring-1 ring-gray-200/50">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${mission.progress}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={`h-full rounded-full ${
                        mission.color === "red"
                          ? "bg-linear-to-r from-red-600 to-red-400"
                          : mission.color === "blue"
                          ? "bg-linear-to-r from-blue-600 to-blue-400"
                          : "bg-linear-to-r from-emerald-600 to-emerald-400"
                      }`}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ActiveMissions;
