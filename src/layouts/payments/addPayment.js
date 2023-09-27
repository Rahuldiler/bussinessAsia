import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../../public/css/input.css";
import axios from 'axios';
import { } from "@heroicons/react/24/solid";
import { Token, UploadFileSharp } from "@mui/icons-material";
import { Card, Button, Typography, Select, Option, Input, Textarea, Chip } from "@material-tailwind/react";
import { ProfileInfoCard } from "@/widgets/cards";
import { useNavigate } from "react-router-dom";
import { addPayment, add_investor, assets, investorsListApi } from "@/Api/Api";
import qrCode from '../../../public/img/qr.png';
import { API_AUTHORIZATION_CODE } from "Api/Api";
let circleCommonClasses = 'h-2.5 w-2.5 bg-current   rounded-full';

const TABLE_HEAD = [<Chip size="sm" variant="outlined" value="Quantity" color="amber" />,
<Chip size="sm" variant="outlined" value="Points" color="amber" />];

const TABLE_ROWS = [
    {
        quantity: <strong>ON PURCHASE 5000</strong>,
        points: <strong>GET VOUCHER OF ₹500</strong>
    },
    {
        quantity: <strong>ON PURCHASE 10000</strong>,
        points: <strong>EARN 3 REFER POINTS</strong>
    },
    {
        quantity: <strong>ON PURCHASE 20000</strong>,
        points: <strong>EARN 6 REFER POINTS</strong>
    },
    {
        quantity: <strong>ON PURCHASE 40000</strong>,
        points: <strong>EARN 8 REFER POINTS</strong>,
    },
    {
        quantity: <strong>ON PURCHASE 80000</strong>,
        points: <strong>EARN 32 REFER POINTS</strong>
    },
    {
        quantity: <strong>ON PURCHASE 160000</strong>,
        points: <strong>-----</strong>
    },
    //   {
    //     quantity: <strong>ON PURCHASE 320000</strong>,
    //     points: <strong>-----</strong>
    //   },
    //   {
    //     quantity: <strong>ON PURCHASE 640000</strong>,
    //     points: <strong>-----</strong>
    //   },
    //   {
    //     quantity: <strong>ON PURCHASE 1280000</strong>,
    //     points: <strong>-----</strong>
    //   },
    //   {
    //     quantity: <strong>ON PURCHASE 2560000</strong>,
    //     points: <strong>-----</strong>
    //   },
    //   {
    //     quantity: <strong>ON PURCHASE 5120000</strong>,
    //     points: <strong>-----</strong>
    //   },
];


function AddPayment() {
    const navigate = useNavigate()
    const [productData, setProductData] = useState({ qty: 1, checkout_amount: 6250, amount: 2500, asset_id: 1 });
    const [errorMessage, setErrorMessage] = useState();
    const [investorsList, setInvestorsList] = useState()
    const [assetsData, setAssetsData] = useState([]);
    const [amountData, setAmountData] = useState(null)
    const [checkoutAmount, setCheckoutAmount] = useState(6250)
    const [inputQty, setInputQty] = useState(1);
    const [loader, setLoader] = useState(false);
    const [pageLoader, setPageLoader] = useState(false);
    //const [showFields, setShowFields] = useState(false);
    //const [showPaymentField, setShowPaymentField] = useState(false);
    useLayoutEffect(() => {
        getLocalStore()
        getValuesFromLoca()
        getAssets()
    }, [])

    const getValuesFromLoca = async () => {
        const token = await localStorage.getItem('token');
        if (token) {
            setLoader(true)
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
                    setLoader(false)
                    if (Array.isArray(response.data)) {
                        setLoader(false)
                        setInvestorsList(response.data);
                    } else {
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

    const getLocalStore = async () => {
        /* const token = await localStorage.getItem('token');
        if (token) {
            setUserToken(token)
        } else {

        } */
    }

    const infoTable = () => {
        return (
            <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(({ quantity, points }, index) => (
                            <tr key={quantity} className="even:bg-blue-gray-50/50">
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {quantity}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {points}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        )
    }

    const getAssets = async () => {
        const token = await localStorage.getItem('token');
        if (token) {
            setLoader(true)
            fetch(assets, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: API_AUTHORIZATION_CODE,
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setLoader(false)
                        setAssetsData(response.data);
                    } else {
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
    const handleDocument = (e) => {
        const file = e.target.files[0]
        setProductData({
            ...productData, proof_document: file
        })
    }

    const handleInvestor = (value) => {
        if (value > 0) {
            setProductData({
                ...productData, investor_id: value
            })
        }
    }


    const handleAsset = (e) => {
        const varArr = e.split("#");
        const id = varArr[0];
        const amount = varArr[1];
        if (id > 0) {
            setProductData({
                ...productData, amount: 2500, asset_id: parseInt(id), checkout_amount: 6250
            })
            //setShowPaymentField(true);
        } else {
            //setShowPaymentField(false);
        }
    }

    const handleChange = (e) => {
        setProductData({
            ...productData, [e.target.name]: e.target.value
        })
    }
    const handleChangeRemark = (e) => {
        setProductData({
            ...productData, remark: e.target.value
        })
    }

    const handleQtySelect = (e) => {
        setInputQty(parseInt(e));
        const checkoutAmount = 6250 * parseInt(e);
        const amount = 2500 * parseInt(e);
        setProductData({
            ...productData, qty: parseInt(e), checkout_amount: checkoutAmount, amount: amount
        })
    }
    const qtyHandleByOnChange = (e) => {
        const checkoutAmount = 6250 * parseInt(e.target.value);
        const amount = 2500 * parseInt(e.target.value);
        setProductData({
            ...productData, qty: e.target.value, checkout_amount: checkoutAmount, amount: amount
        })

    }
    const handleSubmit = () => {
        alert('Please enter');
        console.log(productData)
        if (productData?.qty > 0) {
            // setLoader(true)
            setPageLoader(true);
            const formData = new FormData();
            formData.append('token', localStorage.getItem('token'));


            if (productData?.amount) {
                formData.append('amount', productData?.amount)
            }
            if (productData?.asset_id) {
                formData.append('asset_id', productData?.asset_id)
            }
            if (productData?.checkout_amount) {
                formData.append('checkout_amount', productData?.checkout_amount)
            }
            if (productData?.txn_dd) {
                formData.append('txn_dd', productData?.txn_dd)
            }
            if (productData?.qty) {
                formData.append('qty', productData?.qty)
            }
            if (productData?.proof_document) {
                formData.append('proof_document', productData?.proof_document)
            }
            if (productData?.remark) {
                formData.append('remark', productData?.remark)
            }
            if (productData?.gst_number) {
                formData.append('gst_number', productData?.gst_number)
            }
            //console.log("ProductData:", productData);

            fetch(addPayment, {
                method: "POST",
                headers: {
                    Authorization: API_AUTHORIZATION_CODE,
                    mode: "no-cors"
                },
                body: formData
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status === 200) {
                        //   setLoader(false)
                        alert("Data has been saved successfully");
                        navigate("/sale-list");
                    }
                    else if (response.status === 202) {
                        //  setLoader(false)
                        setPageLoader(false);
                        setErrorMessage(response?.errors)
                    }
                })
                .catch((error) => {
                    setPageLoader(false);
                    //   setLoader(false)
                });
        } else {
            alert('Please enter minimum quantity 1.')
        }

    }
    return (
        <>
            <div className="content m-auto max-w-5xl py-2 ">
                {loader ?
                    <div className='flex justify-center items-center' style={{ marginTop: 50, marginBottom: 50 }}>
                        <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                        <div
                            className={`${circleCommonClasses} mr-1 animate-bounce200`}
                        ></div>
                        <div className={`${circleCommonClasses} animate-bounce400`}></div>
                    </div>
                    : <form className="mt-10 w-full ">
                        <h3 style={{ fontSize: "20px", color: "#000", fontWeight: "bold", marginBottom: "15px", marginTop: "-30px", position: "relative" }}>Add Sale <a href="https://nuworld.co.in/Nuworld-Sales-Portal.pdf" className="payment-btn payment-btn-pay" target="_blank">Payment Help Manual.</a></h3>

                        <div className="-mx-3 mt-5 mb-6">

                            {/* <div className="w-full px-3 pb-3">
{/*                                 <label
                                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                                    htmlFor="select-investor"

                                >
                                    Select Associates
                                </label>

                                <Select variant="standard" name="select-investor" id="select-investor" label="SELECT ASSOCIATES" onChange=
                                    {(element) => handleInvestor(element)}
                                >
                                    {investorsList ? investorsList.map((item, index) => (
                                        <Option key={`il_${index}`} data-val={item.id} value={item.id}>{item.name}</Option>
                                    )) : ''}
                                </Select>

                                <div>
                                    {errorMessage && (
                                        <Typography color="red" style={{ fontSize: "12px" }}>
                                            {errorMessage?.investor_id}
                                        </Typography>
                                    )}
                                </div>
                            </div> */}
                            <div className="w-full px-3 pb-3 mt-3">
                                {/*                                 <label
                                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                                    htmlFor="grid-place"
                                >
                                    Select Products
                                </label> */}

                                <Select variant="standard" name="select-investor" id="select_asset"
                                    label="Select Product. Please click here to select product from the list" onChange=
                                    {(e) => handleAsset(e)}
                                >
                                    {assetsData ? assetsData.map((item, index) => (
                                        <Option key={`ad_${index}`} value={`${item.id}#${item.price}`}>{item.name}</Option>
                                    )) : ''}
                                </Select>

                                <div>
                                    {errorMessage && (
                                        <Typography color="red" style={{ fontSize: "12px" }}>
                                            {errorMessage?.asset_id}
                                        </Typography>
                                    )}
                                </div>
                            </div>


                            <div className="px-3 pb-3 flex md:flex-row  flex-col">

                                <div className=" w-full ">
                                    <div className="w-full pr-3 pb-3 mt-5">
                                        <Input
                                            variant="standard"
                                            type="number"
                                            id="qty"
                                            name="qty"
                                            min={1}
                                            maxLength={"10"}
                                            label="Quantity"
                                            value={productData.qty}
                                            onChange={(e) => qtyHandleByOnChange(e)}

                                        />

                                        <div>
                                            {errorMessage && (
                                                <Typography color="red" style={{ fontSize: "12px" }}>
                                                    {errorMessage?.qty}
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                    <div className=" w-full pr-3 pb-3 mt-5 ">
                                        <Input
                                            variant="standard"
                                            type="number"
                                            value={productData?.amount}
                                            name="amount"
                                            label="BUSINESS VALUE"
                                        />
                                        {/* <Select variant="standard" name="select-business-value" id="qty"
                                            label="BUSINESS VALUE" value={1} onChange=
                                            {(e) => handleQtySelect(e)}
                                        >
                                            <Option value={1}>2,500</Option>
                                            <Option value={2}>5,000</Option>
                                            <Option value={4}>10,000</Option>
                                            <Option value={8}>20,000</Option>
                                            <Option value={16}>40,000</Option>
                                            <Option value={32}>80,000</Option>
                                            <Option value={64}>160000</Option>
                                            <Option value={128}>320000</Option>
                                            <Option value={256}>640000</Option>
                                            <Option value={512}>1280000</Option>
                                            <Option value={1024}>2560000</Option>
                                            <Option value={2048}>5120000</Option>
                                            <Option value={4096}>10240000</Option>
                                            <Option value={8192}>20480000</Option>
                                            <Option value={16384}>40960000</Option>
                                            <Option value={32768}>81920000</Option>
                                            <Option value={65536}>163840000</Option>
                                        </Select> */}
                                        <div>
                                            {errorMessage && (
                                                <Typography color="red" style={{ fontSize: "12px" }}>
                                                    {errorMessage?.qty}
                                                </Typography>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full pr-3 pb-3 mt-5">
                                        <Input
                                            variant="standard"
                                            /* type="number" */
                                            value={productData?.checkout_amount}
                                            name="checkout_amount"
                                            label="Amount to be paid (GST inclusive)"
                                        />
                                    </div>
                                    <div className="w-full pr-3 pb-3 mt-5">
                                        <Input
                                            variant="standard"
                                            /* type="number" */
                                            value={productData?.gst_number}
                                            name="gst_number"
                                            onChange={handleChange}
                                            label="GST number is required for amount above 20 Lacs."
                                        />
                                        <div>
                                            {errorMessage && (
                                                <Typography color="red" style={{ fontSize: "12px" }}>
                                                    {errorMessage?.gst_number}
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="flex justify-center md:w-1/2 pt-3">
                                    {infoTable()}
                                </div> */}

                            </div>
                            <div style={{ margin: "25px 5px" }}> <img src={qrCode} alt="" style={{ maxWidth: "220px" }} />
                                <p style={{ color: "#000", fontWeight: "bold", margin: "10px 0px" }}>Please scan QR code to make payment. Upload payment transition slip to payment proof section with transition ID.</p>
                            </div>
                            <div className="w-full px-3 pb-3 mt-3">
                                {/*                                 <label
                                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                                    htmlFor="grid-place"
                                >
                                    Transition ID/ DD Number
                                </label> */}

                                <Input
                                    variant="standard"
                                    value={productData?.txn_dd}
                                    name="txn_dd"
                                    label="Txn / DD Number. Please enter transaction reference number."
                                    onChange={handleChange}
                                    required={true}
                                />
                                <div>
                                    {errorMessage && (
                                        <Typography color="red" style={{ fontSize: "12px" }}>
                                            {errorMessage?.txn_dd}
                                        </Typography>
                                    )}
                                </div>
                            </div>

                            <div className="w-full px-3 pb-3 text-gray-700">
                                <label className="mt-2 mb-2 flex  items-center font-medium text-sm tracking-wide uppercase " htmlFor="proof_document">Payment Proof</label>
                                <input type="file" id="uploadPAN" name="proof_document" onChange={handleDocument} />
                                <div>
                                    {errorMessage && (
                                        <Typography color="red" style={{ fontSize: "12px" }}>
                                            {errorMessage?.proof_document}
                                        </Typography>
                                    )}
                                </div>
                            </div>


                            <div className="w-full px-3 pb-3 text-gray-700">
                                {/*                                 <label className="mt-2 mb-2 flex cursor-pointer items-center font-medium text-sm uppercase" htmlFor="remark">Payment Remark</label> */}


                                <Input
                                    variant="standard"
                                    label="Please Enter payment remark"
                                    id="remark"
                                    name="remark"
                                    value={productData?.remark}
                                    onChange={handleChangeRemark}
                                />
                                {errorMessage && (
                                    <Typography color="red" style={{ fontSize: "12px" }}>
                                        {errorMessage?.remark}
                                    </Typography>
                                )}
                                {/* <p style={{ marginTop: "30px" }}><b>Note: </b>Please enter payment code received in your registered email to the online payment mode remarks.</p>
                                */}
                            </div>
                            <div style={{ marginTop: "25px", marginLeft: "10px" }}>
                                {pageLoader ? <><Button className="p-2 rounded-sm text-[12px]" disabled>Loading...</Button></> : <><Button className="p-2 rounded-sm text-[12px]" onClick={handleSubmit}>Submit</Button></>}

                            </div>
                        </div>
                    </form>}

            </div>
        </>
    );
}
export default AddPayment;
