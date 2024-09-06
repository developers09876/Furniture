import { useState, useContext } from 'react';
import { styled } from 'styled-components';
import { DashboardContext } from '../../context/DashboardContext';
import Button from '../../components/Button';
import { currentDate, generateUUID } from '../../utils/helpers';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// styled components
const StyledProducts = styled.div`
  width: 450px;
  margin: 10px 270px;
`;

const AddProduct = () => {
  const categories = [
    { id: "1", cat_name: "Sofa" },
    { id: "2", cat_name: "Chair" },
    { id: "3", cat_name: "Table" },
    { id: "4", cat_name: "Bench" },
  ];

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    quantity_stock: '',
    LongDesc: '',
    offer: '',
    specification: '',
    category: '',
    images: [] // Change from single image to array of images
  });

  const [specifications, setSpecifications] = useState({
    product_Details: {
      feel: "",
      cover_Type: "",
      cover_Material: "",
      matress_Type: "",
      Usability: ""
    },
    product_Dimension: {
      thickness: '',
      dimensions: ''
    },
    product_Policies: {
      Warranty: '',
      Shipping: '',
      available_Offers: '',
      trial: ''
    }
  });

  console.log("Form Data:", formData);
  console.log("Specifications:", specifications);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  const handleSpecificationChange = (event, section, field) => {
    const { value } = event.target;

    setSpecifications((prevSpecs) => ({
      ...prevSpecs,
      [section]: {
        ...prevSpecs[section],
        [field]: value,
      }
    }));
  };

// const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prevForm) => ({
//         ...prevForm,
//         image: reader.result,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    
    // Check the total number of selected images
    if (files.length + formData.images.length > 10) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You can only select up to 10 images.',
      });
      return;
    }

    const newImages = files.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(newImages).then((results) => {
      setFormData((prevForm) => ({
        ...prevForm,
        images: [...prevForm.images, ...results],
      }));
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const { title, description, images, price, discountPrice, category, quantity_stock } = formData;

    // Check if any field is empty
    if (!title || !description || images.length === 0 || !price || !discountPrice || !category || !quantity_stock) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    console.log("FormData", formData);
    console.log("Specifications", specifications);

    // addProduct(formData); // Uncomment when addProduct function is available
    navigate('/dashboard/products');
    setFormData({
      title: '',
      description: '',
      price: '',
      discountPrice: '',
      quantity_stock: '',
      LongDesc: '',
      offer: '',
      specification: '',
      category: '',
      images: []
    });

    setSpecifications({
      product_Details: {
        feel: "",
        cover_Type: "",
        cover_Material: "",
        matress_Type: "",
        Usability: ""
      },
      product_Dimension: {
        thickness: '',
        dimensions: ''
      },
      product_Policies: {
        Warranty: '',
        Shipping: '',
        available_Offers: '',
        trial: ''
      }
    });
  };

  return (
    <StyledProducts style={{width:'100%'}}>
      <h2 className='mb-5'>Add Product</h2>
       <form onSubmit={handleAddProduct} style={{width:'100%'}}>
        <div className='row' style={{width:'100%'}}>
        <div className="form-group fw-bold my-2 col-lg-4">
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
        <div className="form-group fw-bold my-2 col-lg-4">
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

        {/* <div className="form-group">
          <label className="form-label me-3  my-2 fw-bold" htmlFor="customFile">Image :</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && <img className='my-1' src={formData.image} width='200' />}
        </div> */}

        <div className="form-group col-lg-4">
          <label className="form-label me-3 my-2 fw-bold" htmlFor="customFile">Images :</label>
          <input
            type="file"
            className="form-control-file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        
          <p className='my-2 fw-bold'>Total Images Selected: {formData.images.length}</p>
        </div>
        <div className="form-group fw-bold my-2 col-lg-4">
          <label htmlFor="description">Short Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div className="form-group fw-bold my-2 col-lg-4">
          <label htmlFor="description">Long Description:</label>
          <textarea
            className="form-control"
            id="LongDesc"
            name="LongDesc"
            value={formData.LongDesc}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div className="form-group fw-bold my-2 col-lg-4">
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
        <div className="form-group fw-bold my-2 col-lg-4">
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
        <div className="form-group fw-bold my-2 col-lg-4">
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
       
<div className="form-group fw-bold my-2 row">
  <h5><b>Product Details</b></h5>
  <div className="form-group fw-bold my-2 col-lg-4">
    <label htmlFor="feel">Feel:</label>
    <input
      type="text"
      className="form-control"
      id="feel"
      name="feel"
      value={specifications.product_Details.feel}
      onChange={(e) => handleSpecificationChange(e, 'product_Details', 'feel')}
    />
  </div>
  <div className="form-group fw-bold my-2 col-lg-4">
    <label htmlFor="cover_Type">Cover Type:</label>
    <input
      type="text"
      className="form-control"
      id="cover_Type"
      name="cover_Type"
      value={specifications.product_Details.cover_Type}
      onChange={(e) => handleSpecificationChange(e, 'product_Details', 'cover_Type')}
    />
  </div>
  <div className="form-group fw-bold my-2 col-lg-4">
    <label htmlFor="cover_Material">Cover Material:</label>
    <input
      type="text"
      className="form-control"
      id="cover_Material"
      name="cover_Material"
      value={specifications.product_Details.cover_Material}
      onChange={(e) => handleSpecificationChange(e, 'product_Details', 'cover_Material')}
    />
  </div>
  <div className="form-group fw-bold my-2 col-lg-4">
    <label htmlFor="matress_Type">Mattress Type:</label>
    <input
      type="text"
      className="form-control"
      id="matress_Type"
      name="matress_Type"
      value={specifications.product_Details.matress_Type}
      onChange={(e) => handleSpecificationChange(e, 'product_Details', 'matress_Type')}
    />
  </div>
  <div className="form-group fw-bold my-2 col-lg-4">
    <label htmlFor="Usability">Usability:</label>
    <input
      type="text"
      className="form-control"
      id="Usability"
      name="Usability"
      value={specifications.product_Details.Usability}
      onChange={(e) => handleSpecificationChange(e, 'product_Details', 'Usability')}
    />
  </div>
</div>

<div className="form-group fw-bold my-2 row">
  <h5><b>Product Dimensions</b></h5>
  <div className="form-group fw-bold my-2 col-lg-6">
    <label htmlFor="thickness">Thickness:</label>
    <input
      type="text"
      className="form-control"
      id="thickness"
      name="thickness"
      value={specifications.product_Dimension.thickness}
      onChange={(e) => handleSpecificationChange(e, 'product_Dimension', 'thickness')}
    />
  </div>
  <div className="form-group fw-bold my-2 col-lg-6">
    <label htmlFor="dimensions">Dimensions:</label>
    <input
      type="text"
      className="form-control"
      id="dimensions"
      name="dimensions"
      value={specifications.product_Dimension.dimensions}
      onChange={(e) => handleSpecificationChange(e, 'product_Dimension', 'dimensions')}
    />
  </div>
</div>

<div className="form-group fw-bold my-2 row">
  <h5><b>Product Policies</b></h5>
  <div className="form-group fw-bold my-2 col-lg-4">
    <label htmlFor="Warranty">Warranty:</label>
    <input
      type="text"
      className="form-control"
      id="Warranty"
      name="Warranty"
      value={specifications.product_Policies.Warranty}
      onChange={(e) => handleSpecificationChange(e, 'product_Policies', 'Warranty')}
    />
  </div>
  <div className="form-group fw-bold my-2 col-lg-4">
    <label htmlFor="Shipping">Shipping:</label>
    <input
      type="text"
      className="form-control"
      id="Shipping"
      name="Shipping"
      value={specifications.product_Policies.Shipping}
      onChange={(e) => handleSpecificationChange(e, 'product_Policies', 'Shipping')}
    />
  </div>
  <div className="form-group fw-bold my-2 col-lg-4">
    <label htmlFor="available_Offers">Available Offers:</label>
    <input
      type="text"
      className="form-control"
      id="available_Offers"
      name="available_Offers"
      value={specifications.product_Policies.available_Offers}
      onChange={(e) => handleSpecificationChange(e, 'product_Policies', 'available_Offers')}
    />
  </div>
  <div className="form-group fw-bold my-2 col-lg-4">
    <label htmlFor="trial">Trial:</label>
    <input
      type="text"
      className="form-control"
      id="trial"
      name="trial"
      value={specifications.product_Policies.trial}
      onChange={(e) => handleSpecificationChange(e, 'product_Policies', 'trial')}
    />
  </div>
</div>
        <div className="form-group mt-4 " style={{ textAlign:'end'}}>
          <Button type="submit" className="me-2 ">Add Product</Button>
          <Button type="reset">Cancel</Button>
        </div>
        </div>
      </form>
    </StyledProducts>
  );
};

export default AddProduct;
