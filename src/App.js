import injectContext from "./store/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Nav } from "./components/Nav";
import { Camping } from "./views/camping/Camping";
import { AboutUs } from "./views/AboutUs";
import { Contact } from "./views/Contact";
import { Login } from "./views/login/CustomerLogin";
import { Register } from "./views/register/CustomerRegister";
import { CampingsList } from "./views/camping/CampingsList";
import { Prereserva } from "./components/Prereserva/Prerserva";
import { ProviderLogin } from "./views/login/ProviderLogin";
import { ProviderRegister } from "./views/register/ProviderRegister";
import { Review } from "./components/review/Review";
import { Booking } from "./components/booking/Booking";
import CampingSite from "./components/site/CampingSite";
import { Footer } from "./components/footer/Footer";
import { ProviderDashboard } from "./views/provider-camping/ProviderDashboard";
import { UserSettings } from "./views/user-config/UserSettings";
import { MyReservationsView } from "./views/my-reservation-for-user/MyReservationsView";
import { ReservationViewForm } from "./views/generate-reservation/ReservationViewForm";
import { EditCampingForm } from "./views/edit-forms/EditCampingForm";
import ProtectedRoute from "./ProtectedRoute"; // Importar ProtectedRoute

function App() {
  return (
    <div className="main-container">
      <Router>
        <Nav />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camping/:id" element={<Camping />} />
            <Route path="/campings" element={<CampingsList />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Rutas protegidas por rol */}
            <Route path="/login" element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/register" element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            } />
            
            <Route path="/prereserva" element={<Prereserva />} />
            <Route path="/provider-login" element={<ProviderLogin />} />
            <Route path="/provider-register" element={<ProviderRegister />} />
            
            {/* Solo los clientes pueden acceder a las siguientes rutas */}
            <Route path="/my-reservations" element={
              <ProtectedRoute requiredRole={3}>
                <MyReservationsView />
              </ProtectedRoute>
            } />
            <Route path="/user-config" element={
              <ProtectedRoute requiredRole={[3,2]}>
                <UserSettings />
              </ProtectedRoute>
            } />
            
            {/* Solo los proveedores pueden acceder a las siguientes rutas */}
            <Route path="/provider-dashboard" element={
              <ProtectedRoute requiredRole={2}>
                <ProviderDashboard />
              </ProtectedRoute>
            } />
            <Route path="/edit-forms/:campingId" element={
              <ProtectedRoute requiredRole={2}>
                <EditCampingForm />
              </ProtectedRoute>
            } />

            <Route path="/reservation-request" element={
              <ProtectedRoute requiredRole={3}>
                <ReservationViewForm />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default injectContext(App);
