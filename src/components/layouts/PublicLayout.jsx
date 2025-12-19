import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      {/* flex-grow ensures the footer stays at the bottom if page content is short */}
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
