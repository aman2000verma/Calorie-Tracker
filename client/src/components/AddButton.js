import React from "react";
import "../css/AddButton.css";

const AddButton = (props) => {
  return (
    <div className="btn-container">
      <button onClick={props.onClick}>Log New Item</button>
    </div>
  );
};

export default AddButton;
