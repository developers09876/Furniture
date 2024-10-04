import axios from "axios";
import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "../components/Breadcrumb";
import { Row, Col } from "react-bootstrap";
import { DashboardContext } from "../context/DashboardContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom"
// Styled Components
const Container = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Title = styled.h1`
  max-width: 55rem;
  margin: 0 auto;
`;

const ResultsSection = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const QueryText = styled.h3`
  color: ${(props) => props.theme.mainColor};
`;

const SearchContainer = styled.div`
  width: 270px;
  margin: 0 auto;
  position: relative;
  text-align: center;
`;

const StyledInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 3rem;
  // outline: 1px solid transparent;
  outline: 1px solid var(--button-hover);
  // border: 1px solid ${(props) => props.theme.borderColor};
  border: 1px solid var(--button-hover);
  border-radius: ${(props) => props.theme.radius};
  margin-right: 10px;
  width: 100%;

  &:focus {
    outline: 1px solid ${(props) => props.theme.borderColor};
    border-radius: ${(props) => props.theme.radius};
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 20px;
  top: 13px;
  color: ${(props) => props.theme.mutedTextColor};
`;

const Products = () => {

  // const [products, setProducts] = useState([
  //   // {
  //   //   image: img1,
  //   //   title: "SOFA",
  //   //   id: "1",
  //   //   price: "5000",
  //   //   discountPrice: "4000",
  //   //   description: "Comfortable Sofa",
  //   //   LongDesc:
  //   //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
  //   //   offer: "50",
  //   //   quantity_stock:"5"
  //   // },
  //   // {
  //   //   image: img2,
  //   //   title: "chair",
  //   //   id: "3",
  //   //   price: "5000",
  //   //   discountPrice: "4000",
  //   //   description: "Comfortable Chair",
  //   //   LongDesc:
  //   //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
  //   //   offer: "50",
  //   //   quantity_stock:"5"
  //   // },
  //   // {
  //   //   image: img3,
  //   //   title: "Bed",
  //   //   id: "4",
  //   //   price: "5000",
  //   //   discountPrice: "4000",
  //   //   description: "Comfortable Sofa",
  //   //   LongDesc:
  //   //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
  //   //   offer: "80",
  //   //   quantity_stock:"5"
  //   // },
  //   // {
  //   //   image: img2,
  //   //   title: "Bed4",
  //   //   id: "2",
  //   //   price: "5000",
  //   //   discountPrice: "4000",
  //   //   LongDesc:
  //   //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
  //   //   description: "Comfortable Sofa",
  //   //   offer: "20",
  //   //   quantity_stock:"5"
  //   // },
  //   // {
  //   //   image: img3,
  //   //   title: "5Bed",
  //   //   id: "5",
  //   //   price: "55000",
  //   //   discountPrice: "54000",
  //   //   description: "Comfortable Sofa",
  //   //   LongDesc:
  //   //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut architecto, harum accusamus illo commodi optio, quae sint a maiores quis dolorum nostrum explicabo eveniet numquam eligendi repellat consequatur quasi nesciunt officiis laborum recusandae odio. Iste, totam omnis. Ut ipsa praesentium ratione libero, reprehenderit nesciunt, nemo esse accusamus perferendis illo quas!",
  //   //   offer: "520",
  //   //   quantity_stock:"5"
  //   // },
  // ]);

  const { users, orders } = useContext(DashboardContext);
  // console.log("category", category)
  const [query, setQuery] = useState("");

  const location = useLocation()
  const locationData = location?.state.category
  console.log("locationData", locationData)

  const [categorys, setCategory] = useState(locationData);
  const [products, setProducts] = useState("");
  const [productsFilter, setProductsFilter] = useState("");


  // console.log('locationData', locationData)
  useEffect(() => {
    fetchProducts();
  }, [locationData]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/`);
      console.log("productFilterresponse", response);

      // Filter the products before setting them in state
      const productFilter = response.data.filter((res) => res.category === locationData);

      console.log("productFilter", productFilter);


      // Set the products in state
      setProducts(response.data);
      setProductsFilter(productFilter);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (locationData) {
      setCategory(locationData);
    }
  }, [locationData]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  // Filter products based on the query

  // const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(query.toLowerCase())
  // );
  // console.log("filteredProducts", filteredProducts)
  // if (category) {
  //   console.log('category', category)
  //   return product.category.toLowerCase() === category.toLowerCase();
  // } else {
  //   return true;
  // }


  return (
    <Container>
      <Breadcrumb />
      <Row>
        <Col md={6} sm={12}>
          <h3 style={{ textAlign: "end" }} className="mt-4">
            All Products
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "15px",
            }}
          >
            <div
              style={{
                backgroundColor: `var(--button-hover)`,
                padding: "1px 1px 3px 3px",
                width: "20%",
                display: "flex",
                flexDirection: "revert",
              }}
            ></div>
          </div>
        </Col>
        <Col md={6} sm={12}>
          <SearchContainer className="my-4">
            <StyledInput
              type="text"
              placeholder="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchIcon icon={faSearch} className="text-muted" />
          </SearchContainer>
        </Col>
      </Row>

      <ResultsSection>
        {query && (
          <h6>
            Results For: <strong className="text-muted">{query}</strong>
          </h6>
        )}
        <ProductsList products={productsFilter} />
      </ResultsSection>
    </Container>
  );
};

export default Products;
