import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CardLayout = styled.div`
  margin: auto;
  position: relative;
  border-radius: 0px 66px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(129, 129, 129, 0.25);
  padding: 20px;
  height: 100%;
  & h1 {
    color: #26282b;
    font-size: 20px;
    font-weight: 600;
    line-height: 35px;
    padding-top: 50px;
  }
  & p {
    color: #3a3a3a;
    font-size: 14px;
    font-weight: 500;
    line-height: 28px;
  }
  & img {
    position: absolute;
    top: -52px;
    max-width: 80px;
  }
`;
const RadiusCardLayout = ({ image, title ,subTitle}) => {
  return (
    <CardLayout>
      <img class="mb-3 mt-3" src={image} alt="advntageImg" />
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </CardLayout>
  );
};
RadiusCardLayout.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
};

export default RadiusCardLayout;
