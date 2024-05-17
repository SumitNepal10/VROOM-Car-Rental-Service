import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Verification from "./pages/Verification";
import About from "./pages/About";
import Forgot from "./pages/Forgot";
import Vehicles from "./pages/Vehicles";
import Dashboard from "./pages/Dashboard";
import ManageCars from "./pages/ManageCars";
import Bookings from "./pages/Bookings";
import BookCar from "./pages/BookCar";
import ConfirmBooking from "./pages/ConfirmBooking";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import UserDashboard from "./pages/UserDashboard";
import Users from "./pages/Users";
import PaymentRecord from "./pages/PaymentRecord";
import Payment from "./pages/Payment";
import FAQPage from "./pages/FAQ";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAdminUser = localStorage.getItem("isAdmin") === "true";
    const isLoggedInUser = localStorage.getItem("isLoggedIn") === "true";

    setIsAdmin(isAdminUser);
    setIsLoggedIn(isLoggedInUser);
    setIsLoading(false); 

  }, []); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <Route
          path="/Dashboard"
          element={
            isLoggedIn ? (
              isAdmin ? (
                <Dashboard />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/ManageCars"
          element={
            isLoggedIn ? (
              isAdmin ? (
                <ManageCars />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/Bookings"
          element={
            isLoggedIn ? (
              isAdmin ? (
                <Bookings />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/BookCar" element={<BookCar />} />
        <Route path="/ConfirmBooking/:carId" element={<ConfirmBooking />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route
          path="/UserDashboard"
          element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/Users"
          element={
            isLoggedIn ? (
              isAdmin ? (
                <Users />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/Payment/:carId" element={<Payment />} />
        <Route path="/PaymentRecord" element={<PaymentRecord />} />
        <Route path="/FAQPage" element={<FAQPage />} />
      </Routes>
    </>
  );
}

export default App;
