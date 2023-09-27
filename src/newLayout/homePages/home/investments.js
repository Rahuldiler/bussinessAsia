import React from "react";
import step1 from "../../../assets/images/website/step1.png";
import step2 from "../../../assets/images/website/step2.png";
import step3 from "../../../assets/images/website/step3.png";
import step4 from "../../../assets/images/website/step4.png";
import styled from "styled-components";
const SectionWrapper = styled.div`
position: relative;

.overlay-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
.container{
    position:relative;


    .flowchart-left{
        color: #26282B;
        font-weight: 700;
        font-size: 38px;
        line-height: 52px;
        position: relative;
    }
    .flowChart-tittle {
        color: #26282B;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        line-height: 34px;
    }
    .flowChart-para {
        color: #3A3A3A;
        text-align: center;
        font-family: Poppins;
        font-size: 14px !important;
        font-style: normal;
        font-weight: 500;
        line-height: 22px !important;
    }

    @media(max-width:767px){
        .flowchart-left {
            font-size: 26px !important;
            line-height: 36px !important;
        }
    }
}
`

const Investments = () => {
  return (
    <SectionWrapper className="padding_box">
      <div className="overlay-bg"></div>
      <div>
        <div className="container">
          <div className="text-center">
            <h1
              className="flowchart-left"
            >
              Seamless Investment Process with Bussinasia
            </h1>
          </div>
          <div className="row mt-5">
            <div className="col-xl-3 col-md-6">
              <div className="text-center">
                <img className="stepimg" src={step1} alt="step" />
                <h6 className="flowChart-tittle">Finance</h6>
                <p className="flowChart-para">
                  Explore various financing options &amp; use personal funds, and secure loans to
                  determine the initial investment and ongoing costs.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="text-center">
                <h6 className="flowChart-tittle">Monitor</h6>
                <p className="flowChart-para">
                  Receive consistent portfolio updates on performance. Stay informed about
                  investment progress and make informed decisions.
                </p>
                <img className="stepimg1" src={step2} alt="" />
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="text-center">
                <img className="stepimg" src={step3} alt="step3" />
                <h6 className="flowChart-tittle">Profit</h6>
                <p className="flowChart-para">
                  Generate passive income through monthly rental yields, enhancing financial
                  stability and creating a steady cash flow.
                </p>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="text-center">
                <h6 className="flowChart-tittle">Exit</h6>
                <p className="flowChart-para">
                  Optimize gains by utilizing our liquidity options for a lucrative exit strategy,
                  ensuring profitability and flexibility.
                </p>
                <img className="stepimg1" src={step4} alt="step4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Investments;
