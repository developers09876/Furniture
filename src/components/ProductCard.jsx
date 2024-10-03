import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import img1 from "../assets/sofa.jpg";
import { Card } from "antd";
import ButtonAnimation from "./ButtonAnimation";
import { useEffect, useState } from "react";
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
  const Wrapper = styled.div`
    .price {
      color: ${(props) => props.theme.mainColor};
      font-size: 1.3rem;
    }
  `;
  return (
    <>
      <Wrapper>
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
            <Meta title={title} description={description.slice(0, 70)} />
            <div
              className="mt-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <s> ₹{price}</s>
              &nbsp;
              <h6 className="price me-2 d-inline">₹{discountPrice}</h6>
            </div>
            {/* {offer}% off */}
            <ButtonAnimation />
          </div>
        </Card>
      </Wrapper>{" "}
    </>
  );
};

export default ProductCard;
