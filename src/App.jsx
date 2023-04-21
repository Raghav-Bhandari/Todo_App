import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const Context = createContext({ isAuthenticated: false });
export const server = "https://todo-app-backend-9new.onrender.com/api/v1";
// export const server = "http://localhost:4000/api/v1";
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [User, setUser] = useState({});
  const [Tasks, setTasks] = useState([]);
  const [NoOfTask, setNoOfTask] = useState(0);
  // const [profile, setprofile] = useState(false);
  useEffect(() => {
    setisLoader(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setisAuthenticated(true);
        setisLoader(false);
      })
      .catch((error) => {
        setisAuthenticated(false);
        setUser({});
        setisLoader(false);
      });
  }, []);
  // setNoOfTask(Tasks.length);
  console.log(Tasks.length)
  return (
    <div>
      <Context.Provider
        value={{
          isAuthenticated,
          setisAuthenticated,
          isLoader,
          setisLoader,
          User,
          setUser,
          NoOfTask,
          setNoOfTask,
          setTasks,
          Tasks,
        }}
      >
        <Router>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile taskn={Tasks.length} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Toaster />
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
