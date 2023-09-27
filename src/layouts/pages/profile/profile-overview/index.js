/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState, useEffect, Fragment } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftBadge from "components/SoftBadge";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/pages/profile/components/Header";
//import PlatformSettings from "layouts/pages/profile/profile-overview/components/PlatformSettings";

// Data
//import profilesListData from "layouts/pages/profile/profile-overview/data/profilesListData";

// Images
/* import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg"; */
import { profile, BACKEND_STORAGE_URL, verify_pan_aadhar, fetch_kyc_status } from "Api/Api";
import CircularProgress from "@mui/material/CircularProgress";
import { NoBackpackSharp } from "@mui/icons-material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { API_AUTHORIZATION_CODE } from "Api/Api";

const Alert = React.forwardRef(function Alert(props, ref)
{
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px dashed #bfbfbf",
  boxShadow: "0px 0px 5px #bfbfbf",
  p: 2,
};

function Overview()
{
  const [state, setState] = useState({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "success",
  });
  //const { vertical, horizontal, openSnack } = state;
  const [profileData, setProfileData] = useState();
  const [permanentAddress, setPermanentAddress] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPanCardModalOpen, setIsPanCardModalOpen] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [aadharStatus, setAadharStatus] = useState("");
  const [panStatus, setPanStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [btnDis, setBTNDis] = useState(false);
  const [esignin, setEsignin] = useState(0);
  console.log(profileData);
  const handleSnackClose = () =>
  {
    setState({ ...state, openSnack: false, message: "" });
  };

  const handleOpen = (type) =>
  {
    if (type === "aadhar")
    {
      setDocumentType(
        `${BACKEND_STORAGE_URL}/${profileData.usersDetails.documents_details.aadhar_card}`
      );
    } else
    {
      setDocumentType(
        `${BACKEND_STORAGE_URL}/${profileData.usersDetails.documents_details.pan_card}`
      );
    }
    setOpen(true);
  };
  const handleClose = () =>
  {
    setOpen(false);
  };

  const verifyThis = (type, value) =>
  {
    const u = JSON.parse(localStorage.getItem("userData"));
    setBTNDis(true);
    fetch(verify_pan_aadhar, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_AUTHORIZATION_CODE,
      },
      body: JSON.stringify({ id: u.id, verify: type, value: value, name: userName }),
    })
      .then((response) => response.json())
      .then((response) =>
      {
        setLoader(false);
        if (response.status === 200)
        {
          setBTNDis(false);
          // console.log("Response: ", response.message);
          if (response.status_message === "success")
          {
            setState({
              ...state,
              openSnack: true,
              severity: "success",
              message: response.message,
            });
          } else
          {
            setState({ ...state, openSnack: true, severity: "error", message: response.message });
          }
          //console.log("verification response: ", response);
          //window.location.reload();
        }
      })
      .catch((error) => { });
  };

  const verifyDocumentStatus = (dataset) =>
  {
    if (dataset)
    {
      const { aadhar_status, pan_status } = dataset.meta;
      if (aadhar_status === undefined)
      {
        setAadharStatus("Not Verified");
      }
      if (pan_status === undefined)
      {
        setPanStatus("Not Verified");
      }
    }
  };

  useEffect(() =>
  {
    const userAadharPan = JSON.parse(localStorage.getItem("userData"));
    setUserName(userAadharPan.name);
    setAadharNumber(userAadharPan.aadhar);
    setPanNumber(userAadharPan.pan);
    setEsignin(userAadharPan.esignin);
    getLocalToke();
    verifyDocumentStatus();
  }, []);
  const getLocalToke = async () =>
  {
    const token = await localStorage.getItem("token");
    // console.log(token);
    if (token)
    {
      setLoader(true);
      fetch(profile, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({ token: token }),
      })
        .then((response) => response.json())
        .then((response) =>
        {
          setLoader(false);
          const data = response.data;
          if (data)
          {
            setLoader(false);
            setProfileData(data);
            const {
              street: ps,
              city: pc,
              state: pst,
              postcode: pp,
              country: pct,
            } = data.usersDetails.contact_details.permanent_address;
            const {
              street: rs,
              city: rc,
              state: rst,
              postcode: rp,
              country: rct,
            } = data.usersDetails.contact_details.residential_address;
            setPermanentAddress(`${ps} ${pc} ${pst} ${pp} ${pp} ${pct}`);
            setResidentialAddress(`${rs} ${rc} ${rst} ${rp} ${rp} ${rct}`);
            verifyDocumentStatus(data.user);
          } else
          {
            setLoader(false);
          }
        })
        .catch((error) =>
        {
          setLoader(false);
        });
    }
  };

  const doVerify = () =>
  {
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
      .then((response) =>
      {
        if (response.status === 200)
        {
          if (response.esignin)
          {
            const jsonString = localStorage.getItem("userData");
            const jsonObject = JSON.parse(jsonString);
            jsonObject.esignin = 1;
            const updatedJsonString = JSON.stringify(jsonObject);
            localStorage.setItem("userData", updatedJsonString);
            alert("Verification process successfully completed");
            window.location.reload();
          } else
          {
            alert("Verification process not completed yet. Please complete verification process");
            window.open(response.url);
          }
        } else
        {
          console.log(response);
        }
      })
      .catch((error) =>
      {
        console.error(error);
      });
  };
  return (
    <DashboardLayout>
      {profileData?.user && (
        <Fragment>
          <Header data={{ userData: profileData }} />
          <SoftBox mt={5} mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={6}>
                <ProfileInfoCard
                  title="profile information"
                  description={`Hi, I’m ${profileData?.user?.name}.`}
                  info={{
                    fullName: `${profileData?.user?.name}`,
                    mobile: `${profileData?.user?.phone}`,
                    email: `${profileData?.user?.email}`,
                    // permanentAddress: `${permanentAddress}`,
                    // residentialAddress: `${residentialAddress}`,
                    statue: `${profileData?.user?.status === 1 ? "Active" : "In-Active"}`,
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                {/* <PlatformSettings /> */}
                <ProfileInfoCard
                  title="Level Details"
                  info={{
                    "Level Name": `${profileData?.levelDetails?.name}`,
                    //'Benefit Percentage': `${profileData?.level_benefits.benefit_amount}%`,
                    //  businessAmount: `${profileData?.level_benefits.business_amount}`,
                    //teamBenefit: `${profileData?.level_benefits.team_benefit}%`,
                    //description: `${profileData?.levelDetails.description}`,
                    // "Aadhar Status": (
                    //   <>
                    //     {aadharStatus !== "Not Verified" ? (
                    //       <span
                    //         style={{
                    //           background: "palegreen",
                    //           color: "#000",
                    //           padding: "6px",
                    //           borderRadius: "5px",
                    //         }}
                    //       >
                    //         {aadharNumber !== null ? aadharNumber : "NOT VERIFIED"}
                    //       </span>
                    //     ) : (
                    //       <>
                    //         <span
                    //           style={{
                    //             background: "orange",
                    //             color: "#000",
                    //             padding: "6px",
                    //             borderRadius: "5px",
                    //           }}
                    //         >
                    //           {aadharNumber !== null ? aadharNumber : "NOT VERIFIED"}
                    //         </span>{" "}
                    //         {aadharNumber !== null && (
                    //           <SoftButton
                    //             color="info"
                    //             variant="gradient"
                    //             size="small"
                    //             disabled={btnDis}
                    //             onClick={() => verifyThis("aadhaar", aadharNumber)}
                    //           >
                    //             {btnDis ? (
                    //               <CircularProgress style={{ width: "15px", height: "15px" }} />
                    //             ) : (
                    //               "Verify"
                    //             )}
                    //           </SoftButton>
                    //         )}
                    //       </>
                    //     )}
                    //   </>
                    // ),

                    "KYC Status": (
                      <>
                        <span
                          style={{
                            background: "yellow",
                            color: "#000",
                            padding: "6px",
                            borderRadius: "5px",
                          }}
                        >
                          {esignin === 0 ? "NOT VERIFIED" : "VERIFIED"}
                        </span>{" "}
                        {esignin === 0 && (
                          <SoftButton
                            variant="gradient"
                            color="info"
                            size="small"
                            onClick={doVerify}
                          >
                            Verify
                          </SoftButton>
                        )}
                      </>
                    ),
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                />
              </Grid>
              {/* <Grid item xs={12} xl={4}></Grid> */}
            </Grid>
          </SoftBox>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Document
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                style={{ textAlign: "center" }}
              >
                <img src={documentType} width="300px" />
              </Typography>
              <SoftButton
                style={{ flaot: "right" }}
                variant="gradient"
                size="small"
                color="warning"
                onClick={handleClose}
              >
                Close
              </SoftButton>
            </Box>
          </Modal>
        </Fragment>
      )}
      <Footer />
      {/* <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={state.openSnack}
        onClose={handleSnackClose}
        autoHideDuration={3000}
        message=""
        key={"bottomright"}
      >
        <Alert onClose={handleSnackClose} severity={state.severity} sx={{ width: "100%" }}>
          {state.message}
        </Alert>
      </Snackbar> */}
    </DashboardLayout>
  );
}

export default Overview;
