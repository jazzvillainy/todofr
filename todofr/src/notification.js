import React from "react";

export const notification = (text = "enabled") => {
  if (!("Notification" in window)) {
    alert("not supported");
  } else if (Notification.permission === "granted") {
   new Notification("kjkjfkfknnsdvsvsdh")
  }
};
