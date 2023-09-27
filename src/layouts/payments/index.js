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
import React, { useState, useEffect } from "react";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { paymentList, payment_gateway, profile } from "Api/Api";

// Data
import dataTableData from "layouts/ecommerce/products/products-list/data/dataTableData";
import { API_AUTHORIZATION_CODE } from "Api/Api";
import { CircularProgress } from "@mui/material";

const Payments = () => {
  const [assetsData, setAssetsData] = useState({ columns: [], rows: [] });
  const [loader, SetLaoder] = useState(false);
  const [userData, setUserAddress] = useState({});
  const [verified, setVerified] = useState(1);

  const handleClick = (id) => {
    //navigate(`/dashboard/asset/${id}`);
  };

  const handleTargetClick = (id) => {
    //navigate(`/dashboard/add-investment`);
  };

  const preparePayRequest = (requestData, investor_id) => {
    SetLaoder(true);
    const token = localStorage.getItem("token");
    if (token) {
      fetch(profile, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({ token: token }),
      })
        .then((response) => response.json())
        .then((response) => {
          const data = response.data;
          if (Object.keys("data").length > 0) {
            const urlParamsArr = [];
            if (data.usersDetails != null) {
              const {
                street: billAddress,
                city: billCity,
                state: billState,
                postcode: billZip,
              } = data.usersDetails.contact_details.permanent_address;
              const {
                name: billName,
                email: billEmail,
                phone: billTel,
              } = JSON.parse(localStorage.getItem("userData"));

              billAddress !== null && billAddress.length > 0
                ? urlParamsArr.push(encodeURI(`billAddress=${billAddress.trim()}`))
                : "";
              billCity !== null && billCity.length > 0
                ? urlParamsArr.push(encodeURI(`billCity=${billCity.trim()}`))
                : "";
              billState !== null && billState.length > 0
                ? urlParamsArr.push(encodeURI(`billState=${billState.trim()}`))
                : "";
              billZip !== null && billZip.length > 0
                ? urlParamsArr.push(encodeURI(`billZip=${billZip.trim()}`))
                : "";
              urlParamsArr.push(encodeURI(`billCountry=India`));
              billName !== null && billName.length > 0
                ? urlParamsArr.push(encodeURI(`billName=${billName.trim()}`))
                : "";
              billEmail !== null && billEmail.length > 0
                ? urlParamsArr.push(encodeURI(`billEmail=${billEmail.trim()}`))
                : "";
              billTel !== null && billTel.length > 0
                ? urlParamsArr.push(encodeURI(`billTel=${billTel.trim()}`))
                : "";
            }
            const finalURLParams = urlParamsArr.join("&");

            fetch(payment_gateway, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: API_AUTHORIZATION_CODE,
              },
              body: JSON.stringify({ token: localStorage.getItem("token"), data: requestData }),
            })
              .then((response) => response.json())
              .then((response) => {
                const encRequest = response.message.encRequest.trim();
                const access_code = response.message.access_code.trim();

                document
                  .getElementById("payurl")
                  .setAttribute(
                    "href",
                    `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encRequest}&access_code=${access_code}&${finalURLParams}`
                  );
                // document
                //.getElementById("payurl")
                //  .setAttribute(
                //    "href",
                //    `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encRequest}&access_code=${access_code}&${finalURLParams}`
                //  );
                document.getElementById("payurl").click();
                window.location = '/sale-list'
              })
              .catch((error) => {
                SetLaoder(false);
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      return null;
    }
  };
  const findGetParameter = (parameterName) => {
    var result = null,
      tmp = [];
    location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }
  useEffect(() => {
    if (findGetParameter('from')) {
      window.location = '/sale-list'
    }
    SetLaoder(true);
    fetch(paymentList, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_AUTHORIZATION_CODE,
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          const queryParams = new URLSearchParams(window.location.search);
          const queryId = queryParams.get("id");
          localStorage.setItem("userData", JSON.stringify(response?.user));
          if (queryId && typeof queryId !== undefined) {
            const res = response.data.filter((row) => {
              if (row.id == queryId.trim()) {
                return row;
              }
            });
            response.data = res;
          }
          SetLaoder(false);
          //var count = 0;
          setAssetsData({
            columns: [
              {
                Header:"SN",
                Cell: (data) => {
                  return data.cell.row.index + 1
                }
             },
              {
                Header: "ASSOCIATES",
                accessor: "investor_name",
              },
              {
                Header: "BV",
                accessor: "amount",
              },
              {
                Header: "QTY",
                accessor: "qty",
              },
              {
                Header: "Date",
                accessor: "created_at",
              },
              // {
              //   Header: "PAYBLE AMOUNT",
              //   accessor: "checkout_amount",
              // },
              {
                Header: "PAYMENT",
                accessor: "investor_id",
                Cell: (data) => {
                  if (data.value !== undefined && data.value !== null) {
                    return data.data[data.cell.row.index].payment_status === "Paid" ? (
                      <span style={{ color: "#fff", fontSize: "14px", backgroundColor: "green", borderRadius: "8px", padding: "8px 12px" }}>Paid</span>
                      // <Badge color="success" badgeContent={"Paid"} style={{color:"#fff", padding:"10px"}} />
                    ) : verified === 1 ? (

                      <>

                        {data.data[data.cell.row.index].status === 1 ? <>
                          <span style={{ color: "#fff", fontSize: "14px", backgroundColor: "green", borderRadius: "8px", padding: "8px 12px" }}>Paid</span>
                        </> : <>
                        {data.data[data.cell.row.index].manual_payment  ? <> 
                          <span style={{ color: "#fff", fontSize: "14px", backgroundColor: "red", borderRadius: "8px", padding: "8px 12px" }}>Manual Payment</span>
                        </> : <>
                        <SoftButton
                            variant="gradient"
                            size="small"
                            color="info"
                            onClick={() =>
                              preparePayRequest(data.data[data.cell.row.index], data.value)
                            }
                          >
                            Pay By Gateway
                          </SoftButton>
                        </>}
                        </>}
                      </>

                    ) : (

                      <Badge color="light" badgeContent={"User Unverified"} />
                    );
                    //   <>{(data.value === 0 && data.value === 1) ?
                    //     <SoftButton
                    //     variant="gradient"
                    //     size="small"
                    //     color="info"
                    //     onClick={() => preparePayRequest(data.data[data.cell.row.index])}
                    //   >
                    //     Pay
                    //   </SoftButton>
                    //   : <Badge color="info" badgeContent={"Paid"} />}
                    //  </>
                  }
                },
              },
              {
                Header: "STATUS",
                accessor: "status",
                Cell: (data) => {
                  if (data.value !== undefined && data.value !== null) {
                    return data.value === 0 ? (
                      <span style={{ color: "#fff", fontSize: "14px", backgroundColor: "red", borderRadius: "8px", padding: "8px 12px" }}>Not Verfieid</span>
                    ) : (
                      <span style={{ color: "#fff", fontSize: "14px", backgroundColor: "green", borderRadius: "8px", padding: "8px 12px" }}>Verfieid</span>
                    );
                  }
                },
              },
            ],
            rows: response.data,
          });
        } else {
          SetLaoder(false);
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => {
        SetLaoder(false);
        console.error(error);
      });
  }, []);

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
                    Sale Report
                  </SoftTypography>
                </SoftBox>
                <Stack spacing={1} direction="row">
                  <Link to="/payment/create">
                    <SoftButton variant="gradient" color="info" size="small">
                      + add sale
                    </SoftButton>
                  </Link>

                  {/* <SoftButton variant="outlined" color="info" size="small">
                import
              </SoftButton>
              <SoftButton variant="outlined" color="info" size="small">
                export
              </SoftButton> */}
                </Stack>
              </SoftBox>
              <DataTable
                table={assetsData}
                entriesPerPage={{
                  defaultValue: 10,
                  entries: [5, 7, 10, 15, 20, 25],
                }}
                canSearch
              />
            </>
          }
        </Card>
        <a id="payurl" target="_blank" style={{ display: "none" }} rel="noreferrer"></a>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Payments;
