import React, { useState } from "react";
import { Link } from "react-router";
import { baseurl } from "../services/BaseUrl";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = async()=>
  {
    const userData = {
      email,
      username,
      firstname,
      lastname,
      password,
      role
    }
    const res = await fetch(`${baseurl}/createuser`,{
      method:"POST",
      headers:
      {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(userData)
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Sign Up!</h1>
          <p className="py-6">Fill up the form correctly</p>
        </div>

        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Username */}
              <label className="label">Username</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {/* First Name */}
              <label className="label">First Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />

              {/* Last Name */}
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Role */}
              <label className="label">Role</label>
              <select
                className="select w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              {/* Links */}
              <div className="flex justify-between mt-2">
                <Link to="/login" className="link link-hover">
                  I already have an account
                </Link>

                <Link to="/forgot-password" className="link link-hover">
                  Forgot password?
                </Link>
              </div>

              {/* Signup button */}
              <button className="btn btn-neutral mt-4" onClick={handleSignup}>Signup</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
