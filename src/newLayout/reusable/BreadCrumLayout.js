import React from "react";
// import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BsChevronRight} from 'react-icons/bs';
import "../../assets/css/breadcrumb.css";
const BreadcrumbLayout = () => {
  return (
    <div className="container breadcrumb_section">
      <div class="row g-5 p-0 m-0">
        <div class="col-md-9 d-flex flex-column justify-content-center p-0">
          <h1 class="first-bannertxt">
            <span class="second-bannertxt">Uniting Investors</span> - Maximizing Gains
          </h1>

          <p class="banner-subtitle">
            Redefining Commercial Real Estate beyond the ordinary, offering innovative and rewarding
            Alternative Investments
          </p>
          <button
            class="learn-more"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <span aria-hidden="true" class="circle">
             <BsChevronRight style={{fontWeight:"bold",color:"#fff"}}/>
            </span>
            <span class="button-text">Invest Now</span>
          </button>
          {/* {breadcrumbValue && (
            <Breadcrumb>
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                Library
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          )} */}
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  );
};

export default BreadcrumbLayout;
