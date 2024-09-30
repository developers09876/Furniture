import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import img1 from "../assets/sofa.jpg";
import { Card } from "antd";
const { Meta } = Card;
const ProductCard = ({
  image,
  title,
  id,
  price,
  discountPrice,
  description,
  offer,
  LongDesc,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        hoverable
        style={{
          width: "90%",
        }}
        cover={
          <img
            alt="example"
            src={image[0]}
            style={{ height: "250px", padding: "10px", borderRadius: "20px" }}
          />
        }
        onClick={() => {
          navigate(`/products/${id}`);
        }}
      >
        <div style={{ height: "auto" }}>
          <Meta title={title} description={description} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <s>₹{price}</s> 
       &nbsp;
            <p style={{ fontWeight: "bold" }}>₹{discountPrice}</p>
          </div>
          {/* {offer}% off */}
        </div>
      </Card>
    </>
  );
};


export default ProductCard;
