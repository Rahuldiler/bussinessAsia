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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

function AssociateICO({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>associate</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Rounded-Icons"
          transform="translate(-1717.000000, -291.000000)"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="associate" transform="translate(1.000000, 0.000000)">
              <path
                d="M5.5 0C3.56717 0 2 1.56567 2 3.49804C2 5.43041 3.56717 6.99609 5.5 6.99609C7.43283 6.99609 9 5.43041 9 3.49804C9 1.56567 7.43283 0 5.5 0Z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="M3.5 8.99414C1.56711 8.99414 0 10.5605 0 12.4936V14.9909H11V12.4936C11 10.5605 9.43289 8.99414 7.5 8.99414H3.5Z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="M12.5 10H12V15H15V12.5C15 11.1193 13.8807 10 12.5 10Z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="M11.5 4C10.1193 4 9 5.11929 9 6.5C9 7.88071 10.1193 9 11.5 9C12.8807 9 14 7.88071 14 6.5C14 5.11929 12.8807 4 11.5 4Z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Setting default values for the props of AssociateICO
AssociateICO.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the AssociateICO
AssociateICO.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "dark2",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default AssociateICO;
