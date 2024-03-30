import React from 'react'
import { Link } from "react-router-dom";

function Forgot() {
  return (
    <div className="reset">
  <div className="container">
    <img id="resetpwd" src="image/reset.png" />
    <h3>Forgot your password?</h3>
    <br />
    <h7>
      Enter your email address and we'll send you a link to reset your password.
    </h7>
    <form className="reset-form">
      <div className="resetform-group">
        <input
          type="resetemail"
          id="email"
          name="email"
          placeholder="Enter your email"
          required=""
        />
      </div>
      <button id="reset" type="submit">
        Reset password
      </button>
      <button id="sign" type="submit">
        Signup
      </button>
      <br />
      <br />
      <p4> Return to </p4>
      <p5>
        {" "}
        <Link to="/login">Login</Link>
      </p5>
    </form>
  </div>
</div>

  )
}

export default Forgot