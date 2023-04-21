import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/Header.css";
import { Context, server } from "../App";
import axios from "axios";
import { toast } from "react-hot-toast";
const Header = () => {
  const { isAuthenticated, setisAuthenticated, isLoader, setisLoader } =
    useContext(Context);
  const logouthandler = () => {
    setisLoader(true);
    try {
      const { data } = axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      setisLoader(false);
      toast.success("Logged Out Successfully");
      setisAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(true);
      console.log(error);
    }
  };
  return (
    <nav className="header">
      <div>
        <Link to={"/"}>
          <span>Todo App</span>
          <span>Todo</span>
        </Link>
      </div>
      <article>
        <Link to={"/home"}>Home</Link>
        <Link to={isAuthenticated ? "/profile" : "/"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={isLoader} onClick={logouthandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
