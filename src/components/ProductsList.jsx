import styled from "styled-components";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";

const ProductsList = ({ products }) => {
  return (
    <Wrapper>
      {products.length > 0 ? (
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div
                key={product.productId}
                className="col-12 col-md-3 col-lg-3 mb-4"
              >
                <ProductCard
                  image={product.images}
                  title={product.title}
                  price={product.price}
                  id={product.productId}
                  discountPrice={product.discountPrice}
                  description={product.description}
                  LongDesc={product.LongDesc}
                  offer={product.offer}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h5
          style={{
            color: "#555",
            fontSize: "18px",
            textAlign: "center",
            marginTop: "20px",
            fontStyle: "italic",
            fontWeight: "400",
          }}
        >
          Nothing found
        </h5>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    max-height: 250px;
    // border: 1px solid ${(props) => props.theme.borderColor};
    // border-radius: ${(props) => props.theme.raduis};
  }
`;

export default ProductsList;
