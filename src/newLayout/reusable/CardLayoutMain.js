import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CardLayout = styled.div`
  text-align: center;
  margin: auto;
  border-radius: 5px;
  padding:1rem 2rem;
  height:100%;
  background: #FFF;
  box-shadow: 0px 2px 3px 3px rgba(120, 120, 120, 0.25);
  & p {
    color: #333;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    margin-top: 20px;
  }
`;
const CardLayoutMain = ({image,title}) => {
  return (
    <CardLayout>
      <img src={image} alt="img" />
      <p>{title}</p>
    </CardLayout>
  );
};
CardLayoutMain.propTypes = {
    image: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
  };

export default CardLayoutMain;
