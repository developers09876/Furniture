import { useState, useContext } from "react";
import { styled } from "styled-components";
import { DashboardContext } from "../../context/DashboardContext";
import Button from "../../components/Button";
import { currentDate, generateUUID } from "../../utils/helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// styled components
const StyledProducts = styled.div`
  width: 450px;
  margin: 10px 270px;
`;

const AddProduct = () => {
  const [selectedImages, setSelectedImages] = useState([])
  const categories = [
    { id: "1", cat_name: "Sofa" },
    { id: "2", cat_name: "Chair" },
    { id: "3", cat_name: "Table" },
    { id: "4", cat_name: "Bench" },
  ];

  const navigate = useNavigate();

  // Initialize formData with specifications as an array of objects
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    quantity_stock: "",
    LongDesc: "",
    offer: "",
    category: "",
    images: [],
    specifications: [
      {
        product_Details: {
          feel: "",
          cover_Type: "",
          cover_Material: "",
          matress_Type: "",
          Usability: "",
          dynamicFields: [{ title: "", description: "" }],
        },
        product_Dimension: {
          thickness: "",
          dimensions: "",
        },
        product_Policies: {
          Warranty: "",
          Shipping: "",
          available_Offers: "",
          trial: "",
        },
      },
    ],
  });

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  const handleSpecificationChange = (event, section, field) => {
    const { value } = event.target;
    setFormData((prevForm) => {
      const updatedSpecifications = [...prevForm.specifications];
      updatedSpecifications[0][section][field] = value;
      return { ...prevForm, specifications: updatedSpecifications };
    });
  };
  const handleImageChange = (e) => {
    setSelectedImages(e.target.files); // Store the selected files
  };

  // Upload images to Cloudinary and get URLs
  const uploadImages = async () => {
    const uploadedImages = [];

    for (const image of selectedImages) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'Furniture'); // Replace with your Cloudinary upload preset

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dk6vgylx3/image/upload', // Replace with your Cloudinary URL
          {
            method: 'POST',
            body: data,
          }
        );
        const cloudinaryData = await response.json();
        uploadedImages.push(cloudinaryData.secure_url); // Collect the URL
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    return uploadedImages;
  };

  //   const handleImageChange = (event) => {
//     console.log(event.target)
//     const files = Array.from(event.target.files);
// console.log('files', files)
//     if (formData.images && files.length + formData.images.length > 10) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "You can only select up to 10 images.",
//       });
//       return;
//     }

 
 

//     Promise.all(newImages).then((results) => {
//       setFormData((prevForm) => ({
//         ...prevForm,
//         images: [...prevForm.images, ...results],
//       }));
//     });
//   };
  const handleDynamicInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSpecifications = [...formData.specifications];
    const updatedDynamicFields = [
      ...updatedSpecifications[0].product_Details.dynamicFields,
    ];
    updatedDynamicFields[index][name] = value;
    updatedSpecifications[0].product_Details.dynamicFields =
      updatedDynamicFields;
    setFormData({ ...formData, specifications: updatedSpecifications });
  };

  const handleDynamicRemoveClick = (index) => {
    const updatedSpecifications = [...formData.specifications];
    const updatedDynamicFields = [
      ...updatedSpecifications[0].product_Details.dynamicFields,
    ];
    updatedDynamicFields.splice(index, 1);
    updatedSpecifications[0].product_Details.dynamicFields =
      updatedDynamicFields;
    setFormData({ ...formData, specifications: updatedSpecifications });
  };

  const handleDynamicAddClick = () => {
    const updatedSpecifications = [...formData.specifications];
    updatedSpecifications[0].product_Details.dynamicFields.push({
      title: "",
      description: "",
    });
    setFormData({ ...formData, specifications:JSON.stringify( updatedSpecifications) });
  };

  console.log("form data:", formData);

  const addProduct = async () => {
 
    const imageUrls = await uploadImages();

    // Add uploaded image URLs to form data
    const updatedFormData = {
      ...formData,
      images: imageUrls,
    };
    
    try {
      axios
        .post("http://localhost:5000/products/create", updatedFormData)
        .then((res) => {
          if (res.status === 200) {
            alert("inside");
            // navigate('/admin/products');
          } else {
            throw new Error("Failed to add product");
          }
        });
      console.log("demo:", formData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add product. Please try again.",
      });
      console.error("API Error:", error);
    }
  };

  return (
    <StyledProducts style={{ width: "100%" }}>
      <h2 className="mb-5">Add Product</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addProduct();
        }}
        style={{ width: "100%" }}
      >
        <div className="row" style={{ width: "100%" }}>
          {/* Form Fields */}
          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <label htmlFor="title">Title :</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <label htmlFor="category">Category :</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.cat_name}>
                  {category.cat_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-lg-4 col-md-6">
            <label
              className="form-label me-3 my-2 fw-bold"
              htmlFor="customFile"
            >
              Images :
            </label>
            <input
              type="file"
              className="form-control-file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={(e)=>{handleImageChange(e)}}
            />
            <p className="my-2 fw-bold">
              Total Images Selected: {formData.images.length}
            </p>
          </div>
          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <label htmlFor="description">Short Description:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            ></textarea>
          </div>
          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <label htmlFor="description">Long Description:</label>
            <textarea
              className="form-control"
              id="LongDesc"
              name="LongDesc"
              value={formData.LongDesc}
              onChange={handleFormChange}
            ></textarea>
          </div>
          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <label htmlFor="discountPrice">Discount Price:</label>
            <input
              type="number"
              className="form-control"
              id="discountPrice"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
            <label htmlFor="quantity_stock">Quantity in Stock:</label>
            <input
              type="number"
              className="form-control"
              id="quantity_stock"
              name="quantity_stock"
              value={formData.quantity_stock}
              onChange={handleFormChange}
            />
          </div>

          {/* Specifications Section */}
          <div className="form-group fw-bold my-2 row mt-5">
            <h4 style={{ textAlign: "center" }}>
              <b>Specifications</b>
            </h4>
            <hr />
            <div className="form-group fw-bold my-2 row mt-5">
              <h5>
                <b>Product Details</b>
              </h5>
              {/* Specification fields using handleSpecificationChange */}
              <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                <label htmlFor="feel">Feel:</label>
                <input
                  type="text"
                  className="form-control"
                  id="feel"
                  name="feel"
                  value={formData.specifications[0].product_Details.feel}
                  onChange={(e) =>
                    handleSpecificationChange(e, "product_Details", "feel")
                  }
                />
              </div>

              <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                <label htmlFor="cover_Type">Cover Type:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cover_Type"
                  name="cover_Type"
                  value={formData.specifications[0].product_Details.cover_Type}
                  onChange={(e) =>
                    handleSpecificationChange(
                      e,
                      "product_Details",
                      "cover_Type"
                    )
                  }
                />
              </div>

              <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                <label htmlFor="cover_Material">Cover Material:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cover_Material"
                  name="cover_Material"
                  value={
                    formData.specifications[0].product_Details.cover_Material
                  }
                  onChange={(e) =>
                    handleSpecificationChange(
                      e,
                      "product_Details",
                      "cover_Material"
                    )
                  }
                />
              </div>

              <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                <label htmlFor="matress_Type">Mattress Type:</label>
                <input
                  type="text"
                  className="form-control"
                  id="matress_Type"
                  name="matress_Type"
                  value={
                    formData.specifications[0].product_Details.matress_Type
                  }
                  onChange={(e) =>
                    handleSpecificationChange(
                      e,
                      "product_Details",
                      "matress_Type"
                    )
                  }
                />
              </div>

              <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                <label htmlFor="Usability">Usability:</label>
                <input
                  type="text"
                  className="form-control"
                  id="Usability"
                  name="Usability"
                  value={formData.specifications[0].product_Details.Usability}
                  onChange={(e) =>
                    handleSpecificationChange(e, "product_Details", "Usability")
                  }
                />
              </div>
              <div>
                {/* Dynamic Input Fields */}
                {formData.specifications[0].product_Details.dynamicFields.map(
                  (x, i) => (
                    <div className="row mb-3" key={i}>
                      <div className="form-group col-md-4">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          placeholder="Enter Title"
                          value={x.title}
                          onChange={(e) => handleDynamicInputChange(e, i)}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label>Description</label>
                        <textarea
                          name="description"
                          className="form-control"
                          placeholder="Enter Description"
                          value={x.description}
                          onChange={(e) => handleDynamicInputChange(e, i)}
                        />
                      </div>
                      <div className="form-group col-md-2 mt-4">
                        {formData.specifications[0].product_Details
                          .dynamicFields.length !== 1 && (
                          <button
                            className="btn btn-danger mx-1 my-1"
                            onClick={() => handleDynamicRemoveClick(i)}
                          >
                            Remove
                          </button>
                        )}
                        {formData.specifications[0].product_Details
                          .dynamicFields.length -
                          1 ===
                          i && (
                          <button
                            className="btn btn-primary mx-1"
                            onClick={handleDynamicAddClick}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="form-group fw-bold my-2 row">
                <h5>
                  <b>Product Dimensions</b>
                </h5>
                <div className="form-group fw-bold my-2 col-lg-6 col-md-6">
                  <label htmlFor="thickness">Thickness:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="thickness"
                    name="thickness"
                    value={
                      formData.specifications[0].product_Dimension.thickness
                    }
                    onChange={(e) =>
                      handleSpecificationChange(
                        e,
                        "product_Dimension",
                        "thickness"
                      )
                    }
                  />
                </div>

                <div className="form-group fw-bold my-2 col-lg-6 col-md-6">
                  <label htmlFor="dimensions">Dimensions:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dimensions"
                    name="dimensions"
                    value={
                      formData.specifications[0].product_Dimension.dimensions
                    }
                    onChange={(e) =>
                      handleSpecificationChange(
                        e,
                        "product_Dimension",
                        "dimensions"
                      )
                    }
                  />
                </div>
              </div>
              <div className="form-group fw-bold my-2 row">
                <h5>
                  <b>Product Policies</b>
                </h5>
                <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                  <label htmlFor="Warranty">Warranty:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Warranty"
                    name="Warranty"
                    value={formData.specifications[0].product_Policies.Warranty}
                    onChange={(e) =>
                      handleSpecificationChange(
                        e,
                        "product_Policies",
                        "Warranty"
                      )
                    }
                  />
                </div>

                <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                  <label htmlFor="Shipping">Shipping:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Shipping"
                    name="Shipping"
                    value={formData.specifications[0].product_Policies.Shipping}
                    onChange={(e) =>
                      handleSpecificationChange(
                        e,
                        "product_Policies",
                        "Shipping"
                      )
                    }
                  />
                </div>

                <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                  <label htmlFor="available_Offers">Available Offers:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="available_Offers"
                    name="available_Offers"
                    value={
                      formData.specifications[0].product_Policies
                        .available_Offers
                    }
                    onChange={(e) =>
                      handleSpecificationChange(
                        e,
                        "product_Policies",
                        "available_Offers"
                      )
                    }
                  />
                </div>

                <div className="form-group fw-bold my-2 col-lg-4 col-md-6">
                  <label htmlFor="trial">Trial:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="trial"
                    name="trial"
                    value={formData.specifications[0].product_Policies.trial}
                    onChange={(e) =>
                      handleSpecificationChange(e, "product_Policies", "trial")
                    }
                  />
                </div>
              </div>
            </div>
            <div className="form-group mt-4 " style={{ textAlign: "end" }}>
              <Button type="submit" className="me-2">
                Submit
              </Button>
              <Button type="reset" onClick={()=>{navigate(-1)}}>Cancel</Button>
            </div>
          </div>
        </div>
      </form>
    </StyledProducts>
  );
};

export default AddProduct;
