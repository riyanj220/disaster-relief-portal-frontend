const About = () => {
  return (
    <section id="about" className="py-20 bg-white px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-slate-900">
            Why ReliefPortal?
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            During disasters, the biggest challenge isn't the lack of
            resources—it's the
            <strong> lack of coordination</strong>. ReliefPortal was built to
            ensure that every request is heard and every resource is utilized
            efficiently.
          </p>
          <ul className="space-y-4">
            {[
              "AI-Driven Priority Engine",
              "Real-time Inventory Tracking",
              "Verified Volunteer Network",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-gray-800 font-medium"
              >
                <span className="text-emerald-500">✔</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-full blur-3xl"></div>
          <blockquote className="italic text-blue-900 text-xl leading-relaxed">
            "Our goal is to reduce response time from days to minutes. In a
            disaster, every second saved is a life potentially protected."
          </blockquote>
          <p className="mt-4 font-bold text-blue-600">— Platform Vision</p>
        </div>
      </div>
    </section>
  );
};

export default About;
