import { useState, useEffect, useMemo, Fragment } from "react";
import Grid from "@mui/material/Grid";
// // @mui material components
// import { ThemeProvider } from "@mui/material/styles";

// // Soft UI Dashboard PRO React themes
// import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import SoftAlert from "components/SoftAlert";
import AnnouncementCard from "examples/Cards/AnnouncementCard";

//import rtlPlugin from "stylis-plugin-rtl";
//import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// import CssBaseline from "@mui/material/CssBaseline";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import Badge from "@mui/material/Badge";

import { fetch_kyc_status } from "Api/Api";
import { API_AUTHORIZATION_CODE } from "Api/Api";
import { CircularProgress } from "@mui/material";

// import SoftBox from "components/SoftBox";
//import "./kycdefault.css";

export default function KycPending() {
  const [loader, setLoader] = useState(false);
  // const [rtlCache, setRtlCache] = useState(null);
  // useMemo(() => {
  //   const cacheRtl = createCache({
  //     key: "rtl",
  //     stylisPlugins: [rtlPlugin],
  //   });

  //   setRtlCache(cacheRtl);
  // }, []);

  // useEffect(() => {
  //   const userData = localStorage.getItem("userData");
  //   if (userData !== null) {
  //     const udj = JSON.parse(userData);
  //     console.log(udj.meta);
  //   }
  // }, []);

  const doVerify = () => {
    setLoader(true);
    const ud = JSON.parse(localStorage.getItem("userData")).id;
    const url = `${fetch_kyc_status}?id=${ud}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_AUTHORIZATION_CODE,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          if (response.esignin) {
            const jsonString = localStorage.getItem("userData");
            const jsonObject = JSON.parse(jsonString);
            jsonObject.esignin = 1;
            const updatedJsonString = JSON.stringify(jsonObject);
            localStorage.setItem("userData", updatedJsonString);
            setLoader(false);
            alert("Verification process successfully completed");
            window.location.reload();
          } else {
            setLoader(false);
            alert("Verification process not completed yet. Please complete verification process");
            window.open(response.url);
          }
        } else {
          if (response.status === 201) {
            setLoader(false);
            alert(response.message);
            window.open(response.url);
          } else {
            setLoader(false);
            console.log(response);
          }
        }
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
  };
  const userData = JSON.parse(localStorage.getItem("userData"));

  var heading = '';
  var textPrint = '';
  var noteText = '';
  if (userData.existing_user === 0 && userData.esignin === 0) {
    heading = "Welcome to NUWorld! We're excited to have you on board. In order to provide you with the best experience and ensure the security of your account, we kindly request you to complete the Know Your Customer (KYC) process. Please click on the verify you will be prompted to complete the KYC process and will be redirected to secure website for KYC.";
    textPrint = "Please check your inbox for our email regarding onboarding. Open the email, click the onboarding URL to access our secure KYC verification page, where you'll be guided to submit confidential identification documents for verification. VERIFY and complete the process to have full access to system.";
    noteText = "Note:- Payouts will be processed to the KYC verified users only";
  }
  if (userData.existing_user === 1 && userData.esignin === 0) {
    heading = "Welcome to NUWorld! We're excited to have you on board. In order to provide you with the best experience and ensure the security of your account, we kindly request you to complete the Know Your Customer (KYC) process. Please click on the verify you will be prompted to complete the KYC process and will be redirected to secure website for KYC.";
    textPrint = "Please check your inbox for our email regarding onboarding. Open the email, click the onboarding URL to access our secure KYC verification page, where you'll be guided to submit confidential identification documents for verification. VERIFY and complete the process to have full access to system. Step2. Do first payment, after payment you will be able to add associate and user portal access features will be available.";
    noteText = "Note:- Payouts will be processed to the KYC verified users only";
  }
  return (
    // <CacheProvider value={rtlCache}>
    //   <ThemeProvider theme={themeRTL}>
    //     <CssBaseline />
    //     <DashboardLayout>
    <Fragment>
      <SoftBox py={3}>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={12}
            style={{ background: "#fff", borderRadius: "10px", padding: "20px" }}
          >
            <div>
              <span style={{
                fontSize: "small", background: "deepskyblue", color: "#fff",
                padding: "5px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
              >
                RECOMMENDATION
              </span>
            </div>

            <span style={{ fontSize: "initial", fontWeight: "bold" }}>{heading}</span>
            <p style={{ fontSize: "initial", marginTop: "10px" }}>{textPrint}</p>
            <p style={{ fontSize: "initial", marginTop: "10px", color: "blue" }}>{noteText}</p>
            {loader ? <>
              <SoftBox mt={4} mb={1}>
                <SoftButton
                  variant="gradient"
                  size="small"
                  color="info"
                  style={{ float: "right" }}
                >
                  <CircularProgress style={{ width: "15px", color: "#fff", height: "15px" }} />
                </SoftButton>
              </SoftBox>
            </> : <>
              <SoftBox mt={4} mb={1}>
                <SoftButton
                  variant="gradient"
                  size="small"
                  color="info"
                  onClick={doVerify}
                  style={{ float: "right" }}
                >
                  Verify
                </SoftButton>
              </SoftBox>
            </>}

          </Grid>
        </Grid>
      </SoftBox>
    </Fragment>
    //     </DashboardLayout>
    //   </ThemeProvider>
    // </CacheProvider>
  );
}
