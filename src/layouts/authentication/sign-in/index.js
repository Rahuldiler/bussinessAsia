import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Switch from "@mui/material/Switch";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

import chat from "assets/images/website/webLogo.png";

import { encrypt, decrypt } from "../../../../src/utils/constants";

import { otp_request, API_AUTHORIZATION_CODE } from "Api/Api";
import { CircularProgress } from "@mui/material";

function Illustration() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [buttonLoader, setButtonLoader] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   navigate("/");
    // }

    // document.addEventListener("keypress", (event) => {
    //   let keyCode = event.keyCode ? event.keyCode : event.which;
    //   if (keyCode === 13) {
    //     if (email === "") {
    //       setErrorMessage("Please Enter valid Email Address");
    //     } else {
    //       setErrorMessage("");
    //       document.getElementById("sign_in").click();
    //     }
    //   }
    // });
  }, []);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSignIn = () => {
    setButtonLoader(true);
    if (!validateEmail(email)) {
      setErrorMessage("Please Enter valid Email Address");
      setButtonLoader(false);
    } else {
      //setLoader(true);
      fetch(otp_request, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({ email: email }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 200) {
            navigate("/verification", {
              state: { email: email },
            });
          } else if (data.status === 202) {
            setErrorMessage(data.errors.email[0]);
            //setLoader(false);
          } else if (data.status === 203) {
            setErrorMessage(data.error);
            //setLoader(false);
          } else {
            setErrorMessage(data.error);
            //setLoader(false);
          }
          setButtonLoader(false);
        })
        .catch((error) => {
          //setLoader(false);
          setButtonLoader(false);
        });
    }
  };

  const checkEmail = (eml) => {
    setEmail(eml);
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignIn();
    }
  };

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and otp to sign in"
      illustration={{
        image: chat,
        title: "",
        description: "",
      }}
    >
       
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftInput
            type="email"
            placeholder="Email"
            size="large"
            value={email}
            onKeyPress={handleKeypress}
            onChange={(e) => checkEmail(e.target.value)}
          />
        </SoftBox>
        {/*
        <SoftBox mb={2}>
          <SoftInput type="password" placeholder="Password" size="large" />
        </SoftBox> 
        */}
        <SoftBox>
          <SoftTypography color="text" style={{ fontSize: "initial", color: "#B00020" }}>
            {errorMessage}
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        {buttonLoader? <>
          <SoftBox mt={4} mb={1}>
          <SoftButton
            variant="gradient"
            id="sign_in"
            color="info"
            size="large"
            fullWidth
          >
            <CircularProgress style={{ width: "15px", color:"#fff", height: "15px" }} />
          </SoftButton>
        </SoftBox>
        </> : <>
        <SoftBox mt={4} mb={1}>
          <SoftButton
            variant="gradient"
            id="sign_in"
            color="info"
            size="large"
            onClick={handleSignIn}
            fullWidth
          >
           Sign IN
          </SoftButton>
        </SoftBox>
        </>}
       
        {/* <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox> */}
      </SoftBox>
      
    </IllustrationLayout>
  );
}

export default Illustration;
