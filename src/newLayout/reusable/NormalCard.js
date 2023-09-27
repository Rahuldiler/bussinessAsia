import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NormalCardLayout = styled.div`
  text-align: center;
  margin: auto;
  & p {
    color: #333;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    margin-top:10px;
  }
`;

const NormalCard = ({ image, title }) => {
  return (
    <NormalCardLayout>
      <img src={image} alt="img" />
      <p>{title}</p>
    </NormalCardLayout>
  );
};

NormalCard.propTypes = {
  image: PropTypes.string.isRequired, // Ensure image is required and of type string
  title: PropTypes.string.isRequired, // Ensure title is required and of type string
};

export default NormalCard;
