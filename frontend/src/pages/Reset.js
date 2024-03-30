import React from 'react'
import { Link } from "react-router-dom";


function Reset() {
  return (
    <div className="reset">
  <div className="container">
    <img id="pwd" src="image/pwd.png" />
    <h5>Reset your password</h5>
    <br />
    <form className="password-form">
      <div className="pwdform-group">
        <label>Password</label>
        <br />
        <input
          type="newpwd"
          id="email"
          name="email"
          placeholder="Enter a new password"
          required=""
        />
        <br />
        <br />
        <label>Confirm password</label>
        <br />
        <input
          type="confirmpwd"
          id="email"
          name="email"
          placeholder="Confirm your new password"
          required=""
        />
      </div>
      <button id="newpassword" type="submit">
        Reset password
      </button>
    </form>
  </div>
</div>

  )
}

export default Reset