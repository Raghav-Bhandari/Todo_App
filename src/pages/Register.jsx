import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../App.jsx";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
const Register = () => {
  const { isLoader, setisLoader } = useContext(Context);
  const [isRegistered, setisRegistered] = useState(false);
  const [userDetail, setuserDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submithandler = async (e) => {
    e.preventDefault();
    const { name, email, password } = userDetail;
    console.log(name);
    console.log(email);
    console.log(password);
    setisLoader(true);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setisLoader(false);
      toast.success(data.message);
      setisRegistered(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setisRegistered(false);
      // setisAuthenticated(false);
      console.log(error);
    }
  };
  if (isRegistered) return <Navigate to="/login" />;

  return (
    <div className="login">
      <span>Sign Up</span>
      <section>
        <form onSubmit={submithandler}>
          <input
            type="text"
            placeholder="Name"
            value={userDetail.name}
            onChange={(e) => {
              setuserDetail({ ...userDetail, name: e.target.value });
            }}
            required
          />
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
              "Register"
            )}
          </button>
          <span>Or</span>
          <Link to={"/login"}>Login In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
