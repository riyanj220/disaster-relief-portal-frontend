import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import useAuthStore from "./store/useAuthStore";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import PublicLayout from "./components/layouts/PublicLayout";
import AppLayout from "./components/layouts/AppLayout";

// Pages
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
  const initialize = useAuthStore((state) => state.initialize);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    // Start listening to Firebase Auth state changes on mount
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading Portal...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Admin Routes - Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AppLayout role="admin" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="volunteers" element={<AdminVolunteers />} />
        </Route>

        {/* Volunteer Routes - Protected */}
        <Route
          path="/volunteer"
          element={
            <ProtectedRoute allowedRoles={["VOLUNTEER"]}>
              <AppLayout role="volunteer" />
            </ProtectedRoute>
          }
        >
          <Route index element={<VolunteerDashboard />} />
          <Route path="tasks" element={<VolunteerTasks />} />
          <Route path="status" element={<VolunteerStatus />} />
        </Route>

        {/* Citizen Routes - Protected */}
        <Route
          path="/citizen"
          element={
            <ProtectedRoute allowedRoles={["CITIZEN"]}>
              <AppLayout role="citizen" />
            </ProtectedRoute>
          }
        >
          <Route index element={<CitizenDashboard />} />
          <Route path="request" element={<CitizenNewRequest />} />
          <Route path="request-history" element={<CitizenRequestHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
