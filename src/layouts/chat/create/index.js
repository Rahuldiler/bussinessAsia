import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Soft UI Dashboard PRO React components
import SoftTypography from "components/SoftTypography";
import SoftEditor from "components/SoftEditor";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import QR from "assets/images/qr.jpg";

// NewAssociates page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import { addPayment, add_investor, assets, investorsListApi, get_down_data } from "Api/Api";

import CircularProgress from "@mui/material/CircularProgress";
import { API_AUTHORIZATION_CODE } from "Api/Api";
import { Button, Input, Typography } from "@mui/material";
import { chatAdd } from "Api/Api";
function Create() {
    const navigate = useNavigate()
    const [productData, setProductData] = useState({});
    const [userToken, setUserToken] = React.useState();
    const [errorMessage, setErrorMessage] = useState();
    const [loader, setLoader] = useState(false);
    const [pageLoader, setPageLoader] = useState(false);
    const [backMsg, setBackMsg] = useState('');
    const handleCheckbox = () => {
        if (!sameAddress) {
            setProductData({
                ...productData,
                permanent_address_street: productData.residential_address_street,
                permanent_address_city: productData.residential_address_city,
                permanent_address_state: productData.residential_address_state,
                permanent_address_country: productData.residential_address_country,
                permanent_address_postcode: productData.residential_address_postcode,
            });
        } else {
            setProductData({
                ...productData,
                permanent_address_street: "",
                permanent_address_city: "",
                permanent_address_state: "",
                permanent_address_country: "",
                permanent_address_postcode: "",
            });
        }
    }

    useLayoutEffect(() => {
        getLocalStore()
    }, [])

    const getLocalStore = async () => {
        const token = await localStorage.getItem('token');
        if (token) {
            setUserToken(token)
        } else {

        }
    }

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }
    const handleDocument = (e) => {
        const file = e.target.files[0]
        setProductData({
            ...productData, photo: file
        })
    }
    const handleSubmit = (data) => {

        setPageLoader(true);
        const formData = new FormData();
        formData.append('token', userToken)
        if (data?.subject) {
            formData.append('subject', data?.subject)
        }
        if (data?.message) {
            formData.append('message', data?.message)
        }
        if (data?.photo) {
            formData.append('photo', data?.photo)
        }
        fetch(chatAdd, {
            method: 'POST',
            headers: {
                Authorization: API_AUTHORIZATION_CODE,
                mode: "no-cors",
            },
            body: formData,
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    alert("Data has been saved successfully");
                    navigate("/support");
                }
                else if (data.status === 202) {
                    //  setLoader(false)
                    setErrorMessage(data?.errors)
                    setPageLoader(false);
                } else {
                    setErrorMessage(data?.error)
                    setPageLoader(false);
                }
            }).catch(error => {
                setPageLoader(false);
                //  setLoader(false)
            })
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox mt={1} mb={20}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} lg={12}>
                        <Card sx={{ overflow: "visible" }}>
                            <SoftBox p={2}>
                                <SoftBox>

                                    <form className="mt-10 w-full from-support">
                                        <h3 className="from-heading">Create Support Ticket</h3>
                                        <div className="-mx-3  mb-6">
                                            <div className="w-full px-3 mb-3">
                                                <FormField
                                                    type="text"
                                                    label="Subject"
                                                    name="subject"
                                                    placeholder="Subject"
                                                    value={productData?.subject}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorMessage && (
                                                        <Typography color="red" style={{ fontSize: "12px" }}>
                                                            {errorMessage?.subject}
                                                        </Typography>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="-mx-3  mb-6">
                                            <div className="w-full px-3 mb-3">
                                                <label class="MuiTypography-root MuiTypography-caption css-uy1c4l-MuiTypography-root">Message</label>
                                                <textarea value={productData?.message} style={{ display: 'block', border: '1px solid #ccc', width: '100%', padding: '15px', height: '125px', borderRadius: '10px' }} name="message" label="Message" onChange={handleChange}></textarea>
                                                <div>
                                                    {errorMessage && (
                                                        <Typography color="red" style={{ fontSize: "12px" }}>
                                                            {errorMessage?.message}
                                                        </Typography>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full px-3 mt-2 pb-3 text-gray-700">
                                            <label className="mt-2 mb-2 flex  items-center font-medium text-sm tracking-wide uppercase " htmlFor="proof_document">Upload Reference</label>
                                            <input type="file" id="uploadPAN" name="photo" onChange={handleDocument} />
                                            <div>
                                                {errorMessage && (
                                                    <Typography color="red" style={{ fontSize: "12px" }}>
                                                        {errorMessage?.photo}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>

                                        {pageLoader ? <>
                                            <SoftButton
                                                variant="gradient"
                                                color="success"
                                                style={{ marginTop: "35px" }}
                                            >
                                                <CircularProgress style={{ width: "15px", color: "#fff", height: "15px" }} />
                                            </SoftButton>
                                        </> : <>
                                            <SoftButton
                                                variant="gradient"
                                                color="warning"
                                                style={{ marginTop: "35px" }}
                                                onClick={() => handleSubmit(productData)}
                                            >
                                                Submit
                                            </SoftButton>

                                        </>}
                                    </form>
                                </SoftBox>
                            </SoftBox>
                        </Card>
                    </Grid>
                </Grid>
            </SoftBox>
            <Footer />
        </DashboardLayout>
    );
}
export default Create;
