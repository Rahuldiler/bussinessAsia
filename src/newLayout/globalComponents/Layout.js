import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

// Define propTypes for children
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
