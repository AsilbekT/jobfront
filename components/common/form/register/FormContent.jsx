import React, { useState } from "react";
import fetchFromApi from '../../../../pages/api/api';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const FormContent = ({ role }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();
  let is_employer = false;
  let path = "/candidate/dashboard"
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== password2) {
      console.log("Passwords do not match");
      return;
    }
    if (role === 'employer') {
      is_employer = true;
      path = "/employer/dashboard";
    }
    try {
      const response = await fetchFromApi("/api/accounts/register/", "POST", {
        email,
        username,
        password,
        password2,
        is_employer
      });

      const { status, code, message, data } = response;

      console.log(role, data.token);

      // If registration was successful, redirect the user
      if (status === 'success') {
        const { token } = data;
        cookie.set("token", token);

        window.location.href = path
      }

    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Confirm password</label>
        <input
          id="password-field2"
          type="password"
          name="password2"
          placeholder="Confirm password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
        />
      </div>

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default FormContent;
