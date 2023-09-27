import React from "react";
import realityImage from "../../../assets/images/website/reality.png";

const Reality = () => {
  return (
    <section>
      <div class="realty-investments investment-bg padding_box">
        <div>
          <div class="container  py-5 px-3">
            <div class="row">
              <div class="col-md-6 welcome-containt pb-3">
                <h3 class="mb-4 ">Why Pushkar?</h3>
                <p class="mb-3">
                  Explore a rewarding investment with Bussinasia as we introduce an exceptional
                  hotel property in Pushkar—a city celebrated for spirituality, vibrant culture, and
                  captivating landscapes.
                </p>
                <p class="mb-3">
                  extensive research designates Pushkar as an optimal investment location due to its
                  year-round allure for tourists and pilgrims, guaranteeing a consistent influx of
                  potential guests. With its rich heritage, bustling markets, and renowned Camel
                  Fair, this investment not only assures an attractive ROI but also a gratifying
                  contribution to Pushkar unique growth story.
                </p>
                <h6 style={{fontSize:"18px"}}>
                  Join us in capitalizing on this golden opportunity within Pushkar flourishing
                  hospitality market.
                </h6>
              </div>
              <div class="col-md-6">
                <img
                  class="img-fluid welcome position-relative"
                  src={realityImage}
                  alt="realityImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reality;
