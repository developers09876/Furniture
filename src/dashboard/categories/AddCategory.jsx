import { useState, useContext, useEffect } from "react";
import { styled } from "styled-components";
import { DashboardContext } from "../../context/DashboardContext";
import Button from "../../components/Button";
import { currentDate, generateUUID } from "../../utils/helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// styled components
const StyledCategories = styled.div`
  width: 450px;
  margin: 5px 10px;
`;

const AddCategory = () => {
  const { addCategory } = useContext(DashboardContext);
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   id: generateUUID(),
  //   name: "",
  //   description: "",
  //   created_at: currentDate(),
  //   updated_at: null,
  // });

  // const handleFormChange = (event) => {
  //   const { name, value } = event.target;

  //   setFormData((prevForm) => ({
  //     ...prevForm,
  //     [name]: value,
  //   }));
  // };

  const handleAddCategoy = async (e) => {
    e.preventDefault();
    setResponseMessage("");

    const { name, description } = formData;

    // Check if any field is empty
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

  // const loginUser = async (email, password) => {
  //   console.log("emailzzuser", email, password);

  // const res = await axios.post(
  //   'http://localhost:5000/Category/create',

  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )

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
      const response = await fetch("http://localhost:5000/Category");
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

  // const handleAddCategory = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:5000/Category/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       // Handle successful response
  //       setResponseMessage(`Category added: ${result.name}`);
  //       fetchCategories();
  //       setFormData({
  //         name: "",
  //         description: "",
  //       });
  //     } else {
  //       // Handle error response
  //       setResponseMessage(`Error: ${result.message}`);
  //     }
  //   } catch (error) {
  //     setResponseMessage("An error occurred while adding the category.");
  //   }
  // };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/Category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        // Reset form fields
        setFormData({
          name: "",
          description: "",
        });

        // Display success message
        setResponseMessage(`Category added: ${result.name}`);

        // Immediately update the categories list in the frontend
        setCategories((prevCategories) => [...prevCategories, result]); // Append the new category to the existing list
      } else {
        setResponseMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage("An error occurred while adding the category.");
    }
  };

  return (
    // <StyledCategories>
    //   <h2 className="mb-5">Add Category</h2>
    //   <form onSubmit={handleAddCategoy}>
    //     <div className="form-group fw-bold my-2">
    //       <label htmlFor="title">Name :</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="title"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleFormChange}
    //       />
    //     </div>
    //     <div className="form-group fw-bold my-2">
    //       <label htmlFor="description">Description :</label>
    //       <textarea
    //         className="form-control"
    //         id="description"
    //         name="description"
    //         value={formData.description}
    //         onChange={handleFormChange}
    //       ></textarea>
    //     </div>
    //     <div className="form-group mt-4">
    //       <Button type="submit" className="me-2">
    //         Add Category
    //       </Button>
    //       <Button type="reset">Cancel</Button>
    //     </div>
    //   </form>
    // </StyledCategories>

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
            <Button
              type="reset"
              className="me-2"
              onCancel={() => setCategoriesModel(false)}
            >
              Cancel
            </Button>

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
