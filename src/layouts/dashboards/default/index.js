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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
//import Globe from "examples/Globe";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";

// Data
import salesTableData from "layouts/dashboards/default/data/salesTableData";
import reportsBarChartData from "layouts/dashboards/default/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboards/default/data/gradientLineChartData";
import KycPending from "layouts/pages/users/KycPending";
import { useEffect, useState } from "react";
import { investorDashboard } from "Api/Api";
import { API_AUTHORIZATION_CODE } from "Api/Api";
import { CircularProgress } from "@mui/material";
function Default() {
  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [dashboardData, setDashboardData] = useState();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetch(investorDashboard, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_AUTHORIZATION_CODE,
      },
      body: JSON.stringify({ token: localStorage.getItem("token") })
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setDashboardData(response.data);
          setLoader(false);
        }
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
  }, [])

  const dateFormat = (date) => {
    var date = new Date(date);
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return date.getDate() + '-' + month[date.getMonth()];
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container>
          {loader ? <>
            <Grid item xs={12} lg={12}>
              <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3} style={{ backgroundColor: "#fff" }}>
                <CircularProgress style={{ width: "35px", height: "35px", margin: "80px auto", backgroundColor: "#fff" }} />
              </SoftBox>
            </Grid>
          </>
            : <>
              <Grid item xs={12} lg={12}>

                {JSON.parse(localStorage.getItem("userData")).esignin === 0 && (
                  <Grid item xs={12} lg={12}>
                    <SoftBox mb={1} p={1}>
                      <KycPending />
                    </SoftBox>
                  </Grid>
                )}

                <SoftBox mb={3} p={1}>
                  <SoftTypography
                    variant={window.innerWidth < values.sm ? "h4" : "h3"}
                    textTransform="capitalize"
                    fontWeight="bold"
                  >
                    Payout statistics
                  </SoftTypography>
                </SoftBox>
                <Grid container spacing={3}>




                  {/* Payout Area */}
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Calculated payout -August 2023", fontWeight: "bold" }}
                        count={dashboardData?.getAugustFinalCommission}
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "INR" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "TDS on Payout (5%) & Service Expense (5%) - August 2023" }}
                        count={dashboardData?.payout_tds_by_user_date}
                        /* percentage={{ color: "success", text: "+55%" }} */
                        icon={{ color: "#C89132", component: "INR" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Payout Done  - August 2023", fontWeight: "bold" }}
                        count={dashboardData?.payout_by_user_date}
                        icon={{ color: "#C89132", component: "INR" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Calculated payout-July 2023", fontWeight: "bold" }}
                        count={dashboardData?.getFinalCommission}
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "INR" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "TDS on Payout (5%) & Service Expense (5%) -July 2023" }}
                        count={dashboardData?.payout_tds_by_user}
                        /* percentage={{ color: "success", text: "+55%" }} */
                        icon={{ color: "#C89132", component: "INR" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Payout Done -July 2023", fontWeight: "bold" }}
                        count={dashboardData?.payout_by_user}
                        icon={{ color: "#C89132", component: "INR" }}
                      />
                    </SoftBox>
                  </Grid>

                  {/* <Grid item xs={12} lg={4}>
                {" "}
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Month Income", fontWeight: "bold" }}
                    count="₹ 53,000"
                    //  percentage={{ color: "success", text: "+55%" }}
                    icon={{ color: "#C89132", component: "INR" }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} lg={4}>
                {" "}
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Month Individual Income", fontWeight: "bold" }}
                    count="₹ 53,000"
                    //  percentage={{ color: "success", text: "+55%" }}
                    icon={{ color: "#C89132", component: "INR" }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} lg={4}>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Month Team Income", fontWeight: "bold" }}
                    count="₹ 53,000"
                    // percentage={{ color: "success", text: "+55%" }}
                    icon={{ color: "#C89132", component: "INR" }}
                  />
                </SoftBox>
              </Grid> */}
                  <Grid item xs={12} lg={12}>
                    <SoftBox mb={3} p={1}>
                      <SoftTypography
                        variant={window.innerWidth < values.sm ? "h4" : "h3"}
                        textTransform="capitalize"
                        fontWeight="bold"
                      >
                        Spill Sponsor Payout statistics
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  {/*  */}

                  <Grid item xs={12} lg={4}>
                    {" "}
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Calculated spill sponsor payout  - August 2023", fontWeight: "bold" }}
                        count={dashboardData?.getSpillSponsorCommissionByDate}
                        // percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    {" "}
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "TDS on Payout (5%) & Service Expense (5%)  - August 2023 ", fontWeight: "bold" }}
                        count={dashboardData?.getSpillSponsorCommissionTdsByDate}
                        // percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Payout Done  - August 2023", fontWeight: "bold" }}
                        count={dashboardData?.spill_payout_by_user_date}
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>

                  <Grid item xs={12} lg={4}>
                    {" "}
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Calculated spill sponsor payout  - July 2023", fontWeight: "bold" }}
                        count={dashboardData?.getSpillSponsorCommission}
                        // percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    {" "}
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "TDS on Payout (5%) & Service Expense (5%)  - July 2023 ", fontWeight: "bold" }}
                        count={dashboardData?.spill_payout_tds_by_user}
                        // percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Payout Done   - July 2023 ", fontWeight: "bold" }}
                        count={dashboardData?.spill_payout_by_user}
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>




                  {/* Cashback Payout */}

                  <Grid item xs={12} lg={12}>
                    <SoftBox mb={3} p={1}>
                      <SoftTypography
                        variant={window.innerWidth < values.sm ? "h4" : "h3"}
                        textTransform="capitalize"
                        fontWeight="bold"
                      >
                        Cashback Payout statistics
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  {/*  */}
                  {dashboardData?.cashback_bonus?.length > 0 ? <>

                    {dashboardData?.cashback_bonus?.map(values => (<>
                      <Grid item xs={12} lg={4}>
                    {" "}
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Calculated Cashback payout", fontWeight: "bold" }}
                        count={values.cashback}
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    {" "}
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "TDS  - ", fontWeight: "bold" }}
                        count="NA"
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Payout Done - ", fontWeight: "bold" }}
                        count={values.payout ? values.payout : 0 }
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                    </>))}
                  </> : <>

                  <Grid item xs={12} lg={4}>
                    {" "}
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Calculated Cashback payout", fontWeight: "bold" }}
                        count={0}
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    {" "}
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "TDS  - ", fontWeight: "bold" }}
                        count="NA"
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <SoftBox mb={3}>
                      <MiniStatisticsCard
                        title={{ text: "Payout Done - ", fontWeight: "bold" }}
                        count={0}
                        //  percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "#C89132", component: "people" }}
                      />
                    </SoftBox>
                  </Grid>
                  </>

                  }
                 

                  <Grid item xs={12} lg={12}>
                    <SoftBox mb={3} p={1}>
                      <SoftTypography
                        variant={window.innerWidth < values.sm ? "h4" : "h3"}
                        textTransform="capitalize"
                        fontWeight="bold"
                      >
                        Performance Bonus 2023
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  {/*  */}



                  {dashboardData?.performances_bonus?.length > 0 ? <>

                    {dashboardData?.performances_bonus?.map(values => (<>
                      <Grid item xs={12} lg={3}>
                        {" "}
                        <SoftBox mb={3}>
                          <MiniStatisticsCard
                            title={{ text: "Performance Bonus Calculated", fontWeight: "bold" }}
                            count={values.commission}
                            //  percentage={{ color: "success", text: "+55%" }}
                            icon={{ color: "#C89132", component: "people" }}
                          />
                        </SoftBox>
                      </Grid>
                      <Grid item xs={12} lg={3}>
                        {" "}
                        <SoftBox mb={3}>
                          <MiniStatisticsCard
                            title={{ text: "TDS  - ", fontWeight: "bold" }}
                            count={values.tds}
                            //  percentage={{ color: "success", text: "+55%" }}
                            icon={{ color: "#C89132", component: "people" }}
                          />
                        </SoftBox>
                      </Grid>
                      <Grid item xs={12} lg={3}>
                        {" "}
                        <SoftBox mb={3}>
                          <MiniStatisticsCard
                            title={{ text: "Performance Bonus Payout ", fontWeight: "bold" }}
                            count={values.payout}
                            //  percentage={{ color: "success", text: "+55%" }}
                            icon={{ color: "#C89132", component: "people" }}
                          />
                        </SoftBox>
                      </Grid>
                      <Grid item xs={12} lg={3}>
                        {" "}
                        <SoftBox mb={3}>
                          {values.payout_csv ? <>
                            <MiniStatisticsCard
                              title={{ text: "Paid ", fontWeight: "bold" }}
                              count={values.payout_csv}
                              //  percentage={{ color: "success", text: "+55%" }}
                              icon={{ color: "#C89132", component: "people" }}
                            />
                          </> : <>
                            <MiniStatisticsCard
                              title={{ text: "Paid ", fontWeight: "bold" }}
                              count={0}
                              //  percentage={{ color: "success", text: "+55%" }}
                              icon={{ color: "#C89132", component: "people" }}
                            />
                          </>}

                        </SoftBox>
                      </Grid>
                    </>))}
                  </> : <>

                    <Grid item xs={12} lg={3}>
                      {" "}
                      <SoftBox mb={3}>
                        <MiniStatisticsCard
                          title={{ text: "Performance Bonus Calculated", fontWeight: "bold" }}
                          count={0}
                          //  percentage={{ color: "success", text: "+55%" }}
                          icon={{ color: "#C89132", component: "people" }}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      {" "}
                      <SoftBox mb={3}>
                        <MiniStatisticsCard
                          title={{ text: "TDS  - ", fontWeight: "bold" }}
                          count={0}
                          //  percentage={{ color: "success", text: "+55%" }}
                          icon={{ color: "#C89132", component: "people" }}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      {" "}
                      <SoftBox mb={3}>
                        <MiniStatisticsCard
                          title={{ text: "Performance Bonus Payout ", fontWeight: "bold" }}
                          count={0}
                          //  percentage={{ color: "success", text: "+55%" }}
                          icon={{ color: "#C89132", component: "people" }}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      {" "}
                      <SoftBox mb={3}>
                        <MiniStatisticsCard
                          title={{ text: "Paid ", fontWeight: "bold" }}
                          count={0}
                          //  percentage={{ color: "success", text: "+55%" }}
                          icon={{ color: "#C89132", component: "people" }}
                        />

                      </SoftBox>
                    </Grid>
                  </>

                  }

                  {/* Performance Bonus */}






                </Grid>


              </Grid>

              <Grid item xs={12} lg={12}>
                <GradientLineChart
                  title="Income Overview"
                  description={
                    <SoftBox display="flex" alignItems="center">
                      <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                        <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                      </SoftBox>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        4% more{" "}
                        <SoftTypography variant="button" color="text" fontWeight="regular">
                          in 2023
                        </SoftTypography>
                      </SoftTypography>
                    </SoftBox>
                  }
                  chart={gradientLineChartData}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                &nbsp;
              </Grid>
              <Grid item xs={12} lg={12}>
                <GradientLineChart
                  title="Associates Overview"
                  description={
                    <SoftBox display="flex" alignItems="center">
                      <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                        <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                      </SoftBox>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        4% more{" "}
                        <SoftTypography variant="button" color="text" fontWeight="regular">
                          in 2023
                        </SoftTypography>
                      </SoftTypography>
                    </SoftBox>
                  }
                  chart={gradientLineChartData}
                />
              </Grid>
            </>
          }
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
