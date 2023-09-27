import React from "react";
import { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Card, CardHeader, CardBody, Avatar, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { paymentList } from "@/Api/Api";
import { API_AUTHORIZATION_CODE } from "Api/Api";
let circleCommonClasses = "h-2.5 w-2.5 bg-current   rounded-full";

const PaymentsList = () => {
  const [assetsData, setAssetsData] = useState([]);
  const navigate = useNavigate();
  const [loader, SetLaoder] = useState(false);

  const handleClick = (id) => {
    navigate(`/dashboard/asset/${id}`);
  };

  const handleTargetClick = (id) => {
    navigate(`/dashboard/add-investment`);
  };

  useEffect(() => {
    SetLaoder(true);
    fetch(paymentList, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_AUTHORIZATION_CODE,
      },
      body: JSON.stringify({token: localStorage.getItem("token")})
    })
      .then((response) => response.json())
      .then((response) => {
        if (Array.isArray(response.data)) {
          SetLaoder(false);
          setAssetsData(response.data);
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
    <div className="mt-12">
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card className="rounded-none">
        <CardHeader
          variant="gradient"
          color="blue"
            className="mb-8 flex items-center justify-between rounded-none p-6"
        >
          <Typography variant="h6" color="white">
              Sale Report
          </Typography>
            <Button onClick={() => navigate("/dashboard/add-sale")} className="bg-white rounded-sm p-2" variant="outlined">
              Add Sale
          </Button>
        </CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto whitespace-nowrap">
              <thead>
                <tr>
                  {["Id", "Associates", "Product", "Product Amount", "Qty", "Checkout Amount + GST", "Txn Or DD Number", "Payment Proof", "Status"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="whitespace-nowrap text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {
                  loader ? (
                    <tr>
                    <td colSpan={8} style={{textAlign:"center", padding:"20px", color:"green", fontSize:"20px"}}> Loading...</td> 
                  </tr>
                  ) : (
                    // {
                    Array.isArray(assetsData) &&
                    assetsData.map(
                      ({id, investor_name, asset_title, amount, checkout_amount, txn, status, proof_document, qty}) => {
                        const className =
                          "py-3 px-5 border-b border-blue-gray-50";

                        return (
                          <tr key={id}>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                NUPY{id}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {investor_name}
                              </Typography>
                            </td>

                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {asset_title}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                               RS {amount}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {qty}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                             RS {checkout_amount}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                              {txn}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                              <a href={proof_document} target="_blank" download>
                              <Avatar src={proof_document} alt={name} size="sm" />
                              </a>
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {status ? <Chip size="sm" variant="filled" value="&nbsp;&nbsp;&nbsp;&nbsp;Verified&nbsp;&nbsp;&nbsp;&nbsp;" color="green"/> : <Chip size="sm" variant="filled" value="Not Verified" color="amber"/>}
                              </Typography>
                            </td>
                           
                          </tr>
                        );
                      }
                    )
                  )
                  // }
                }
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsList;
