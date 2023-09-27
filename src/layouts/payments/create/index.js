import { useState, useLayoutEffect } from "react";
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

import QR from "assets/images/qr.jpg";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import { addPayment, add_investor, assets, investorsListApi } from "Api/Api";

import CircularProgress from "@mui/material/CircularProgress";
import { API_AUTHORIZATION_CODE } from "Api/Api";

function Create() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    qty: 0,
    checkout_amount: 0,
    amount: 0,
    asset_id: 0,
    txn_dd: null,
    gst_number: null,
    proof_document: "",
    remark: "",
  });
  const [errorMessage, setErrorMessage] = useState();
  const [investorsList, setInvestorsList] = useState();
  const [assetsData, setAssetsData] = useState([]);
  const [paymentType, setPaymentType] = useState([{ value: 1, label: 'Payment Through Gateway' }, { value: 2, label: 'Manual Payment' }]);
  const [amountData, setAmountData] = useState(null);
  const [checkoutAmount, setCheckoutAmount] = useState(0);
  const [bvAmount, setBvAmount] = useState(0);
  const [inputQty, setInputQty] = useState(0);
  const [assetId, setAssetId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [btnDis, setBTNDis] = useState(false);

  const [offlinePayment, setOfflinePayment] = useState('not_allowed');

  useLayoutEffect(() => {
    getLocalStore();
    getAssets();
    getValuesFromLoca();
  }, []);

  const getLocalStore = async () => {
    /* const token = await localStorage.getItem('token');
    if (token) {
        setUserToken(token)
    } else {

    } */
  };

  const getValuesFromLoca = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      setLoader(true);
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
          setLoader(false);
          if (Array.isArray(response.data)) {
            setLoader(false);
            setInvestorsList(response.data);
          } else {
            setLoader(false);
          }
        })
        .catch((error) => {
          setLoader(false);
        });
    } else {
      // console.log("Token not found")
    }
  };

  const getAssets = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      setLoader(true);
      fetch(assets, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (Array.isArray(response.data)) {
            setLoader(false);
            setAssetsData(response.data);
          } else {
            setLoader(false);
          }
        })
        .catch((error) => {
          setLoader(false);
        });
    } else {
      // console.log("Token not found")
    }
  };

  const handleDocument = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      proof_document: file,
    });
  };

  const handleInvestor = (value) => {
    if (value > 0) {
      setProductData({
        ...productData,
        investor_id: value,
      });
    }
  };

  const handleAsset = (e) => {
    //const varArr = e.split("#");
    console.log(e);
    const id = e.value; //varArr[0];
    //const amount = varArr[1];
    if (id > 0) {
      setCheckoutAmount(parseInt(e.price));
      setBvAmount(parseInt(e.bv));
      setAssetId(parseInt(e.value));
      setInputQty(1);
      setProductData({
        ...productData,
        amount: parseInt(e.bv),
        asset_id: parseInt(id),
        qty: 1,
        checkout_amount: parseInt(e.price),
      });
      //setShowPaymentField(true);
    } else {
      setCheckoutAmount(0);
      setBvAmount(0);
      setAssetId(0);
      setInputQty(0);
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeRemark = (e) => {
    setProductData({
      ...productData,
      remark: e.target.value,
    });
  };

  const handleQtySelect = (e) => {
    setInputQty(parseInt(e.target.value));
    if (assetId > 0) {
      if (parseInt(e.target.value) < 1) {
        const checkoutAmountFunction = checkoutAmount * 1;
        const amountFunction = bvAmount * 1;
        setProductData({
          ...productData,
          qty: 1,
          checkout_amount: checkoutAmountFunction,
          amount: amountFunction,
        });
        alert('Please select min quantity 1.');
      } else {
        const checkoutAmountFunction = checkoutAmount * parseInt(e.target.value);
        const amountFunction = bvAmount * parseInt(e.target.value);
        setProductData({
          ...productData,
          qty: parseInt(e.target.value),
          checkout_amount: checkoutAmountFunction,
          amount: amountFunction,
        });
      }

    } else {
      alert("Please select Product First.")
    }

  };

  const qtyHandleByOnChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 0 && inputValue >= 1) {
      const checkoutAmount = 6250 * parseInt(e.target.value);
      const amount = 2500 * parseInt(e.target.value);
      setProductData({
        ...productData,
        qty: inputValue,
        checkout_amount: checkoutAmount,
        amount: amount,
      });
    } else {
      setProductData({
        ...productData,
        qty: 1,
      });
    }
  };

  const handleSubmit = () => {
    console.log('Submit'+offlinePayment);
    setBTNDis(true);
    if (productData?.qty > 0 && productData?.amount > 0 && productData?.checkout_amount > 0 && productData?.asset_id > 0) {
      // setLoader(true)
      setPageLoader(true);
      const formData = new FormData();
      formData.append("token", localStorage.getItem("token"));
      formData.append("offline_payment", offlinePayment);
      if (productData?.amount) {
        formData.append("amount", productData?.amount);
      }
      if (productData?.asset_id) {
        formData.append("asset_id", productData?.asset_id);
      }
      if (productData?.checkout_amount) {
        formData.append("checkout_amount", productData?.checkout_amount);
      }
      if (productData?.txn_dd) {
        formData.append("txn_dd", productData?.txn_dd);
      }
      if (productData?.qty) {
        formData.append("qty", productData?.qty);
      }
      if (productData?.proof_document) {
        formData.append("proof_document", productData?.proof_document);
      }
      if (productData?.remark) {
        formData.append("remark", productData?.remark);
      }
      if (productData?.gst_number) {
        formData.append("gst_number", productData?.gst_number);
      }
      fetch(addPayment, {
        method: "POST",
        headers: {
          Authorization: API_AUTHORIZATION_CODE,
          mode: "no-cors",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            if(offlinePayment === 'allow'){
              navigate("/sale-list");
           
            }else{
              navigate("/sale-list?id=" + response.data[0].id);
            }
           
          } else if (response.status === 202) {
            //  setLoader(false)
            setPageLoader(false);
            setErrorMessage(response?.errors);
            setBTNDis(false);
          }
        })
        .catch((error) => {
          setPageLoader(false);
          setBTNDis(false);
          //   setLoader(false)
        });
      // if (window.confirm("Are you sure you want to proceed with the payment?")) {
       
      // } else {
      //   // alert("Data has been saved successfully");
      //   setBTNDis(false);
      //   navigate("/sale-list");
      // }

    } else {
      if (productData?.qty === 0) {
        alert("Please Select min quantity 1.");
      }
      if (productData?.asset_id > 0) {
        alert("Please Select Product First.");
      }

      setBTNDis(false);
    }
  };

  const selectPaymentType = (e) => {
    if (e.value === 2) {
      setOfflinePayment('allow');
    } else {
      setOfflinePayment('not_allowed');
    }
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
                  {/* add sale form start  */}
                  <SoftBox>
                    <SoftTypography variant="h5">Add Sale</SoftTypography>
                    <SoftBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                          <SoftBox mb={1}>
                            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <SoftTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                textTransform="capitalize"
                              >
                                Select Payment Type
                              </SoftTypography>
                            </SoftBox>
                            <SoftSelect
                              onChange={(e) => selectPaymentType(e)}
                              defaultValue={{ value:1, label:"Payment Through Gateway"}}
                              options={paymentType}
                            />
                          </SoftBox>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <SoftBox mb={3}>
                            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <SoftTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                textTransform="capitalize"
                              >
                                Product
                              </SoftTypography>
                            </SoftBox>
                            <SoftSelect
                              onChange={(e) => handleAsset(e)}
                              //defaultValue={{ value:assetsData[0].value, label:assetsData[0].label}}
                              options={assetsData}
                            />
                          </SoftBox>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="number"
                            label="Quantity"
                            min={0}
                            max={10}
                            placeholder="eg. 1"
                            value={productData.qty}
                            onChange={(e) => handleQtySelect(e)}
                          />
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Business Value"
                            disabled={true}
                            value={productData?.amount}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Amount To Be Paid (GST Inclusive)"
                            disabled={true}
                            value={productData?.checkout_amount}
                          />
                        </Grid>
                      </Grid>
                    </SoftBox>
                    <SoftBox mt={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="GST Number"
                            name="gst_number"
                            placeholder="eg. 07AAGFF2194N1Z1"
                            onChange={(e) => handleChange(e)}
                            value={productData?.gst_number}
                          />
                        </Grid>
                        {offlinePayment === 'allow' ? <>
                          <Grid item xs={12} sm={6}>
                            <FormField
                              type="text"
                              label="TXN / DD Number"
                              name="txn_dd"
                              placeholder="Enter transaction reference number"
                              onChange={(e) => handleChange(e)}
                              value={productData?.txn_dd}
                            />
                            <span style={{ color: "red", fontSize: "smaller" }}>
                              {errorMessage?.txn_dd && errorMessage?.txn_dd[0]}
                            </span>
                          </Grid>
                        </> : ''}
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Payment Remarks"
                            placeholder="Enter payment remarks"
                            value={productData?.remark}
                            onChange={handleChangeRemark}
                          />
                          <span style={{ color: "red", fontSize: "smaller" }}>
                          {errorMessage?.remark && errorMessage?.remark[0]}
                          
                          </span>
                        </Grid>
                        {offlinePayment === 'allow' ? <>
                          <Grid item xs={12} sm={6}>
                            <FormField
                              type="file"
                              label="Payment Proof"
                              id="uploadPAN"
                              name="proof_document"
                              onChange={handleDocument}
                            />
                            <span style={{ color: "red", fontSize: "smaller" }}>
                            {errorMessage?.proof_document && errorMessage?.proof_document[0]}
                            </span>
                          </Grid>
                        </> : ''}
                      </Grid>
                    </SoftBox>
                    {/*                     <SoftBox mt={2}>
                      <Grid container spacing={3}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "center", marginTop: "10px" }}
                        >
                          <img
                            src={QR}
                            style={{ width: "20%", border: "1px solid #ccc", borderRadius: "10px" }}
                          />
                        </Grid>
                      </Grid>
                    </SoftBox> */}
                    
                  </SoftBox>
                  {/* add sale form end  */}
                  <SoftBox p={2} style={{ float: "right" }}>
                    {btnDis ? <>
                      <SoftBox mt={4} mb={1}>
                        <SoftButton
                          variant="gradient"
                          color="success"
                        >
                          <CircularProgress style={{ width: "15px", color: "#fff", height: "15px" }} />
                        </SoftButton>
                      </SoftBox>
                    </> : <>
                      <SoftBox mt={4} mb={1}>
                        <SoftButton
                          variant="gradient"
                          color="success"
                          onClick={handleSubmit}
                        >
                          Submit
                        </SoftButton>
                      </SoftBox>
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
