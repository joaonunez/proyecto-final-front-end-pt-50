import injectContext from "./store/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Nav } from "./components/Nav";
import { Camping } from "./views/Camping";
import { AboutUs } from "./views/AboutUs";
import { Contact } from "./views/Contact";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Campings } from "./views/Campings-List";
import { Prereserva } from "./components/Prereserva/Prerserva";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
            <Route path="/" element={< Home/>} />
            <Route path="/camping" element={<Camping/>} />
            <Route path="/campings" element={<Campings />} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/prereserva" element={<Prereserva/>} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default injectContext(App);
