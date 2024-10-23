import styled from "styled-components";
import amana from "../assets/amana.png";
import ozone from "../assets/ozone.jpg";

const Logo = styled.img`
  width: 150px;
`;

const DeliveryPartners = () => {
  return (
    <div className="container text-center my-5">
      <h2
        // style={{
        //   textDecorationLine: "underline",
        //   textDecorationColor: "#7FAFEB",
        // }}
        className="mb-5"
      >
        Delivery Partners
      </h2>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Logo src={amana} alt="Amana Logo" />
        </div>
        <div className="col-md-6 col-sm-12">
          <Logo src={ozone} alt="Ozone Express Logo" />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartners;
