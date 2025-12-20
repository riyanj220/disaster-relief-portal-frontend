import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <header className="relative min-h-[80vh] flex items-center justify-center bg-slate-900 py-24 px-8 text-center overflow-hidden">
      {/* 1. Animated Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]"></div>
      </div>

      {/* 2. Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>

      <motion.div
        /* 3. Entrance Animation */
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight"
        >
          Swift Response, <br />
          <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Unified Effort.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          Empowering communities in crisis through real-time coordination.
          Connect resources to where they matter most, instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            to={"/login"}
            className="group relative px-10 py-4 bg-emerald-500 text-white text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-600 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
          >
            Get Emergency Help
          </Link>

          <Link
            to={"/login"}
            className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 text-lg font-bold rounded-xl backdrop-blur-sm transition-all active:scale-95"
          >
            Volunteer Now
          </Link>
        </motion.div>
      </motion.div>

      {/* 5. Decorative Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gray-500 rounded-full"></div>
        </div>
      </motion.div>
    </header>
  );
};

export default Hero;
