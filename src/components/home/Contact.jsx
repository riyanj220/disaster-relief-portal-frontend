import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white px-8 overflow-hidden">
      <div className="text-center mb-16">
        <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Contact Us
        </h3>
        {/* Optional: Consistency line to match your other sections */}
        <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-gray-100"
      >
        {/* Info Side - Deep Blue Gradient */}
        <div className="bg-linear-to-br from-blue-600 to-blue-800 p-12 text-white md:w-2/5 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-black mb-6 tracking-tight">
              Get in Touch
            </h3>
            <p className="text-blue-100 mb-10 text-lg font-medium leading-relaxed">
              Have questions about how to help or get aid? Our team is available
              24/7 during emergency situations.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: "📍",
                  text: "HQ: Tech Plaza, Sector 7",
                  label: "Address",
                },
                { icon: "📞", text: "+1 800-RELIEF", label: "Emergency Line" },
                {
                  icon: "✉️",
                  text: "support@reliefportal.org",
                  label: "Email Us",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-blue-300">
                      {item.label}
                    </p>
                    <p className="font-bold">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-4">
              Social Connect
            </p>
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                <span
                  key={social}
                  className="text-sm font-bold hover:text-emerald-400 cursor-pointer transition"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Form Side - Clean & Functional */}
        <div className="p-12 md:w-3/5 bg-gray-50/30">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Your Message
              </label>
              <textarea
                rows="5"
                placeholder="Briefly describe your inquiry..."
                className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
