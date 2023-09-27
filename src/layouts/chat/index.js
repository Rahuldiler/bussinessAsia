import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import dataTableData from "layouts/ecommerce/products/products-list/data/dataTableData";
import { check_first_payment, investorsListApi } from "Api/Api";
import SoftBadge from "components/SoftBadge";
import { API_AUTHORIZATION_CODE } from "Api/Api";
import { underSponsor } from "Api/Api";
import { Button, CircularProgress, Typography } from "@mui/material";
import { chatList } from "Api/Api";
const SupportPage = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [chatData, setChatData] = useState({ columns: [], rows: [] })
  const [loader, setLoader] = useState(false);
  const [backMsg, setBackMsg] = useState('');

  useEffect(() => {
    getValuesFromLoca();
  }, []);
  const getValuesFromLoca = async () => {
    const token = await localStorage.getItem('token');
    if (token) {
      setLoader(true)
      fetch(chatList, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({ token: token }),
      })
        .then((response) => response.json())
        .then((response) => {
          setLoader(false)
          if (Array.isArray(response.data)) {
            setLoader(false)
            setChatData({
              columns: [
                {
                  Header: "SN",
                  Cell: (data) => {
                    return data.cell.row.index + 1
                  }
                },
                {
                  Header: "SUBJECT",
                  accessor: "subject",
                },
                {
                  Header: "STATUS",
                  accessor: "status",
                  Cell: (data) => {
                    if (data.value) {
                      return (
                        <Typography className="text-xs font-semibold text-blue-gray-600">Closed</Typography>
                      )
                    } else {
                      return (
                        <Typography className="text-xs font-semibold text-blue-gray-600">Pending</Typography>
                      )
                    }

                  }
                },
                {
                  Header: "CREATE AT",
                  accessor: "created_at",
                },

                {
                  Header: "VIEW",
                  accessor: "id",
                  Cell: (data) => {
                    return (
                      <SoftButton
                        component={Link}
                        varient="gradient"
                        color="info"
                        size="small"
                        to={`view/${data.value}`}
                      >
                        View
                      </SoftButton>
                    );
                  },
                },
              ],
              rows: response.data,
            });
          } else {
            if (response.status === 203) {
              setBackMsg(response.error);
            }
            setLoader(false)
          }
        })
        .catch((error) => {
          setLoader(false)
        }
        );
    } else {
      // console.log("Token not found")
    }
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <Card>
          {loader ? <>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <CircularProgress style={{ width: "35px", height: "35px", margin: "80px auto" }} />
            </SoftBox>
          </>
            : <>
              <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                <SoftBox lineHeight={1}>
                  <SoftTypography variant="h5" fontWeight="medium">
                    Support Ticket List
                  </SoftTypography>
                </SoftBox>
                <Stack spacing={1} direction="row">
                  <Link to="/create-support-ticket">
                    <SoftButton variant="gradient" color="info" size="small">
                      + Create Support Ticket
                    </SoftButton>
                  </Link>
                  {/*   <SoftButton variant="outlined" color="info" size="small">
                import
              </SoftButton>
              <SoftButton variant="outlined" color="info" size="small">
                export
              </SoftButton>*/}
                </Stack>
              </SoftBox>
              <DataTable
                table={chatData}
                entriesPerPage={{
                  defaultValue: 7,
                  entries: [5, 7, 10, 15, 20, 25],
                }}
                canSearch
                noDataComponent= "No data available."
              />
            </>
          }
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default SupportPage;
