import React from "react";
const Logout = () => { 
  localStorage.removeItem("otp");
  localStorage.removeItem("name");
  localStorage.removeItem("photo");
  localStorage.removeItem("token");
  localStorage.removeItem("level");
  localStorage.removeItem("userData");
  localStorage.removeItem("initialLoginTime");
  localStorage.removeItem("loginTime");
  localStorage.clear();
  sessionStorage.clear();
  window.open("/", "_self");
};
export default Logout;
