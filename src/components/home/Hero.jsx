
const Hero = () => {
  return (
    <header className="relative bg-slate-900 py-24 px-8 text-center overflow-hidden">
      {/* Background Decorative Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Swift Response, <span className="text-blue-400">Unified Effort.</span>
        </h2>
        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          Empowering communities in crisis through real-time coordination. 
          Whether you need urgent aid or want to offer your skills, we connect 
          resources to where they matter most.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-xl shadow-xl transition-all transform hover:-translate-y-1">
            Get Emergency Help
          </button>
          <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-xl transition-all transform hover:-translate-y-1">
            Volunteer Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;