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
import { useNavigate } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";

function ProductInfo() {
  const navigate = useNavigate();
  const frameOptions = [
    { value: "aluminium", label: "Aluminium" },
    { value: "carbon", label: "Carbon" },
    { value: "steel", label: "Steel" },
    { value: "wood", label: "Wood" },
  ];

  const colorOptions = [
    { value: "black", label: "black" },
    { value: "blue", label: "blue" },
    { value: "gray", label: "gray" },
    { value: "pink", label: "pink" },
    { value: "red", label: "red" },
    { value: "white", label: "white" },
  ];

  return (
    <SoftBox>
      <SoftBox mb={1}>
        <SoftTypography variant="h3" fontWeight="bold">
          Goat Milk Capsule
        </SoftTypography>
      </SoftBox>
      <SoftTypography variant="h4" color="text">
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
      </SoftTypography>
      <SoftBox mt={1}>
        <SoftTypography variant="h6" fontWeight="medium">
          Price
        </SoftTypography>
      </SoftBox>
      <SoftBox mb={1}>
        <SoftTypography variant="h5" fontWeight="medium">
          ₹6,250
        </SoftTypography>
      </SoftBox>
      <SoftBadge variant="contained" color="success" badgeContent="in stock" container />
      <SoftBox mt={3} mb={1} ml={0.5}>
        <SoftTypography variant="caption" fontWeight="bold">
          Description
        </SoftTypography>
      </SoftBox>
      <SoftBox component="ul" m={0} pl={4} mb={2}>
        <SoftBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <SoftTypography variant="body2" color="text" verticalAlign="middle">
            Goat Milk Capsules offer a magical experience as they are a rich source of essential
            nutrients, making them a powerhouse of health benefits.
          </SoftTypography>
        </SoftBox>
        <SoftBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <SoftTypography variant="body2" color="text" verticalAlign="middle">
            The capsules contain smaller fat particles, which make them easily digestible, ensuring
            a comfortable experience for consumers.
          </SoftTypography>
        </SoftBox>
        <SoftBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <SoftTypography variant="body2" color="text" verticalAlign="middle">
            With a potent combination of calcium, magnesium, potassium, and vitamin D, these
            capsules provide nourishment and contribute to better heart health.
          </SoftTypography>
        </SoftBox>
        <SoftBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <SoftTypography variant="body2" color="text" verticalAlign="middle">
            The goat milk-based product is a safer alternative for individuals with milk allergies,
            offering a delicious and flavorful option without triggering allergic reactions.
          </SoftTypography>
        </SoftBox>
        <SoftBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <SoftTypography variant="body2" color="text" verticalAlign="middle">
            Customers can enjoy these capsules with confidence as they are free from artificial
            colors, flavors, and preservatives, ensuring a pure and smooth taste that everyone can
            savor.
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox mt={3}>
        <Grid item xs={12} lg={5} container>
          <SoftButton
            variant="gradient"
            color="info"
            onClick={() => navigate("/payment/create")}
            fullWidth
          >
            buy this
          </SoftButton>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default ProductInfo;
