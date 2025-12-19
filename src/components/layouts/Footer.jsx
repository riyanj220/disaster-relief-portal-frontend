
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span className="font-bold text-gray-700 text-lg">ReliefPortal</span>
        </div>
        
        <p className="text-gray-500 text-sm">
          &copy; 2025 Disaster Relief Portal. All rights reserved.
        </p>

        <div className="flex gap-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;