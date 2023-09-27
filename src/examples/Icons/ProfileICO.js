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

function ProfileICO({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>profile_icon</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Rounded-Icons"
          transform="translate(-1717.000000, -291.000000)"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="profile_icon" transform="translate(1.000000, 0.000000)">
              <path
                d="M309.333,213.333h149.333c5.888,0,10.667-4.779,10.667-10.667S464.555,192,458.667,192H309.333
				c-5.888,0-10.667,4.779-10.667,10.667S303.445,213.333,309.333,213.333z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="M458.667,21.333H53.333C23.915,21.333,0,45.269,0,74.667v362.667c0,29.397,23.915,53.333,53.333,53.333h405.333
				c29.419,0,53.333-23.936,53.333-53.333V74.667C512,45.269,488.085,21.333,458.667,21.333z M138.667,64
				c5.888,0,10.667,4.779,10.667,10.667s-4.779,10.667-10.667,10.667S128,80.555,128,74.667S132.779,64,138.667,64z M96,64
				c5.888,0,10.667,4.779,10.667,10.667S101.888,85.333,96,85.333s-10.667-4.779-10.667-10.667S90.112,64,96,64z M53.333,64
				C59.221,64,64,68.779,64,74.667s-4.779,10.667-10.667,10.667s-10.667-4.779-10.667-10.667S47.445,64,53.333,64z M490.667,437.333
				c0,17.643-14.357,32-32,32H53.333c-17.643,0-32-14.357-32-32V128h469.333V437.333z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="M53.333,405.333h213.333c5.888,0,10.667-4.8,10.667-10.688c0-26.731-18.133-49.941-44.053-56.427l-32.021-8l-1.344-5.355
				c8.32-9.173,14.208-20.885,16.661-33.045c5.696-2.944,9.813-8.533,10.667-15.253l2.304-18.56
				c0.704-5.632-1.024-11.307-4.757-15.573c-1.152-1.323-2.453-2.453-3.883-3.435l0.533-11.328l1.941-1.941
				c5.504-5.845,12.928-18.325,1.173-36.331c-5.547-8.533-17.067-18.731-40.149-18.731c-6.784,0-22.123,0-37.013,9.344
				c-43.904,1.536-49.067,25.195-49.067,43.072c0,3.52,0.619,10.112,1.237,15.616c-1.579,1.003-3.051,2.24-4.288,3.669
				c-3.797,4.309-5.547,10.005-4.821,15.659l2.304,18.56c0.875,6.955,5.291,12.715,11.797,15.552
				c2.389,11.627,7.979,22.891,15.765,31.829l-1.557,6.272l-32.021,8c-25.941,6.464-44.075,29.675-44.075,56.427
				C42.667,400.555,47.445,405.333,53.333,405.333z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="M309.333,405.333h85.333c5.888,0,10.667-4.779,10.667-10.667S400.555,384,394.667,384h-85.333
				c-5.888,0-10.667,4.779-10.667,10.667S303.445,405.333,309.333,405.333z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="M309.333,277.333h149.333c5.888,0,10.667-4.779,10.667-10.667S464.555,256,458.667,256H309.333
				c-5.888,0-10.667,4.779-10.667,10.667S303.445,277.333,309.333,277.333z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="M309.333,341.333h149.333c5.888,0,10.667-4.779,10.667-10.667S464.555,320,458.667,320H309.333
				c-5.888,0-10.667,4.779-10.667,10.667S303.445,341.333,309.333,341.333z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Setting default values for the props of ProfileICO
ProfileICO.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the ProfileICO
ProfileICO.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ProfileICO;
