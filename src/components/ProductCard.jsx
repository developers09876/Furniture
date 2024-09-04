import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";

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
  LongDesc
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
            src={image}
            style={{ height: "250px", padding: "10px" }}
          />
        }
        onClick={() => {
          navigate(`/products/${id}`);
        }}
      >
        <div style={{ height: "auto" }}>
          <Meta title={title} description={description} />
          <div style={{display:"flex" , justifyContent:"center"}}>
          <s>₹{price}</s>
            <p style={{ fontWeight: 'bold' }}>₹{discountPrice}</p> 
          </div>
          {/* {offer}% off */}
        </div>
      </Card>
    </>
  );
};

// const Wrapper = styled.article`
//   .container {
//     position: relative;
//     border-radius: ${(props) => props.theme.radius};
//     overflow: hidden;
//     width: 100%;
//   }

//   .img {
//     display: block;
//     height: 60vh;
//     border-radius: ${(props) => props.theme.raduis};
//     transition: ${(props) => props.theme.transition};
//     overflow: hidden;
//   }

//     svg {
//       font-size: 1.25rem;
//       color: ${(props) => props.theme.mainColor};
//     }
//   }

//   .container:hover img {
//     opacity: 0.5;
//     transform: scale(1.06);
//     transition: transform 0.9s ease;
//     transition: transform 0.5s ease-in-out;
//     border-radius: 15px;
//     width: 100%;
//     overflow: hidden;
//   }

//   .container:hover .link {
//     opacity: 1;
//   }

//   footer {
//     margin-top: 1rem;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }

//   footer h5,
//   footer p {
//     padding: 0 0.7rem;
//     margin-bottom: 0;
//   }

//   footer p {
//     color: ${(props) => props.theme.mainColor};
//     letter-spacing: 2px;
//   }
// `;

export default ProductCard;
