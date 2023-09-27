import NormalCardLayout from "newLayout/reusable/NormalCard";
import React from "react";
import img1 from "../../../assets/images/website/invest1.png";
import img2 from "../../../assets/images/website/invest2.png";
import img3 from "../../../assets/images/website/invest3.png";
const cardArray = [
  {
    id: 1,
    title: "Fractional Ownership for A-Grade Commercial Properties",
    image: img1,
  },
  {
    id: 2,
    title: "Minimum Investment from 20L to Beyond",
    image: img2,
  },
  {
    id: 3,
    title: "Annual Yield Upto 8-10% with 14% IRR",
    image: img3,
  },
];
const Content = () => {
  return (
    <div className="for_invest_wrapper padding_box">
      <div className="container">
        <div className="row g-5">
          {cardArray.map((ele) => {
            return (
              <div className="col-md-4" key={ele.id}>
                <NormalCardLayout title={ele.title} image={ele.image} />
              </div>
            );
          })}
        </div>
        <div className="row pt-3 align-items-center">
          <div className="col-lg-6">
            <div className="h-100 location-badge">
              <img className="img-fluid w-100" src="http://bussinasia.com/front/img/img-13.png" alt="img" />
              <h3>Opportunity in Pushkar</h3>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="py-3 px-2 ">
              <div className="d-flex align-items-center mb-4 ">
                <div className="polygon-txt">
                  <img
                    className="img-fluid me-4"
                    src="http://bussinasia.com/front/img/Polygon.png"
                    alt="img"
                  />
                  <p>ON THE WAY</p>
                </div>

                <span className="investment-txt">FOR INVESTMENT</span>
              </div>
              <div className="ms-3">
                <h3 className="investment-title">
                  Welcome to Bussinasia - Making Your Way to Inclusive Realty Investments
                </h3>
                <p className="investemt-para">
                  We aim to create an accessible, transparent, and seamless democratized Grade-A
                  commercial real estate participation for our investors. Discover seamless
                  fractional investing through an online platform, complete with end-to-end
                  management. Empowering every investor, we redefine prosperity.
                </p>
                <button className="btn btn-primary mt-4">EXPRESS INTREST</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
