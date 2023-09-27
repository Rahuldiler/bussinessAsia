import Banner from "newLayout/globalComponents/Banner";
import Layout from "newLayout/globalComponents/Layout";
import "../../../assets/css/home.css";
import React from "react";
import Content from "./content";
import Reality from "./reality";
import Revenue from "./revenue";
import GetInTouch from "./getInTouch";
import Investments from "./investments";

const Home = () => {
  return (
    <Layout>
      <Banner />
      <Content />
      <Reality />
      <Revenue
        title={"Why invest in commercial real estate"}
        subTitle={
          "Unleash the Potential and Explore the Compelling Advantages of Commercial Real Estate Investment"
        }
      />
      <Revenue
        type={2}
        title={"Advantages You Can't-Miss"}
        subTitle={
          "Unveiling a Spectrum of Benefits That Demand Your Attention: to Discover the Unmissable Advantages of Embracing This Investment Opportunity"
        }
      />
      <GetInTouch />
      <Investments />
      
    </Layout>
  );
};

export default Home;
