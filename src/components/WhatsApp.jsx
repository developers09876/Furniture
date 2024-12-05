import React from "react";
import styled from "styled-components";
import WhatsAppIcon from "../assets/whatsApp.png";

const whatsAppClick = () => {
  const whatsAppURL =
    "http://wa.me/9108559999? text=Welcome%20to%20Restropedic%20Furniture..";
  window.open(whatsAppURL, "_blank");
};
const WhatsApp = () => {
  return (
    <div
      onClick={() => whatsAppClick()}
      style={{
        display: "flex",
        position: "fixed",
        bottom: "80px",
        right: "30px",
        width: "60px",
        height: "90px",
        justifyContent: "center",
        cursor: "pointer",
      }}
      title="Contact us on WhatsApp"
    >
      <img
        style={{ width: "120px", height: "100px", cursor: "pointer" }}
        src={WhatsAppIcon}
        alt="Whats_App"
      />
    </div>
  );
};
export default WhatsApp;
