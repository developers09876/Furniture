import styled from 'styled-components';
import ProductCard from './ProductCard';
import Spinner from './Spinner';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductsList = ({ products }) => {


  return (
    <Wrapper>
      { products.length > 0 ?
        <div className='container'>
        <div className='row'>
     
          {products.map((product) => (
            <div key={product.id} className='col-12 col-md-3 col-lg-3 mb-4'>
              <ProductCard image={product.image} title={product.title} price={product.price} id={product.id} discountPrice={product.discountPrice} description={product.description} LongDesc={product.LongDesc} />
            </div>
          ))}
         
        </div>
      </div>
      : <Spinner />
      }
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
