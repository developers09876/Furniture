import { useState, useContext, useEffect } from "react";
import { styled } from "styled-components";
import { DashboardContext } from "../../context/DashboardContext";
import Button from "../../components/Button";
import { currentDate, generateUUID } from "../../utils/helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "antd";

// styled components
const StyledCategories = styled.div`
  width: 450px;
  margin: 5px 10px;
`;

const AddCategory = () => {
  const { addCategory } = useContext(DashboardContext);
  const navigate = useNavigate();

  const handleAddCategoy = async (e) => {
    e.preventDefault();
    setResponseMessage("");

    const { name, description } = formData;

    if (!name || !description) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    console.log(formData);
    addCategory(formData);
    navigate("/admin/categories");
    setFormData({
      id: "",
      name: "",
      description: "",
      created_at: "",
      updated_at: null,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_MY_API}Category`);
      const result = await response.json();
      setCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_MY_API}Category/`);
      category(res.data);
    } catch (error) { }
  };
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_MY_API}Category/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        fetchCategoriesData();
        navigate("/admin/categories");
        setFormData({
          name: "",
          description: "",
        });

        setResponseMessage(`Category added: ${result.name}`);

        setCategories((prevCategories) => [...prevCategories, result]);
      } else {
        setResponseMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage("An error occurred while adding the category.");
    }
  };

  return (
    <>
      <form onSubmit={handleAddCategory}>
        <div className="form-group fw-bold my-2">
          <label htmlFor="title">Name :</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="description">Description :</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div className="form-group mt-4">
            {/* <Button type="reset" className="me-2">
              Cancel
            </Button> */}

            <Button type="submit">Add Category</Button>

          </div>
        </div>
      </form>

      {/* Display the response from the backend */}
      {/* {responseMessage && (
        <div className="mt-4 alert alert-info">{responseMessage}</div>
      )} */}
    </>
  );
};
export default AddCategory;
