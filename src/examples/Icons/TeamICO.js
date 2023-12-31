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

function TeamICO({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>team_icon</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Rounded-Icons"
          transform="translate(-1717.000000, -291.000000)"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="team_icon" transform="translate(1.000000, 0.000000)">
              <path
                d="m256,127.8c19.8,0 35.4-16.7 35.4-35.4 0-19.8-15.6-35.4-35.4-35.4s-35.4,15.6-35.4,35.4c2.84217e-14,19.7 15.6,35.4 35.4,35.4zm0-52.2c9.4,0 15.6,7.3 15.6,15.6 0,8.3-7.3,15.6-15.6,15.6s-15.6-6.3-15.6-15.6c0-8.3 6.2-15.6 15.6-15.6z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="m112.1,325.9c-19.8,0-35.4,15.6-35.4,35.4s15.6,35.4 35.4,35.4c18.8,0 35.4-15.6 35.4-35.4s-15.6-35.4-35.4-35.4zm0,50c-8.3,0-15.6-7.3-15.6-15.6s6.3-15.6 15.6-15.6c8.3,0 15.6,7.3 15.6,15.6s-6.2,15.6-15.6,15.6z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="m399.9,289.4c-33,0-62,15.4-80.4,39.5l-54.1-49.3v-57.3c51-4.8 91.7-48.6 91.7-100.7 0-56.3-44.8-101.1-101.1-101.1s-101.1,45.8-101.1,101c0,53.1 40.8,96 91.7,100.7v56.7l-54.3,49.6c-18.4-23.9-47.4-39.2-80.2-39.2-56.3,0.1-101.1,44.9-101.1,101.2s45.9,101.1 101.1,101.1 101.1-44.8 101.1-101.1c0-16.1-3.7-31.3-10.2-44.7l52.6-48.4 53.3,48.6c-6.5,13.4-10.1,28.5-10.1,44.5 0,56.3 45.9,101.1 101.1,101.1 56.3,0 101.1-44.8 101.1-101.1s-44.8-101.1-101.1-101.1zm-333.3,168.4c5-15.8 19.3-26.7 36.2-26.7h18.8c16.8,0 31.1,10.9 36.2,26.7-13,8.8-28.7,14-45.5,14-17,0-32.7-5.2-45.7-14zm106.6-13.7c-9.9-18.8-29.5-31.8-51.6-31.8h-18.8c-23,0-42.7,12.3-52.1,31.2-12.3-14.3-19.8-32.8-19.8-53.1 0-44.8 36.5-81.3 81.3-81.3 43.8,0 81.3,36.5 81.3,81.3-0.1,20.6-7.7,39.4-20.3,53.7zm82.8-241.3c-16.9,0-32.5-5.2-45.5-14 5-15.8 19.3-26.7 36.2-26.7h18.8c16.8,0 31.1,10.9 36.2,26.7-13.2,8.9-28.8,14-45.7,14zm-81.3-81.3c0-44.8 36.5-81.3 81.3-81.3s81.3,36.5 81.3,81.3c0,20.5-7.7,39.3-20.3,53.6-9.9-18.8-29.5-31.8-51.6-31.8h-18.8c-23,0-42.7,12.3-52.1,31.2-12.3-14.1-19.8-32.7-19.8-53zm179.6,336.3c5-15.8 19.3-26.7 36.2-26.7h18.8c16.8,0 31.1,10.9 36.2,26.7-13,8.8-28.7,14-45.5,14s-32.7-5.2-45.7-14zm106.6-13.7c-9.9-18.8-29.5-31.8-51.6-31.8h-18.8c-23,0-42.7,12.3-52.1,31.2-12.3-14.3-19.8-32.8-19.8-53.1 0-44.8 36.5-81.3 81.3-81.3s81.3,36.5 81.3,81.3c5.68434e-14,20.6-7.7,39.4-20.3,53.7z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
              <path
                d="m399.9,325.9c-19.8,0-35.4,15.6-35.4,35.4s15.6,35.4 35.4,35.4 35.4-15.6 35.4-35.4-15.6-35.4-35.4-35.4zm0,50c-8.3,0-15.6-7.3-15.6-15.6s6.3-15.6 15.6-15.6 15.6,7.3 15.6,15.6-6.2,15.6-15.6,15.6z"
                fill={colors[color] ? colors[color].main : colors.dark.main}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Setting default values for the props of TeamICO
TeamICO.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the TeamICO
TeamICO.propTypes = {
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

export default TeamICO;
