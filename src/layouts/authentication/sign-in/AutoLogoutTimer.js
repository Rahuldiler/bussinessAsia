import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { useHistory } from "react-router";

const SESSION_IDLE_MINUTES = 120;

const AutoLogoutTimer = (props) => {
  const { ComposedClass } = props;
  const history = useHistory();

  const handleOnIdle = (event) => { 
   let text = "Session Time Out, Click OK to Logout and Cancel to Stay Active.";
      //  if (window.confirm(text) === true) {
          //  toast.info("Your last session expired!");
           // alert("Your last session expired!");
          //  history.push("/logout");
          window.location.href = "/logout";
      //   }
  };

  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * SESSION_IDLE_MINUTES,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return <ComposedClass />;
};

export default AutoLogoutTimer;
