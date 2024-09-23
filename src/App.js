import injectContext from "./store/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Nav } from "./components/Nav";
import { Camping } from "./views/camping/Camping";
import { AboutUs } from "./views/AboutUs";
import { Contact } from "./views/Contact";
import { Login } from "./views/login/CustomerLogin";
import { Register } from "./views/register/CustomerRegister";
import { Campings } from "./views/camping/Campings-List";
import { Prereserva } from "./components/Prereserva/Prerserva";
import { ProviderLogin } from "./views/login/ProviderLogin";
import { ProviderRegister } from "./views/register/ProviderRegister";
import { Review } from "./components/review/review";
import { Booking } from "./components/booking/Booking";
import { Footer } from "./components/footer/Footer";
import CampingSite from "./components/site/CampingSite";
import './assets/css/index.css';
import './assets/css/main.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Nav />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={< Home />} />
            <Route path="/camping/:id" element={<Camping />} />
            <Route path="/campings" element={<Campings />} />
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
            <Route path="/footer" element={<Footer />} />
          </Routes>
        </div>
        <div className="footer d-flex align-items-end">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default injectContext(App);
