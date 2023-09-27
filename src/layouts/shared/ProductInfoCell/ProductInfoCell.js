import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function ProductInfoCell({ image, name }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftBox mx={2} width="3.75rem">
        <SoftBox component="img" src={image} alt={name} width="100%" />
      </SoftBox>
      <SoftTypography variant="button" fontWeight="medium">
        {name}
      </SoftTypography>
    </SoftBox>
  );
}

ProductInfoCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default ProductInfoCell;