import React from "react";
import PropTypes from "prop-types";
import img1 from "../../../assets/images/website/revenue.png";
import img2 from "../../../assets/images/website/revenue2.png";
import img3 from "../../../assets/images/website/revenue4.png";
import img4 from "../../../assets/images/website/revenue3.png";
import advantage1 from "../../../assets/images/website/advantage1.png";
import advantage2 from "../../../assets/images/website/advantage2.png";
import advantage3 from "../../../assets/images/website/advantage3.png";
import CardLayoutMain from "newLayout/reusable/CardLayoutMain";
import RadiusCardLayout from "newLayout/reusable/RadiusCardLayout";
const cardArray = [
  {
    id: 1,
    title: "Steady source of revenue",
    image: img1,
  },
  {
    id: 2,
    title: "Long-term wealth accumulation",
    image: img2,
  },
  {
    id: 3,
    title: "Control Over Value",
    image: img3,
  },
  {
    id: 4,
    title: "Continuous Monthly Income",
    image: img4,
  },
];
const cardArray2 = [
  {
    id: 1,
    title: "Stable Income Stream",
    sub_title:"Real estate investment offers a reliable and consistent source of income through rental payments. This steady cash flow not only covers expenses but also ensures a passive income stream for investors, contributing to their financial stability.",
    image: advantage1,
  },
  {
    id: 2,
    title: "Appreciation Potential",
    sub_title:"Real estate properties often appreciate over time, leading to potential capital gains. This appreciation can result from factors such as location, market trends, and property improvements, enhancing the overall return on investment.",
    image: advantage2,
  },
  {
    id: 3,
    title: "Diversification and Tangible Asset",
    sub_title:"Real estate offers diversification benefits as it doesn't always correlate with stock market movements. Additionally, properties are tangible assets, providing a sense of security and control for investors who value physical ownership.",
    image: advantage3,
  },
];
const Revenue = ({ title, subTitle, type }) => {
  console.log(type);
  return (
    <div className="for_invest_wrapper revenue_box padding_box">
      <div className="container">
        <div class="text-center">
          <h1 class="invest-border">{title}</h1>
          <p>{subTitle}</p>
        </div>
        {type === 2 ? (
             <div className="row mt-4 mb-2 g-5">
             {cardArray2.map((ele) => {
               return (
                 <div className="col-md-4" key={ele.id}>
                   <RadiusCardLayout title={ele.title} subTitle={ele.sub_title} image={ele.image} />
                 </div>
               );
             })}
           </div>
        
        ) : (
            <div className="row mt-4 mb-2 g-5">
            {cardArray.map((ele) => {
              return (
                <div className="col-lg-3" key={ele.id}>
                  <CardLayoutMain title={ele.title} image={ele.image} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
Revenue.propTypes = {
  type: PropTypes.number.isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default Revenue;
