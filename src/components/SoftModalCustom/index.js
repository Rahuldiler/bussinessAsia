import React,{useEffect} from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Container from "@mui/material/Container";
import SuiTypography from "components/SuiTypography";
import {isMobile} from 'react-device-detect';
export const SuiModalCustom = ({ modalShow, handleModalClose, size = "lg", title, children }) => {
  let ModalHeightStyle = {
    maxHeight: "calc(115vh - 210px)",
    overflowY: "auto",   
    background:"#fafafa"  
  };
  
  useEffect(()=>{
    const modalElem = document.getElementsByClassName("modal-content");
    if(modalElem.length > 1){
      if(modalShow && modalElem.length > 1){
         modalElem[(modalElem.length -2)].style.visibility = "hidden"
      }else{
          modalElem[(modalElem.length -2)].style.visibility = "visible";
      }

    }
  },[modalShow]);

  return (
    <Modal show={modalShow} onHide={handleModalClose} size={size} className="demo">
      <Modal.Header closeButton>
        <Modal.Title>
          <SuiTypography variant="h6" style={{color:"#FFFFFF",padding:"0px !important"}}>{title}</SuiTypography>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="show-grid"
        style={ModalHeightStyle}
      >
        <Container style={{
          background:"#fafafa"
        }}>{children}</Container>
      </Modal.Body>
      <Modal.Footer style={{ background:"#fafafa"}}></Modal.Footer>
    </Modal>
  );
};
