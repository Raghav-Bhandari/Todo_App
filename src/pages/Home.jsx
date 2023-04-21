import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App.jsx";
import "../styles/Home.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server } from "../App";
import DataTask from "../components/DataTask.jsx";
import { Navigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
const Home = () => {
  const { isAuthenticated, Tasks, setTasks } = useContext(Context);
  const [isLoading, setisLoading] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [refresh, setrefresh] = useState(false);
  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setrefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data, message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      setrefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data, message);
    }
  };

  const taskhandler = async () => {
    setisLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setrefresh((prev) => !prev);
      toast.success(data.message);
      setisLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisLoading(false);
    }
    settitle("");
    setdescription("");
  };
  useEffect(() => {
    axios
      .get(`${server}/task/my`, { withCredentials: true })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [refresh]);
  // console.log(Tasks.length);
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="home-container">
      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
        <button className="btn" onClick={taskhandler}>
          {isLoading ? (
            <Bars height="20" width="40" color="#bfbfbf" visible={true} />
          ) : (
            "Add Task"
          )}
        </button>
      </div>
      {Tasks.map((task) => (
        <DataTask
          key={task._id}
          title={task.title}
          description={task.description}
          isCompleted={task.isCompleted}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          id={task._id}
        />
      ))}
    </div>
  );
};

export default Home;
