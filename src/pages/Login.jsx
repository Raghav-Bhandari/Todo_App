import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/Login.css";
import { Context } from "../App";
import { server } from "../App.jsx";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Bars } from "react-loader-spinner";
const Login = () => {
  const { isAuthenticated, setisAuthenticated, isLoader, setisLoader } =
    useContext(Context);
  const [userDetail, setuserDetail] = useState({
    email: "",
    password: "",
  });
  const submithandler = async (e) => {
    e.preventDefault();
    setisLoader(true);
    const { email, password } = userDetail;
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setisLoader(false);
      toast.success(data.message);
      setisAuthenticated(true);
    } catch (error) {
      setisLoader(false);
      toast.error(error.response.data.message);
      setisAuthenticated(false);
      console.log(error);
    }
  };
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <span>Log In</span>
      <section>
        <form onSubmit={submithandler}>
          <input
            type="email"
            placeholder="Email"
            value={userDetail.email}
            onChange={(e) => {
              setuserDetail({ ...userDetail, email: e.target.value });
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={userDetail.password}
            onChange={(e) => {
              setuserDetail({ ...userDetail, password: e.target.value });
            }}
            required
          />
          <button className="btn" type="submit">
            {isLoader ? (
              <Bars height="20" width="40" color="#bfbfbf" visible={true} />
            ) : (
              "Login"
            )}
          </button>
          <span>Or</span>
          <Link to={"/register"}>Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
