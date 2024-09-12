import injectContext from "./store/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Nav } from "./components/Nav";
import { Camping } from "./views/Camping";
import { AboutUs } from "./views/AboutUs";
import { Contact } from "./views/Contact";
import { Login } from "./views/Login";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
            <Route path="/" element={< Home/>} />
            <Route path="/camping" element={<Camping/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default injectContext(App);
