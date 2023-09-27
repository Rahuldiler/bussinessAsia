import React from "react";
import styled from "styled-components";

const WrapperLayout = styled.div`
  background: #26282b;

  .query-tittle {
    font-size: 40px;
    font-weight: 700;
    line-height: 52px;
    color: #fff;
    margin-bottom:0px;

    & @media(max-width:767px) {
      font-size: 25px;
      line-height: 36px;
    }
  }
`;
const GetInTouch = () => {
  return (
    <WrapperLayout>
      <div className="container padding_box">
        <div class="row justify-content-between p-4">
          <div class="col-md-6 col-sm-12">
            <h1 class="query-tittle">Do You Have Any Query?</h1>
          </div>
          <div class="col-md-6 col-sm-12 align-content-end text-md-end text-sm-start">
            <button class="btn-primary2 mt-4 mt-lg-0 ">GET IN TOUCH</button>
          </div>
        </div>
      </div>
    </WrapperLayout>
  );
};

export default GetInTouch;
