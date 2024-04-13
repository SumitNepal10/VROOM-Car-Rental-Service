import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Verification from "./pages/Verification";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";
import Forgot from "./pages/Forgot";
import Vehicles from "./pages/Vehicles";
import Dashboard from "./pages/Dashboard";
import ManageCars from "./pages/ManageCars";
import Bookings from "./pages/Bookings";
import BookCar from "./pages/BookCar";
import ConfirmBooking from "./pages/ConfirmBooking";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verification/:token" element={<Verification />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/Vehicles" element={<Vehicles />} />
        <Route path="/About" element={<About />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/ManageCars" element={<ManageCars />} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/BookCar" element={<BookCar />} />
        <Route path="/ConfirmBooking" element={<ConfirmBooking />} />
      </Routes>
    </>
  );
}

export default App;
