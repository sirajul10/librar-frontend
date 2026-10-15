import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";


const Login = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const {authUser,setAuthUser} = useContext(AuthContext);
  const navigator = useNavigate()


  const handleLogin = async () => {
  try {
    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch(`${baseurl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await res.json();

    console.log(data);
    const accessToken = data?.access_token
    localStorage.setItem("lm_token",accessToken);
    const userRes = await fetch(`${baseurl}/user`,{
      headers:{Authorization:`Bearer ${accessToken}`}
    });
    const userData = await userRes.json();
    
    if(userData.id)
    {
     setAuthUser(userData);
     navigator('/');
    toast.success(userData.detail)
    }else
    {
      return;
    }
    
    // console.log(userData);
  } catch (error) {
    console.log(error);
  }
}
// console.log(authUser);
  return (
    <div className="hero bg-base-200 min-h-screen">
      {" "}
      <div className="hero-content flex-col w-full">
        {" "}
        <div className="text-center">
          {" "}
          <h1 className="text-5xl font-bold">Login now!</h1>{" "}
          <p className="py-6"> Provide your login credential </p>{" "}
        </div>{" "}
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          {" "}
          <div className="card-body">
            {" "}
            <fieldset className="fieldset">
              {" "}
              {/* Email */} <label className="label">Username</label>{" "}
              <input
                type="text"
                className="input w-full"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />{" "}
              {/* Password */} <label className="label">Password</label>{" "}
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />{" "}
              {/* Signup Link */}{" "}
              <div className="mt-2">
                {" "}
                <Link to="/signup" className="link link-hover">
                  {" "}
                  I don't have an account?{" "}
                </Link>{" "}
              </div>{" "}
              {/* Login Button */}{" "}
              <button onClick={handleLogin} className="btn btn-neutral mt-4"> Login </button>{" "}
            </fieldset>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Login;
