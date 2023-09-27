import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ProductAddUpdate from "./ProductAddUpdate";
import ProductInfoCell from "../shared/ProductInfoCell/ProductInfoCell";
import nugoatmilk from "assets/images/product/1.jpg";
import milk from "assets/images/milk.png";
import { assets } from "Api/Api";
import { API_AUTHORIZATION_CODE } from "Api/Api";

function Products() {
  const [loader, setLoader] = useState(false);
  const [assetsData, setAssetsData] = useState({ columns: [], rows: [] });
  const [dataTableData] = useState({
    columns: [
      {
        Header: "ASSET ID",
        accessor: "asset_id",
      },
      {
        Header: "ASSET NAME",
        accessor: "asset_name",
        Cell: () => <ProductInfoCell image={milk} name={"Goat Milk Capsule"} />,
      },
      {
        Header: "ASSET DETAIL",
        accessor: "asset_detail",
      },
      {
        Header: "PRICE",
        accessor: "price",
      },
      {
        Header: "ACTION",
        accessor: "action",
      },
    ],
    rows: [
      {
        asset_id: "NUAS1",
        asset_name: "Goat Milk Capsule",
        asset_detail: "Goat Milk Capsules, the nutrient powerhouse with easier digestion!",
        price: "₹6250",
        action: (
          <SoftButton component={Link} varient="gradient" color="info" size="small" to="view/NUAS1">
            View
          </SoftButton>
        ),
      },
    ],
  });

  const [selectedProductId, setSelectedProductId] = useState(1);
  useEffect(() => {
    getAssets();
    setSelectedProductId(null);
  }, []);
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
            setAssetsData({
              columns: [
                {
                  Header: "SN",
                  Cell: (data) => {
                    return data.cell.row.index + 1
                  }
                },
                {
                  Header: "ASSET NAME",
                  accessor: "asset_name",
                  Cell: (data) => <ProductInfoCell image={data.data[data.cell.row.index].feature_image} name={data.data[data.cell.row.index].name} />,
                },
                {
                  Header: "Amount To Be Paid (GST Inclusive)",
                  accessor: "price",
                },
                {
                  Header: "Business Value",
                  accessor: "bv",
                },
                // {
                //   Header: "ACTION",
                //   Cell: (data) => (
                //     <SoftButton component={Link} varient="gradient" color="info" size="small" to={"view/"+data.data[data.cell.row.index].id}>
                //     View
                //   </SoftButton>
                //   ),
                // },
              ],
              rows: response.data
            });
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

  const userData = JSON.parse(localStorage.getItem("userData"));
  var button = '';
  if (userData.existing_user === 1 && userData.esignin === 0) {
    button = <>
      <Link to="/payment/create">
        <SoftButton variant="gradient" color="info" size="small">
          + Add Sale
        </SoftButton>
      </Link>
    </>
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                All Products
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                All product List like (Goat Milk Capsule, etc).
              </SoftTypography>
            </SoftBox>
            <Stack spacing={1} direction="row">
              {button}
              {/* <SoftButton variant="outlined" color="info" size="small">
                import
              </SoftButton>
              <SoftButton variant="outlined" color="info" size="small">
                export
              </SoftButton> */}
            </Stack>
          </SoftBox>
          {selectedProductId !== null ? (
            <ProductAddUpdate />
          ) : (
            <DataTable table={assetsData}
              entriesPerPage={{
                defaultValue: 10,
                entries: [5, 7, 10, 15, 20, 25],
              }}
              canSearch />
          )}
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Products;
