import React from "react";

const Notification = ({ message, state }) => {
  if (message === null) {
    console.log(`mess: ${message}`);
    return null;
  }
  if (state) {
    return <div className="noti">{message}</div>;
  } else {
    return <div className="badnoti">{message}</div>;
  }
};

export default Notification;
