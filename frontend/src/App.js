import "./style.css";
import "./register.css";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reset from "./pages/Reset";

import { Route, Routes } from "react-router-dom";
import Forgot from "./pages/Forgot";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
