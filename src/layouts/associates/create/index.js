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
import { check_first_payment } from "Api/Api";
import { otp_request_email } from "Api/Api";
import { otp_request_email_verify } from "Api/Api";

function Create() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  const [userToken, setUserToken] = React.useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [downTree, setDownTree] = useState("");
  const [loaddownTree, setloaddownTree] = useState(false);
  const [profile, setProfile] = useState("");
  const [backMsg, setBackMsg] = useState("");
  const [sponsorValues, setSponsorValues] = useState([]);
  const [btnDis, setBTNDis] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [checkPayment, setCheckPayment] = useState(false);

  // Mahesh Kumar Code 
  const [inputDisabled, setInputDisabled] = useState(true);
  const [verifyOtpBox, setVerifyOtpBox] = useState(false);
  const [verifyEmailError, setVerifyEmailError] = useState('');
  const [verifyButtonDis, setVerifyButtonDis] = useState(false);
  const [verifyEmailLoader, setVerifyEmailLoader] = useState(false);

  // OTP STATES

  const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
  const [otpInputDisabled, setOtpInputDisabled] = useState(false);
  const [otpError, setOtpError] = useState('');


  const resentOTP = () => {
    setInputDisabled(true);
    setVerifyOtpBox(false);
    setVerifyEmailError('');
    setVerifyButtonDis(false);
    setVerifyEmailLoader(false);
    setOtpButtonDisabled(false);
    setOtpInputDisabled(false);
    setOtpError('');
  }


  const verifyOtpRequest = (data) => {
    setVerifyEmailLoader(true);
    const formData = new FormData();
    if (data?.email) {
      formData.append("email", data?.email);
    }
    fetch(otp_request_email, {
      method: "POST",
      headers: {
        Authorization: API_AUTHORIZATION_CODE,
        mode: "no-cors",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        if (data.status === 200) {

          //setInputDisabled(false);
          setErrorMessage();
          setVerifyOtpBox(true);
          setVerifyEmailLoader(false);
        } else if (data.status === 202) {
          //setInputDisabled(true);
          setVerifyOtpBox(false);
          setVerifyEmailLoader(false);
          setErrorMessage(data?.errors);
          setPageLoader(false);
        }
      })
      .catch((error) => {
        setVerifyButtonDis(false);
        setVerifyOtpBox(false);
        setVerifyEmailLoader(false);
        setErrorMessage();
        setPageLoader(false);
        setBTNDis(false);
        //  setPageLoader(false);
        //  setLoader(false)
      });
  }

  const verifyOtpRequestPost = (data) => {
    setOtpButtonDisabled(true);
    const formData = new FormData();
    if (data?.email) {
      formData.append("email", data?.email);
    }
    if (data?.email) {
      formData.append("otp", data?.otp);
    }
    fetch(otp_request_email_verify, {
      method: "POST",
      headers: {
        Authorization: API_AUTHORIZATION_CODE,
        mode: "no-cors",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
       // console.log(data)
        if (data.status === 200) {
          if (data.verify) {
            setOtpInputDisabled(true);
            setInputDisabled(false);
            setOtpButtonDisabled(false);
          } else {
            setOtpInputDisabled(false);
            setInputDisabled(true);
            setOtpButtonDisabled(false);
            setOtpError('Please enter a valid OTP.')
          }

        }
      })
      .catch((error) => {
        otpButtonDisabled(false);
        setOtpInputDisabled(false);
        setInputDisabled(false);
      });
  }

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
  };

  useLayoutEffect(() => {
    getLocalStore();
    get_self_down_data();
    check_first_payment_true();
  }, []);

  const getLocalStore = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    } else {
    }
  };
  const check_first_payment_true = async () => {
    const token = await localStorage.getItem('token');
    if (token) {
      setLoader(true)
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
          setLoader(false)
        }
        );
    } else {
      // console.log("Token not found")
    }
  }
  const handleSponsorData = (items) => {
    if (items !== null) {
      const dataArr = [];
      items.map((i) => {
        dataArr.push({
          value: i.id,
          label: `${i.name} (Sponsor Name: ${i.sponsor_name} - Email: ${i.email})`,
        });
      });
      setSponsorValues(dataArr);
    }
  };

  const get_self_down_data = () => {
    setLoader(true);
    fetch(get_down_data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_AUTHORIZATION_CODE,
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        if (response.status === 200) {
          handleSponsorData(response.data);
          setDownTree(response.data);
          setProfile(response.self);
          setloaddownTree(true);
          setLoader(false);
        } else {
          if (response.status === 203) {
            setBackMsg(response.error);
          }
          setLoader(false);
        }
      })
      .catch((error) => { });
  };
  /*   const handleDocument = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      pan_card: file,
    });
  };

  const handleDocument1 = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      aadhar_card: file,
    });
  };

  const handleDocument2 = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      photo: file,
    });
  }; */

  // const handleChange = (e, dropdown = null) => {
  //   let name = null;
  //   let value = null;

  //   if (dropdown !== null) {
  //     name = dropdown.name;
  //     value = e.value;
  //   } else {
  //     name = e.target.name;
  //     value = e.target.value;
  //   }

  //   if (name === "email") {
  //     var pattern = new RegExp(
  //       /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  //     );

  //     if (!pattern.test(value)) {
  //       setEmailAddressError("Please enter valid email address");
  //     } else {
  //       setEmailAddressError("");
  //       setProductData({ ...productData, [name]: value });
  //     }
  //   } else if (name === "phone") {
  //     if (value.length !== 10) {
  //       setPhoneError("Please enter a valid phone number with a minimum and maximum of 10 digits.");
  //       setProductData({ ...productData, [name]: value });
  //     } else {
  //       setPhoneError("");
  //       setProductData({ ...productData, [name]: value });
  //     }
  //   } else {
  //     setProductData({ ...productData, [name]: value });
  //   }
  // };
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  }
  const handleSubmit = (data) => {
    //  setPageLoader(true);
    setBTNDis(true);
    const formData = new FormData();
    formData.append("token", userToken);
    if (data?.name) {
      formData.append("name", data?.name);
    }
    if (data?.sponsor_id) {
      formData.append("sponsor_id", data?.sponsor_id);
    }
    if (data?.spill_sponsor_id) {
      formData.append("spill_sponsor_id", data?.spill_sponsor_id);
    }
    if (data?.email) {
      formData.append("email", data?.email);
    }
    // if (data?.pan) {
    //   formData.append("pan", data?.pan);
    // }
    // if (data?.aadhar) {
    //   formData.append("aadhar", data?.aadhar);
    // }
    if (data?.phone) {
      formData.append("phone", data?.phone);
    }
    // if (data?.father_husband) {
    //   formData.append("father_husband", data?.father_husband);
    // }
    // if (data?.bank_name) {
    //   formData.append("bank_name", data?.bank_name);
    // }
    // if (data?.account_holder_name) {
    //   formData.append("account_holder_name", data?.account_holder_name);
    // }
    // if (data?.account_number) {
    //   formData.append("account_number", data?.account_number);
    // }
    // if (data?.account_number_confirmation) {
    //   formData.append("account_number_confirmation", data?.account_number_confirmation);
    // }
    // if (data?.ifsc_code) {
    //   formData.append("ifsc_code", data?.ifsc_code);
    // }
    if (data?.permanent_address_street) {
      formData.append("permanent_address_street", data?.permanent_address_street);
    }
    if (data?.permanent_address_city) {
      formData.append("permanent_address_city", data?.permanent_address_city);
    }
    if (data?.permanent_address_state) {
      formData.append("permanent_address_state", data?.permanent_address_state);
    }
    if (data?.permanent_address_country) {
      formData.append("permanent_address_country", data?.permanent_address_country);
    }
    if (data?.permanent_address_postcode) {
      formData.append("permanent_address_postcode", data?.permanent_address_postcode);
    }
    // if (data?.residential_address_street) {
    //   formData.append("residential_address_street", data?.residential_address_street);
    // }
    // if (data?.residential_address_city) {
    //   formData.append("residential_address_city", data?.residential_address_city);
    // }
    // if (data?.residential_address_state) {
    //   formData.append("residential_address_state", data?.residential_address_state);
    // }
    // if (data?.residential_address_country) {
    //   formData.append("residential_address_country", data?.residential_address_country);
    // }
    // if (data?.residential_address_postcode) {
    //   formData.append("residential_address_postcode", data?.residential_address_postcode);
    // }
    // if (data?.pan_card) {
    //   formData.append("pan_card", data?.pan_card);
    // }
    // if (data?.aadhar_card) {
    //   formData.append("aadhar_card", data?.aadhar_card);
    // }
    // if (data?.photo) {
    //   formData.append("photo", data?.photo);
    // }
   // console.log(formData);
    fetch(add_investor, {
      method: "POST",
      headers: {
        Authorization: API_AUTHORIZATION_CODE,
        mode: "no-cors",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setBTNDis(false);
        //console.log("response: ", data);
        if (data.status === 200) {
          alert("Data has been saved successfully");
          navigate("/associates");
        } else if (data.status === 202) {
          //navigate("/associates");
          //  setLoader(false)
          //console.log(data?.errors)
          setErrorMessage(data?.errors);
          setPageLoader(false);
        }
      })
      .catch((error) => {
        setBTNDis(false);
        //  setPageLoader(false);
        //  setLoader(false)
      });
    // }
  };
  const renderingTree = (treeData, loadData) => {
    return (
      <>
        {loadData ? treeData?.map((item) => (
          <>
            <option value={item.id}>{item.name} (Sponsor Name: {item.sponsor_name} - Email: {item.email})</option>
            {item.children && item.children.length ? renderingTree(item.children, true) : ""}
          </>
        )) : <>
        <option style={{color:"green"}}>Loading...</option>
        </>}
      </>
    )
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
                  {/* persnal information form end  */}
                  <SoftBox>
                    <SoftTypography variant="h5">Add Associate</SoftTypography>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} lg={6}>
                          <SoftBox mb={3}>
                            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            
                              <SoftTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                textTransform="capitalize"
                              >
                                Sponsor
                              </SoftTypography>
                            </SoftBox>
                            <select style={{ paddingLeft: '10px', border: '1px solid', borderRadius: '8px', fontSize: '16px', borderColor: '#ccc', boxSizing: 'border-box', height: '39px', display: "block", width: "100%", backgroundColor: "#fff" }} name="sponsor_id" onChange={handleChange}>
                              <option value={0}>Select Sponsor</option>
                              <option value={profile.id}>{profile.name}</option>
                              {renderingTree(downTree, loaddownTree)}
                            </select>
                            {/* <SoftSelect
                              name="sponsor_id"
                              onChange={handleChange}
                              defaultValue={{ value: "0", label: "Select Sponsor" }}
                              options={sponsorValues}
                            /> */}
                            <span style={{ color: "red", fontSize: "smaller" }}>
                              {errorMessage &&
                                "sponsor_id" in errorMessage &&
                                errorMessage.sponsor_id[0]}
                            </span>
                          </SoftBox>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                          <SoftBox mb={3}>
                            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <SoftTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                textTransform="capitalize"
                              >
                                Direct Sponsor
                              </SoftTypography>
                            </SoftBox>
                            <select style={{ paddingLeft: '10px', border: '1px solid', borderRadius: '8px', fontSize: '16px', borderColor: '#ccc', boxSizing: 'border-box', height: '39px', display: "block", width: "100%", backgroundColor: "#fff" }} name="spill_sponsor_id" onChange={handleChange}>
                              <option value={0}>Select Direct Sponsor</option>
                              <option value={profile.id}>{profile.name}</option>
                              {renderingTree(downTree, loaddownTree)}
                            </select>
                            {/* <SoftSelect
                              name="spill_sponsor_id"
                              onChange={handleChange}
                              defaultValue={{ value: "0", label: "Select Direct Sponsor" }}
                              options={sponsorValues}
                            /> */}
                            <span style={{ color: "red", fontSize: "smaller" }}>
                              {errorMessage &&
                                "spill_sponsor_id" in errorMessage &&
                                errorMessage.spill_sponsor_id[0]}
                            </span>
                          </SoftBox>
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={1}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Name"
                            name="name"
                            placeholder="Please Enter Name"
                            value={productData?.name}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.name && errorMessage?.name[0]}
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="number"
                            label="Contact no."
                            name="phone"
                            min={10}
                            max={10}
                            required={true}
                            placeholder="Please Enter Contact No. "
                            value={productData?.phone}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.phone && errorMessage?.phone[0]}
                            {phoneError}
                          </span>
                        </Grid>

                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                          <FormField
                            type="email"
                            label="Email"
                            name="email"
                            required={true}
                            placeholder="Please Enter Email-id"
                            value={productData?.email}
                            disabled={verifyOtpBox}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.email && errorMessage?.email[0]}
                            {emailAddressError}
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          {verifyEmailLoader ? <>
                            <SoftButton
                              variant="gradient"
                              color="success"
                              style={{ marginTop: "35px" }}
                              fullWidth
                            >
                              <CircularProgress style={{ width: "15px", color: "#fff", height: "15px" }} />
                            </SoftButton>
                          </> : <>
                            <SoftButton
                              variant="gradient"
                              color="success"
                              style={{ marginTop: "35px" }}
                              disabled={verifyOtpBox}
                              onClick={() => verifyOtpRequest(productData)}
                              fullWidth
                            >
                              Verify Email
                            </SoftButton>

                          </>}



                        </Grid>
                        {verifyOtpBox ? <>

                          {otpInputDisabled ? <>
                            <Grid item xs={12} sm={2}>
                              <SoftButton
                                variant="gradient"
                                color="warning"
                                style={{ marginTop: "35px" }}
                                fullWidth
                                disabled={true}
                              >
                                OTP VERIFIED
                              </SoftButton>


                            </Grid></> : <>

                            <Grid item xs={12} sm={2}>
                              <FormField
                                type="number"
                                label="Enter OTP"
                                name="otp"
                                required={true}
                                placeholder="Please Enter Email-id"
                                value={productData?.otp}
                                disabled={otpInputDisabled}
                                onChange={handleChange}
                              />
                              <span style={{ color: "red", fontSize: "smaller" }}>
                                {otpError && otpError}
                               
                              </span>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              {otpButtonDisabled ? <>
                                <SoftButton
                                  variant="gradient"
                                  color="success"
                                  style={{ marginTop: "35px" }}
                                  fullWidth
                                >
                                  <CircularProgress style={{ width: "15px", color: "#fff", height: "15px" }} />
                                </SoftButton>
                              </> : <>
                                <SoftButton
                                  variant="gradient"
                                  disabled={otpInputDisabled}
                                  color="warning"
                                  style={{ marginTop: "35px" }}
                                  onClick={() => verifyOtpRequestPost(productData)}
                                  fullWidth
                                >
                                  Verify OTP
                                </SoftButton>

                              </>}



                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <SoftButton
                                  variant="gradient"
                                  color="info"
                                  style={{ marginTop: "35px" }}
                                  onClick={resentOTP}
                                  fullWidth
                                >
                                  Resent OTP
                                </SoftButton>

                            </Grid>
                          </>} :

                        </> : <></>}

                        {/* <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Pan No."
                            name="pan_card"
                            required={true}
                            placeholder="Please Enter Pan No. "
                            value={productData?.pan_card}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.pan_card && errorMessage?.pan_card[0]}
                            {phoneError}
                          </span>
                        </Grid> */}
                      </Grid>
                    </SoftBox>
                  </SoftBox>
                  {/* persnal information form end  */}
                  {/* Bank Details start   */}
                  {/* Bank Details End   */}
                  {/*Residential Address Details start   */}

                  {/*Residential Address Details End   */}
                  <SoftBox>
                    <SoftBox mt={7}>
                      <SoftTypography variant="h5">Residential Address Details</SoftTypography>
                    </SoftBox>

                    <SoftBox mt={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                          <FormField
                            type="text"
                            label="Address"
                            maxLength="150"
                            name="permanent_address_street"
                            placeholder="Address"
                            value={productData?.permanent_address_street}
                            onChange={handleChange}
                            disabled={inputDisabled}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_street &&
                              errorMessage?.permanent_address_street[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="City"
                            name="permanent_address_city"
                            placeholder="City"
                            value={productData?.permanent_address_city}
                            onChange={handleChange}
                            disabled={inputDisabled}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_city &&
                              errorMessage?.permanent_address_city[0]}
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="State"
                            name="permanent_address_state"
                            placeholder="State "
                            value={productData?.permanent_address_state}
                            onChange={handleChange}
                            disabled={inputDisabled}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_state &&
                              errorMessage?.permanent_address_state[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Country"
                            name="permanent_address_country"
                            placeholder="Country"
                            value={productData?.permanent_address_country}
                            onChange={handleChange}
                            disabled={inputDisabled}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_country &&
                              errorMessage?.permanent_address_country[0]}
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="number"
                            label="PostCode"
                            name="permanent_address_postcode"
                            placeholder="PostCode "
                            value={productData?.permanent_address_postcode}
                            onChange={handleChange}
                            disabled={inputDisabled}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_postcode &&
                              errorMessage?.permanent_address_postcode[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                  </SoftBox>
                  {/*Shipping Address Details End  

                  {/*DOCUMENTS TYPE End   */}

                  <SoftBox p={2} style={{ float: "right" }}>

                    <SoftButton
                      variant="gradient"
                      color="warning"
                      onClick={() => window.location.reload()}
                      disabled={inputDisabled}
                    >
                      Reset
                    </SoftButton>{" "}
                    {btnDis ? <>

                      <SoftButton
                        variant="gradient"
                        color="success"
                      >
                        <CircularProgress style={{ width: "15px", color: "#fff", height: "15px" }} />
                      </SoftButton>

                    </> : <>

                      <SoftButton
                        variant="gradient"
                        color="success"
                        disabled={inputDisabled}
                        onClick={() => handleSubmit(productData)}
                      >
                        Submit
                      </SoftButton>

                    </>}

                  </SoftBox>
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
