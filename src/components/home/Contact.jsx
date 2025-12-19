const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50 px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Info Side */}
        <div className="bg-blue-600 p-12 text-white md:w-1/3">
          <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
          <p className="text-blue-100 mb-8">
            Have questions about how to help or get aid?
          </p>
          <div className="space-y-4 text-sm">
            <p>📍 HQ: Tech Plaza, Sector 7</p>
            <p>📞 Emergency: +1 800-RELIEF</p>
            <p>✉️ support@reliefportal.org</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-12 md:w-2/3">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              rows="4"
              placeholder="How can we help?"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
