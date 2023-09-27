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
import { Routes, Route, useParams } from "react-router-dom";
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
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/associates/view/components/Header";
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
import { single_investor } from "Api/Api";

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

function AssociateView() {
  let { id } = useParams();

  const [singleAssociateInfo, setSingleAssociateInfo] = useState({});
  const [permanentAddress, setPermanentAddress] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPanCardModalOpen, setIsPanCardModalOpen] = useState(false);
  const [documentType, setDocumentType] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = (type) => {
    if (type === "aadhar") {
      setDocumentType(singleAssociateInfo.aadhar_card);
    } else if (type === "pan") {
      setDocumentType(singleAssociateInfo.pan_card);
    } else {
      setDocumentType(singleAssociateInfo.photo);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getLocalToke();
  }, []);
  const getLocalToke = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      setLoader(true);
      fetch(single_investor, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "BSI_AUTH_NEXTDYNAMIC",
        },
        body: JSON.stringify({ id: id, token: localStorage.getItem("token") }),
      })
        .then((response) => response.json())
        .then((response) => {
          setLoader(false);
          const data = response.data;
          if (data) {
            setLoader(false);
            setSingleAssociateInfo(data);
          } else {
            setLoader(false);
          }
        })
        .catch((error) => {
          setLoader(false);
        });
    }
  };

  return (
    <DashboardLayout>
      {singleAssociateInfo && (
        <Fragment>
          <Header data={singleAssociateInfo} />
          <SoftBox mt={5} mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={8} md={6} xl={6}>
                <ProfileInfoCard
                  title="profile information"
                  description={`Hi, I’m ${singleAssociateInfo.name}.`}
                  info={{
                    fullName: `${singleAssociateInfo.name}`,
                    mobile: `${singleAssociateInfo.phone}`,
                    email: `${singleAssociateInfo.email}`,
                    permanentAddress: `${singleAssociateInfo.permanent_address_street}`,
                    residentialAddress: `${singleAssociateInfo.residential_address_street}`,
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                />
              </Grid>
              <Grid item xs={4} md={6} xl={6}>
                {/* <PlatformSettings /> */}
                <ProfileInfoCard
                  title="Document Information"
                  info={{
                    photo: (
                      <SoftButton
                        variant="gradient"
                        size="small"
                        color="light"
                        onClick={() => handleOpen("photo")}
                      >
                        View
                      </SoftButton>
                    ),
                    addharCard: (
                      <SoftButton
                        variant="gradient"
                        size="small"
                        color="light"
                        onClick={() => handleOpen("aadhar")}
                      >
                        View
                      </SoftButton>
                    ),
                    panCard: (
                      <SoftButton
                        variant="gradient"
                        size="small"
                        color="light"
                        onClick={() => handleOpen("pan")}
                      >
                        View
                      </SoftButton>
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
    </DashboardLayout>
  );
}

export default AssociateView;
