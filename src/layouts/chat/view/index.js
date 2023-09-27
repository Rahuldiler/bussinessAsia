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
import { Routes, Route, useParams, useLocation, useNavigate } from "react-router-dom";
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
import { single_chat } from "Api/Api";
import { API_AUTHORIZATION_CODE } from "Api/Api";

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

function ChatView() {
  const location = useLocation();
  const [assetData, setAssetData] = useState({});
  const [loader, setLoader] = useState(false)
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  useEffect(() => {
    setLoader(true)
    fetch(single_chat, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_AUTHORIZATION_CODE,
      },
      body: JSON.stringify({ id: id, token: localStorage.getItem('token') }),
    })
      .then((response) => response.json())
      .then((response) => {
        const data = response.data;
        if (data) {
          setLoader(false)
          console.log(data);
          setAssetData(data);
        } else {
          setLoader(false)
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => {
        setLoader(false)
        console.error(error)
      });
  }, []);

  return (
    <DashboardLayout>
      <Fragment>
          <Header />
          <SoftBox mt={5} mb={3}>
            
          <div style={{  backgroundColor: '#fff', padding: '22px',  margin: '30px', boxShadow:' 0px 0px 5px #ccc',  borderRadius: '10px'  }}>
              <div className="flex flex-col lg:flex-row gap-6">

                <div className="w-full lg:max-w-[500px] border shadow-md p-5">
                  <h4 style={{ fontSize: "20px", fontWeight: "bold" }}>Ticket Details</h4>
                  <p style={{marginTop:"15px", marginBottom:"25px", fontSize:"20px", fontWeight:"bold"}}>Subject: <Typography className="text-xs font-semibold text-blue-gray-600">{assetData.subject}</Typography></p>
                  <p style={{marginTop:"15px", marginBottom:"25px", fontSize:"20px", fontWeight:"bold"}}>Message:  <Typography className="text-xs font-semibold text-blue-gray-600">{assetData.message}</Typography></p>
                  <p style={{marginTop:"15px", marginBottom:"25px", fontSize:"20px", fontWeight:"bold"}}>Status:   {assetData.status ? <>
                    <Typography className="text-xs font-semibold text-blue-gray-600">Closed</Typography>
                  </>: <>
                  <Typography className="text-xs font-semibold text-blue-gray-600">Pending</Typography>
                  </>}</p>
                  <p style={{marginTop:"15px", marginBottom:"25px", fontSize:"20px", fontWeight:"bold"}}>Create At:  <Typography className="text-xs font-semibold text-blue-gray-600">{assetData.created_at}</Typography></p>

                  <p style={{marginTop:"15px", marginBottom:"25px", fontSize:"20px", fontWeight:"bold"}}>Proof:  
                  {assetData.photo ? <>
                      <img src={assetData.photo} alt="" style={{width:"320px"}} />
                  </> : <></>}
                  
                  </p>
                  
                </div>
              </div>
            </div>
          </SoftBox>
     
        </Fragment>
      <Footer />
    </DashboardLayout>
  );
}

export default ChatView;
