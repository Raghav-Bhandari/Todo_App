import React from "react";
import "../styles/Task.css";

const DataTask = ({ title, description, isCompleted,updateHandler,deleteHandler,id }) => {
  return (
    <div className="task">
      <div className="task-details">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="task-updater">
        <input type="checkbox" checked={isCompleted} onChange={()=>updateHandler(id)} />
        <button className="btn" onClick={()=>deleteHandler(id)}>Delete</button>
      </div>
    </div>
  );
};

export default DataTask;
