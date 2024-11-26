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
    .ant-card {
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      overflow: hidden;

      &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
      }
    }

    .ant-card-cover img {
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }

    .price {
      color: #ff5a5a;
      font-size: 1.4rem;
      font-weight: bold;
    }

    .discount-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #ff5a5a;
      color: #fff;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 0.9rem;
    }

    .card-btn {
      background-color: #ff5a5a;
      color: white;
      font-weight: bold;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #ff7373;
      }
    }
  `;

  return (
    <Wrapper>
      <Card
        hoverable
        style={{ width: "90%", position: "relative" }}
        cover={
          <img
            alt="example"
            src={image[0]}
            style={{
              height: "250px",
              padding: "10px",
              borderRadius: "20px",
            }}
          />
        }
        onClick={() => {
          navigate(`/products/${id}`);
        }}
      >
        {offer && <div className="discount-badge">{offer}% OFF</div>}
        <Meta title={title} description={description.slice(0, 70)} />
        <div className="price-section mt-3">
          <s>₹{price}</s>
          <h6 className="price">₹{discountPrice}</h6>
        </div>
        <ButtonAnimation className="card-btn" />
      </Card>
    </Wrapper>
  );
};

export default ProductCard;
