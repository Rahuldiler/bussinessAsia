import React from "react";
import styled from "styled-components";
const LayoutWrapper = styled.div`
  background-color: #e7e7e7;
  padding: 3rem;
  h5 {
    color: #3a3a3a;
    font-size: 25px;
    font-weight: 700;
    line-height: 40px;
  }
  h6{
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 34px;
    color: #3A3A3A;
  }
  p {
    color: #3a3a3a;
    font-size: 14px;
    font-weight: 500;
    line-height: 30px;
  }
  li {
    font-size: 14px;
    font-weight: 500;
    color: #3a3a3a;
    a {
      font-size: 14px;
      font-weight: 500;
      color: #3a3a3a;
      text-decoration: none;
      line-height: 25px;
    }
  }
  span {
    color: #3a3a3a;
    font-size: 14px;
    font-weight: 500;
  }
  .subscribe-btn {
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    width: 150px;
  }
`;
const Footer = () => {
  return(
    <LayoutWrapper>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div>
            <h5 className="mb-3">Contact Us</h5>
            <p>
              Connect with us today to embark <br /> on a journey toward prosperous <br />
              investments
            </p>
            <ul className="list-unstyled">
              <li className="mb-3">
                <p>
                  <i className="bx bx-location-plus me-1"></i> 121, Vishal tower, janakpuri Puri West
                  <br /> New Delhi 110058
                </p>
              </li>
              <li>
                <i className="bx bx-envelope"></i> contact@Bussinasia.com
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <h5 className="mb-4">Quick Links</h5>
          <div className="row">
            <div className="col-md-6">
              <div>
                <ul className="list-unstyled ">
                  <li>
                    <a href="http://bussinasia.com">Home</a>
                  </li>
                  <li>
                    <a href="http://bussinasia.com/about-us">About</a>
                  </li>
                  <li>
                    <a href="http://bussinasia.com/coming-soon">Properties</a>
                  </li>
                  <li>
                    <a href="http://bussinasia.com/coming-soon">Our Project</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <ul className="list-unstyled">
                  <li>
                    <a href="http://bussinasia.com/coming-soon">FAQ</a>
                  </li>
                  <li>
                    <a href="http://bussinasia.com/coming-soon">Insights</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div>
            <h5 className="mb-4">Call Us Now</h5>
            <p className="mb-2 footer-contact-no">+91 11 4208 3208</p>
            <span className="ms-1">Best Investment Properties</span>
          </div>
        </div>
      </div>
      <div className="row pt-5 ">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-8">
              <div>
                <h6>Subscribe to Our Newsletter</h6>
                <form className="d-flex">
                  <input
                    type="email"
                    className="form-control rounded-0"
                    placeholder="Enter your email"
                  />
                  <button className="btn-primary subscribe-btn" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center mt-5 mt-lg-0  ">
          <div>
            <h5>
              Follow Us On
            </h5>
            <ul className="list-unstyled d-flex gap-4 justify-content-center">
              <li>
                <a href="" target="_blank">
               
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </LayoutWrapper>
  )

};

export default Footer;
