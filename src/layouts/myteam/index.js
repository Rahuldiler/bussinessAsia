import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { downtree } from "Api/Api";
// import treeData from "@/data/treeChartData";

// @mui material components
import Card from "@mui/material/Card";
//import Stack from "@mui/material/Stack";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
//import DataTable from "examples/Tables/DataTable";
import userimg from "./user.png";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Data
import "./tree.css";
import { API_AUTHORIZATION_CODE } from "Api/Api";

function MyTeam() {
  const [loader, setLoader] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [publicPath, setPublicPath] = useState("");
  const [zoomVal, setZoomVal] = useState(0.1);
  useEffect(() => {
    getDataFromLocal();
  }, []);

  const getDataFromLocal = async () => {
    setLoader(true);
    let token = await localStorage.getItem("token");
    if (token) {
      fetch(downtree, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({ token: token }),
      })
        .then((response) => response.json())
        .then((response) => {
          setLoader(false);
          const data = response.data;
          if (data) {
            console.log(data);
            setLoader(false);
            setTreeData(data);
            setPublicPath(response.public_path);
            // setProfile(data);
          } else {
            setLoader(false);
            console.error("API response is not an array:", data);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.error(error);
        });
    }
  };

  const treeRendering = (treeData, loader, publicPath) => {
    return (
      <>
        <ul>
          {loader ? (
            <span>&nbsp;</span>
          ) : (
            treeData.map((item, idx) => (
              <li key={`tree_${idx}`}>
                <div className={`user_${item.id} usercard`}>
                  {item.photo ? (
                    <>
                      <img
                        style={{
                          borderRadius: 99,
                          width: "10px",
                          height: "10px",
                          display: "inline-block",
                          /* boxShadow: "0px 0px 3px #000", */
                        }}
                        className="h-16 rounded-full object-cover"
                        src={/* item.photo */ userimg}
                        alt="image"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        style={{
                          borderRadius: 99,
                          width: "10px",
                          height: "10px",
                          display: "inline-block",
                          /* boxShadow: "0px 0px 3px #000", */
                        }}
                        className="h-16 rounded-full object-cover"
                        src={publicPath + "/" + "dummy.jpg"}
                        alt="image"
                      />
                    </>
                  )}

                  <p className="text-base font-bold" style={{ fontSize: "8px" }}>
                    {`${item.name} (${item.level})`}
                    <br />
                    BV {item.payments}
                  </p>
                </div>
                {item.children && item.children.length
                  ? treeRendering(item.children, loader, publicPath)
                  : ""}
              </li>
            ))
          )}
        </ul>
      </>
    );
  };

  const handleZoom = (param) => {
    let zv = 0;
    if (param == "M") {
      if (zoomVal > 0) {
        zv = zoomVal - 0.1;
      }
    }
    if (param == "P") {
      if (zoomVal < 4) {
        zv = zoomVal + 0.1;
      }
    }
    setZoomVal(zv);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={1} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Card sx={{ overflow: "scroll" }}>
              <SoftBox p={2}>
                <SoftTypography variant="h5">Team Chart</SoftTypography>
                <div
                  className="overflow-x-auto whitespace-nowrap"
                  style={{ backgroundColor: "#fff", padding: "10px", textAlign: "center" }}
                >
                  <h2>
                    My Team{" "}
                    <span style={{ float: "right" }}>
                      <SoftButton
                        variant="outlined"
                        color="info"
                        iconOnly={false}
                        size="small"
                        onClick={() => handleZoom("P")}
                      >
                        +
                      </SoftButton>{" "}
                      <SoftButton
                        variant="outlined"
                        color="info"
                        iconOnly={false}
                        size="small"
                        onClick={() => handleZoom("M")}
                      >
                        -
                      </SoftButton>
                    </span>
                  </h2>
                  {loader && (
                    <div role="status">
                      <Box sx={{ display: "flex", overflow: "hidden" }}>
                        <CircularProgress color="secondary" />
                      </Box>
                    </div>
                  )}
                  <div
                    className="tree"
                    style={{ width: "max-content", overflow: "overlay", zoom: zoomVal }}
                  >
                    {treeRendering(treeData, loader, publicPath)}
                  </div>
                </div>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}
export default MyTeam;
