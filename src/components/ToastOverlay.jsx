import React from "react";
import "./ToastOverlay.css";

const ToastOverlay = ({ message, type = "info" }) => {
  if (!message) return null;

  return (
    <div className={`toast-overlay ${type}`}>
      <div className="toast-message">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ToastOverlay;
