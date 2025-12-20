import { BrowserRouter, Route, Routes } from "react-router";
import PublicLayout from "./components/layouts/PublicLayout";
import AppLayout from "./components/layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminVolunteers from "./pages/admin/AdminVolunteers";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerTasks from "./pages/volunteer/VolunteerTasks";
import VolunteerStatus from "./pages/volunteer/VolunteerStatus";
import CitizenNewRequest from "./pages/citizen/CitizenNewRequest";
import CitizenRequestHistory from "./pages/citizen/CitizenRequestHistory";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";

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

        <Route path="/admin" element={<AppLayout role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="volunteers" element={<AdminVolunteers />} />
        </Route>

        <Route path="/volunteer" element={<AppLayout role="volunteer" />}>
          <Route index element={<VolunteerDashboard />} />
          <Route path="tasks" element={<VolunteerTasks />} />
          <Route path="status" element={<VolunteerStatus />} />
        </Route>

        {/* Citizen Routes - With Sidebar */}
        <Route path="/citizen" element={<AppLayout role="citizen" />}>
          <Route index element={<CitizenDashboard />} />
          <Route path="request" element={<CitizenNewRequest />} />
          <Route path="request-history" element={<CitizenRequestHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
