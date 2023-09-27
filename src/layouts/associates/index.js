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
import { CircularProgress } from "@mui/material";

const Associates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [investorsList, setInvestorsList] = useState({ columns: [], rows: [] });
  const [loader, setLoader] = useState(true);
  const [backMsg, setBackMsg] = useState("");
  const [checkPayment, setCheckPayment] = useState(false);
  const [loaddownTree, setloaddownTree] = useState(false);
  const [nodeAmount, setNodeAmount] = useState(0);

  useEffect(() => {
    getValuesFromLoca();
    check_first_payment_true();
  }, []);

  const getValuesFromLoca = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      //setLoader(true);
      fetch(investorsListApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({ token: token }),
      })
        .then((response) => response.json())
        .then((response) => {
          //  setLoader(false);
          if (Array.isArray(response.data)) {
            setNodeAmount(response.nodeAmount);
            // setLoader(false);
            //setInvestorsList(response.data);
            setInvestorsList({
              columns: [
                {
                  Header: "SN",
                  Cell: (data) => {
                    return data.cell.row.index + 1
                  }
                },
                {
                  Header: "NAME",
                  accessor: "name",
                },
                {
                  Header: "EMAIL",
                  accessor: "email",
                },
                // {
                //   Header: "PHONE",
                //   accessor: "phone",
                // },
                {
                  Header: "DESIGNATION",
                  accessor: "user_level",
                },
                /*                 {
                  Header: "SPONSOR",
                  accessor: "sponsor_name",
                },
                {
                  Header: "SPONSOR EMAIL",
                  accessor: "sponsor_email",
                }, */
                {
                  Header: "BUSINESS VALUE",
                  accessor: "payment",
                  Cell: (data) => {
                    return <span>{data.value}</span>;
                  },
                },
                {
                  Header: "TEAM BUSINESS VALUE",
                  accessor: "nodeAmount",
                  Cell: (data) => {
                    return <span>{data.value}</span>;
                  },
                },
                {
                  Header: "VIEW TEAM",
                  accessor: "id",
                  Cell: (data) => {
                    return (
                      <SoftButton
                        component={Link}
                        varient="gradient"
                        color="info"
                        size="small"
                        to={`/associates/view/${data.value}`}
                      >
                        VIEW TEAM
                      </SoftButton>
                    );
                  },
                },
              ],
              rows: response.data,
            });

            setloaddownTree(true);
           setLoader(false);
          } else {
            if (response.status === 203) {
              setBackMsg(response.error);
            }
            setLoader(false);
          }
        })
        .catch((error) => {
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  };

  const check_first_payment_true = async () => {
    const token = await localStorage.getItem('token');
    if (token) {
      fetch(check_first_payment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({ token: token }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status === 200) {
            setCheckPayment(true)
          }
         
        })
        .catch((error) => {
        
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
              {checkPayment ? <>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Associate list,  Your Team BV: <span style={{color:"green"}}>{nodeAmount} </span>
                    </SoftTypography>
                  </SoftBox>
                  <Stack spacing={1} direction="row">
                    <Link to="/associates/create">
                      <SoftButton variant="gradient" color="info" size="small">
                        + add associate
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
                  table={investorsList}
                  entriesPerPage={{
                    defaultValue: 7,
                    entries: [5, 7, 10, 15, 20, 25],
                  }}
                  canSearch
                />
              </> : <>
                <p style={{ textAlign: "center", padding: "30px" }}>This feature will be available after completed first purchase has been made.</p>
              </>}
            </>
          }
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Associates;
