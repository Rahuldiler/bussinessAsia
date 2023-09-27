import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

import KycPending from "layouts/pages/users/KycPending";

// Image
import chat from "assets/images/illustrations/danger-chat-ill.png";
import { login_user, otp_request } from "Api/Api";
import { API_AUTHORIZATION_CODE } from "Api/Api";
import { CircularProgress } from "@mui/material";
//import { encrypt, decrypt } from "utils/constants";

function Illustration() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  useEffect(() => {
    if (!location.state.email) {
      navigate("/login");
    }
    document.getElementById("otp1").focus();
    document.addEventListener("keypress", (event) => {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      if (keyCode === 13) {
        if (otp1 === "" || otp2 === "" || otp3 === "" || otp4 === "") {
          setErrorMessage("Please fill in all OTP input fields");
        } else {
          setErrorMessage("");
          document.getElementById("otp_sbumit").click();
        }
      }
    });
  }, []);

  const handleOtp1 = (value) => {
    setOtp1("");
    if (isNaN(value) || value === "") {
      setOtp1("");
      document.getElementById("otp1").focus();
    } else {
      setOtp1(value);
      document.getElementById("otp2").focus();
    }
    setErrorMessage("");
  };
  const handleOtp2 = (value) => {
    if (isNaN(value) || value === "") {
      setOtp2("");
      document.getElementById("otp2").focus();
    } else {
      setOtp2(value);
      document.getElementById("otp3").focus();
    }
    setErrorMessage("");
  };
  const handleOtp3 = (value) => {
    if (isNaN(value) || value === "") {
      setOtp3("");
      document.getElementById("otp3").focus();
    } else {
      setOtp3(value);
      document.getElementById("otp4").focus();
    }
    setErrorMessage("");
  };
  const handleOtp4 = (value) => {
    if (isNaN(value) || value === "") {
      setOtp4("");
      document.getElementById("otp4").focus();
    } else {
      setOtp4(value);
      document.getElementById("otp4").blur();
      setTimeout(() => {
        setErrorMessage("");
        document.getElementById("otp_sbumit").click();
      }, 200);
    }
    setErrorMessage("");
  };

  const handleSubmit = () => {
    setButtonLoader(true);
    if (otp1 === "" || otp2 === "" || otp3 === "" || otp4 === "") {
      setErrorMessage("Please fill in all OTP input fields");
      setButtonLoader(false);
    } else {
      setIsLoading(true);
      setOtpError("");
      setErrorMessage("");
      const otpInput = otp1.toString() + otp2.toString() + otp3.toString() + otp4.toString();
      fetch(login_user, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({
          email: location.state.email,
          otp: otpInput,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          //console.log(data);
          if (data.status === 200)
          {
           
            //console.log("data===>", data, data?.data?.data.esignin);
            localStorage.setItem("refresh_token", data?.data?.refresh_token);
            localStorage.setItem("token", data?.data?.token);
            localStorage.setItem("level", data?.data?.data?.level);
            // const encryptedString = encrypt(JSON.stringify(data?.data?.data));
            // localStorage.setItem("userData", encryptedString);
            localStorage.setItem("userData", JSON.stringify(data?.data?.data));
            localStorage.setItem("initialLoginTime", new Date().getTime());
            localStorage.setItem("loginTime", new Date().getTime());
            // if (data?.data?.data?.meta["photo"]) {
            //   localStorage.setItem(
            //     "photo",
            //     data?.data?.urlPath + "/" + data?.data?.data?.meta["photo"]
            //   );
            // } else {
            //   localStorage.setItem("photo", "https://salesadmin.nuworld.co.in/public/dummy.jpg");
            // }
            localStorage.setItem("photo", "https://salesadmin.nuworld.co.in/public/dummy.jpg");

            localStorage.setItem("name", data?.data?.data?.name);
            setIsLoading(false);
            window.location = '/';
          //  if (data?.data?.data.esignin === 0) {
          //    navigate("/kycpending");
          //  } else {
         
          //  }
          } else if (data.status === 201) {
            setErrorMessage(data.error);
          } else if (data.status === 202) {
            if (data.errors.email) {
              setFieldError(data.errors.email[0]);
            } else if (data.errors.otp) {
              setFieldError(data.errors.otp[0]);
            } else {
            }
            setErrorMessage(data.error);
          } else if (data.status === 203) {
            setIsLoading(false);
            setErrorMessage(data.error);
          } else {
            setErrorMessage(data.message);
          }
          setButtonLoader(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setButtonLoader(false);
          console.error("Error:", error);
        });
    }
  };

  const callResendOtp = () => {
    navigate("/login");
  };

  return (
    <IllustrationLayout
      color="warning"
      header={
        <SoftBox px={5} textAlign="center">
          <SoftTypography variant="h4" fontWeight="bold">
            2-Step Verification
          </SoftTypography>
        </SoftBox>
      }
      illustration={{
        image: chat,
        title: "",
        description: "",
      }}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <Grid container spacing={2}>
            <Grid item xs>
              <SoftInput
                size="large"
                inputProps={{ maxLength: 1 }}
                id="otp1"
                value={otp1}
                onChange={(e) => handleOtp1(e.target.value)}
              />
            </Grid>
            <Grid item xs>
              <SoftInput
                size="large"
                inputProps={{ maxLength: 1 }}
                id="otp2"
                value={otp2}
                onChange={(e) => handleOtp2(e.target.value)}
              />
            </Grid>
            <Grid item xs>
              <SoftInput
                size="large"
                inputProps={{ maxLength: 1 }}
                id="otp3"
                value={otp3}
                onChange={(e) => handleOtp3(e.target.value)}
              />
            </Grid>
            <Grid item xs>
              <SoftInput
                size="large"
                inputProps={{ maxLength: 1 }}
                id="otp4"
                value={otp4}
                onChange={(e) => handleOtp4(e.target.value)}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={2}>
        {buttonLoader? <>
        
          <SoftButton
            variant="gradient"
            id="otp_sbumit"
            color="info"
            size="large"
            fullWidth
          >
            <CircularProgress style={{ width: "15px", color:"#fff", height: "15px" }} />
          </SoftButton>
  
        </> : <>
      
           <SoftButton
            variant="gradient"
            id="otp_sbumit"
            color="warning"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </SoftButton>
    
        </>}
       
       
        </SoftBox>
        <SoftBox textAlign="center">
          {errorMessage ? <>
            <SoftTypography variant="h6" fontWeight="bold" >
                <span style={{color:"red"}}>{errorMessage}</span>
            </SoftTypography>
          </> : <></>}
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Haven&apos;t received it?{" "}
            <SoftButton variant="text" color="info" size="small" onClick={callResendOtp}>
              Resend a new code
            </SoftButton>
            {/* <SoftTypography variant="button" onClick={callResendOtp}>
              Resend a new code
            </SoftTypography> */}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </IllustrationLayout>
  );
}

export default Illustration;
