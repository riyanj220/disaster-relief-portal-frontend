import { BrowserRouter, Route, Routes } from "react-router";
import PublicLayout from "./components/layouts/PublicLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside this wrap will share Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Later, you can add:
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
        </Route> 
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
