import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Verification from "./pages/Verification";
<<<<<<< HEAD
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";
=======

import {Route, Routes } from "react-router-dom";
>>>>>>> 47f5536dbe5129a2ade381887b2f724ba3ccfdd0
import Forgot from "./pages/Forgot";
import Vehicles from "./pages/Vehicles";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verification" element={<Verification />} />
<<<<<<< HEAD
        <Route path="/reset" element={<Reset />} />
        <Route path="/Vehicles" element={<Vehicles />} />
        <Route path="/About" element={<About />} />
        <Route path="/Dashboard" element={<Dashboard />} />
=======

        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/vehicles" element={<Vehicles />} />
>>>>>>> 47f5536dbe5129a2ade381887b2f724ba3ccfdd0
      </Routes>
    </>
  );
}

export default App;
