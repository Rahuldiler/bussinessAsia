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
  }, []);

  const getLocalStore = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    } else {
    }
  };

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
      .catch((error) => {});
  };
  const handleDocument = (e) => {
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
  };

  const handleChange = (e, dropdown = null) => {
    let name = null;
    let value = null;
    if (dropdown !== null) {
      name = dropdown.name;
      value = e.value;
    } else {
      name = e.target.name;
      value = e.target.value;
    }
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (data) => {
    setPageLoader(true);
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
    if (data?.pan) {
      formData.append("pan", data?.pan);
    }
    if (data?.aadhar) {
      formData.append("aadhar", data?.aadhar);
    }
    if (data?.phone) {
      formData.append("phone", data?.phone);
    }
    if (data?.father_husband) {
      formData.append("father_husband", data?.father_husband);
    }
    if (data?.bank_name) {
      formData.append("bank_name", data?.bank_name);
    }
    if (data?.account_holder_name) {
      formData.append("account_holder_name", data?.account_holder_name);
    }
    if (data?.account_number) {
      formData.append("account_number", data?.account_number);
    }
    if (data?.account_number_confirmation) {
      formData.append("account_number_confirmation", data?.account_number_confirmation);
    }
    if (data?.ifsc_code) {
      formData.append("ifsc_code", data?.ifsc_code);
    }
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
    if (data?.residential_address_street) {
      formData.append("residential_address_street", data?.residential_address_street);
    }
    if (data?.residential_address_city) {
      formData.append("residential_address_city", data?.residential_address_city);
    }
    if (data?.residential_address_state) {
      formData.append("residential_address_state", data?.residential_address_state);
    }
    if (data?.residential_address_country) {
      formData.append("residential_address_country", data?.residential_address_country);
    }
    if (data?.residential_address_postcode) {
      formData.append("residential_address_postcode", data?.residential_address_postcode);
    }
    if (data?.pan_card) {
      formData.append("pan_card", data?.pan_card);
    }
    if (data?.aadhar_card) {
      formData.append("aadhar_card", data?.aadhar_card);
    }
    if (data?.photo) {
      formData.append("photo", data?.photo);
    }

    fetch(add_investor, {
      method: "POST",
      headers: {
        Authorization: "BSI_AUTH_NEXTDYNAMIC",
        mode: "no-cors",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          alert("Data has been saved successfully");
          navigate("/dashboard/associates");
        } else if (data.status === 202) {
          //  setLoader(false)
          setErrorMessage(data?.errors);
          setPageLoader(false);
        }
      })
      .catch((error) => {
        setPageLoader(false);
        //  setLoader(false)
      });
    // }
  };

  /*   const renderingTree = (treeData, loadData) => {
    return (
      <>
        {loadData
          ? treeData?.map((item) => (
              <>
                <option value={item.id}>
                  {item.name} (Sponsor Name: {item.sponsor_name} - Email: {item.email})
                </option>
                {item.children && item.children.length ? renderingTree(item.children, true) : ""}
              </>
            ))
          : ""}
      </>
    );
  }; */

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
                              {console.log("errors are :", errorMessage)}
                              <SoftTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                textTransform="capitalize"
                              >
                                Sponsor
                              </SoftTypography>
                            </SoftBox>
                            <SoftSelect
                              name="sponsor_id"
                              onChange={handleChange}
                              defaultValue={{ value: "0", label: "Select Sponsor" }}
                              options={sponsorValues}
                            />
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
                            <SoftSelect
                              name="spill_sponsor_id"
                              onChange={handleChange}
                              defaultValue={{ value: "0", label: "Select Direct Sponsor" }}
                              options={sponsorValues}
                            />
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
                            type="email"
                            label="Email"
                            name="email"
                            required={true}
                            placeholder="Please Enter Email-id"
                            value={productData?.email}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.email[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
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
                            {errorMessage?.phone[0]}
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Father/Husband"
                            name="father_husband"
                            placeholder=" Please Enter Father/Husband Name"
                            value={productData?.father_husband}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.father_husband[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                  </SoftBox>
                  {/* persnal information form end  */}
                  {/* Bank Details start   */}
                  <SoftBox>
                    <SoftBox mt={7}>
                      <SoftTypography variant="h5">Bank Details</SoftTypography>
                    </SoftBox>

                    <SoftBox mt={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Bank Name"
                            name="bank_name"
                            placeholder="Bank Name"
                            value={productData?.bank_name}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Account Holder Name"
                            name="account_holder_name"
                            placeholder="Account Holder Name"
                            value={productData?.account_holder_name}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Account Number"
                            name="account_number"
                            placeholder="Account Number "
                            value={productData?.account_number}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Account Number Confirmation"
                            name="account_number_confirmation"
                            placeholder="Account Number Confirmation"
                            value={productData?.account_number_confirmation}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Ifsc Code"
                            name="ifsc_code"
                            placeholder="Ifsc Code "
                            value={productData?.ifsc_code}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </SoftBox>
                  </SoftBox>
                  {/* Bank Details End   */}
                  {/*Residential Address Details start   */}
                  <SoftBox>
                    <SoftBox mt={7}>
                      <SoftTypography variant="h5">Residential Address Details</SoftTypography>
                    </SoftBox>

                    <SoftBox mt={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                          <FormField
                            type="text"
                            label="Residential Address"
                            maxLength="150"
                            name="residential_address_street"
                            placeholder="Residential Address"
                            value={productData?.residential_address_street}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.residential_address_street[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Residential city"
                            name="residential_address_city"
                            placeholder="Residential city"
                            value={productData?.residential_address_city}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.residential_address_city[0]}
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Residential State"
                            name="residential_address_state"
                            placeholder="Residential State "
                            value={productData?.residential_address_state}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.residential_address_state[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Residential country"
                            name="residential_address_country"
                            placeholder="Residential country"
                            value={productData?.residential_address_country}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.residential_address_country[0]}
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="number"
                            label="Residential PostCode"
                            name="residential_address_postcode"
                            id="grid-contact-no"
                            placeholder="Residential postCode "
                            value={productData?.residential_address_postcode}
                            onChange={handleChange}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.residential_address_postcode[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                          <SoftInput
                            type="checkbox"
                            placeholder="Residential postCode "
                            checked={sameAddress}
                            onChange={(e) => {
                              setSameAddress(e.target.checked);
                              handleCheckbox();
                            }}
                          />
                        </Grid>
                      </Grid>
                    </SoftBox>
                  </SoftBox>
                  {/*Residential Address Details End   */}
                  {/*Shipping  Address Details start   */}
                  <SoftBox>
                    <SoftBox mt={7}>
                      <SoftTypography variant="h5">Shipping Address Details</SoftTypography>
                    </SoftBox>

                    <SoftBox mt={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                          <FormField
                            type="text"
                            label="Shipping Address"
                            maxLength="150"
                            name="permanent_address_street"
                            placeholder="Shipping Address"
                            value={productData?.permanent_address_street}
                            onChange={handleChange}
                            disabled={sameAddress}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_street[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Shipping city"
                            name="permanent_address_city"
                            placeholder="Shipping city"
                            value={productData?.permanent_address_city}
                            onChange={handleChange}
                            disabled={sameAddress}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_city[0]}
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Shipping State"
                            name="permanent_address_state"
                            placeholder="Shipping State "
                            value={productData?.permanent_address_state}
                            onChange={handleChange}
                            disabled={sameAddress}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_state[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Shipping country"
                            name="permanent_address_country"
                            placeholder="Shipping country"
                            value={productData?.permanent_address_country}
                            onChange={handleChange}
                            disabled={sameAddress}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_country[0]}
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="number"
                            label="Shipping postCode"
                            name="permanent_address_postcode"
                            placeholder="Shipping postCode "
                            value={productData?.permanent_address_postcode}
                            onChange={handleChange}
                            disabled={sameAddress}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.permanent_address_postcode[0]}
                          </span>
                        </Grid>
                      </Grid>
                    </SoftBox>
                  </SoftBox>
                  {/*Shipping Address Details End   */}
                  {/*DOCUMENTS TYPE  start*/}
                  <SoftBox mt={7}>
                    <SoftTypography variant="h5">DOCUMENTS TYPE</SoftTypography>
                  </SoftBox>
                  <SoftBox mt={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="number"
                          label="Aadhar Card"
                          id="aadhar"
                          name="aadhar"
                          value={productData?.aadhar}
                          onChange={handleChange}
                        />
                        <span style={{ color: "red", fontSize: "smaller" }}>
                          {errorMessage?.aadhar[0]}
                        </span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="Pan Card"
                          id="pan"
                          name="pan"
                          value={productData?.pan}
                          onChange={handleChange}
                        />
                        <span style={{ color: "red", fontSize: "smaller" }}>
                          {errorMessage?.pan[0]}
                        </span>
                      </Grid>
                    </Grid>
                  </SoftBox>
                  <SoftBox mt={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="file"
                          label="PAN Card"
                          id="uploadPAN"
                          name="pan"
                          onChange={handleDocument}
                        />
                        <span style={{ color: "red", fontSize: "smaller" }}>
                          {errorMessage?.pan[0]}
                        </span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="file"
                          label="Aadhar Card"
                          accept=".jpeg, .jpg, .png"
                          id="uploadAadhar"
                          name="aadhar_card"
                          onChange={handleDocument1}
                        />
                        <span style={{ color: "red", fontSize: "smaller" }}>
                          {errorMessage?.aadhar[0]}
                        </span>
                      </Grid>
                    </Grid>
                  </SoftBox>
                  <SoftBox mt={2}></SoftBox>
                  <SoftBox mt={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                        <FormField
                          type="file"
                          label="Photo"
                          id="uploadProperty"
                          name="photo"
                          onChange={handleDocument2}
                        />
                      </Grid>
                    </Grid>
                  </SoftBox>
                  {/*DOCUMENTS TYPE End   */}

                  <SoftBox p={2} style={{ float: "right" }}>
                    <SoftButton
                      variant="gradient"
                      color="warning"
                      onClick={() => window.location.reload()}
                      disabled={btnDis}
                    >
                      Reset
                    </SoftButton>{" "}
                    <SoftButton
                      variant="gradient"
                      color="success"
                      disabled={btnDis}
                      onClick={() => handleSubmit(productData)}
                    >
                      {btnDis ? (
                        <CircularProgress style={{ width: "15px", height: "15px" }} />
                      ) : (
                        "Submit"
                      )}
                    </SoftButton>
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
