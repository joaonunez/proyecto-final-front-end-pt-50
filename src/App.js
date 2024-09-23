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
            <Route path="/login" element={<Login />} />
            <Route path="/prereserva" element={<Prereserva />} />
            <Route path="/register" element={<Register />} />
            <Route path="/provider-login" element={<ProviderLogin />} />
            <Route path="/provider-register" element={<ProviderRegister />} />
            <Route path="/review" element={<Review />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/campingSite" element={<CampingSite />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} /> 
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default injectContext(App);