import React, { useContext, useEffect } from "react";
import { Context, server } from "../App.jsx";
import { Bars } from "react-loader-spinner";
import "../styles/Profile.css";
import { Navigate } from "react-router-dom";
import axios from "axios";
const Profile = ({taskn}) => {
  const {
    User,
    setUser,
    isAuthenticated,
    setisAuthenticated,
    setisLoader,
    isLoader,
  } = useContext(Context);
  useEffect(() => {
    setisLoader(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setisAuthenticated(true);
        setUser(res.data.user);
        setisLoader(false);
      })
      .catch((error) => {
        setisAuthenticated(false);
        setUser({});
        setisLoader(false);
      });
  }, []);
  return (
    <div className="profile">
      {!isAuthenticated ? (
        <Navigate to={"/login"} />
      ) : isLoader ? (
        <Bars
          className="profile-loader"
          height="50"
          width="50"
          color="#343334"
          visible={true}
        />
      ) : (
        <div className="task-form">
          <div>
            <h3>Name</h3>
            <span> {User.name}</span>
          </div>
          <div>
            <h3>E-Mail</h3>
            <span> {User.email}</span>
          </div>
          <div>
            <h3>No Of Tasks</h3>
            <span> {taskn}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
