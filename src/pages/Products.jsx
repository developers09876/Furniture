import axios from "axios";
import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "../components/Breadcrumb";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

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
  outline: 1px solid var(--button-hover);
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
  const location = useLocation();
  const locationData = location?.state?.category || "";
  const [query, setQuery] = useState("");
  console.log("queryquery", query);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Fetch products from the backend

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MY_API}products/`
      );
      setProducts(response.data);

      // const productFilter = locationData
      //   ? response.data.filter((product) => product.category === locationData)
      //   : response.data;

      setFilteredProducts(productFilter);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setQuery(query);

    let filtered = products;

    if (locationData) {
      filtered = products.filter(
        (product) => product.category === locationData
      );
    }

    if (query) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [locationData]);

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
              onChange={handleSearch}
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
        <ProductsList products={filteredProducts} />
      </ResultsSection>
    </Container>
  );
};

export default Products;
