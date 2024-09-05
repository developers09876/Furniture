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
  // const { categories, addProduct } = useContext(DashboardContext);
  const categories =[
{
    id:"1",
    cat_name:"Sofa",

    
  },
  {
    id:"2",
    cat_name:"Chair",

  },
  {
    id:"3",
    cat_name:"Table",

  },
  {
    id:"4",
    cat_name:"Bench ",

  },
  ]

  const [specifications , setspecifications ]= useState([ {
    product_Details: {
    feel: "",
    cover_Type: "",
    cover_Material: "",
    matress_Type:
        "",
    Usability:
        ""
    },
    product_Dimension: {
      thickness:'',      dimensions:'',
    },
    product_Policies: {
      Warranty: '',
      Shipping: '',
      available_Offers: '',
      trial: ''
    }
  }])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    // image: '',
    description: '',
    price: '',
    discountPrice: '',
    quantity_stock: '',
    LongDesc: '',
    offer:'',
    specification:'',
    category:''
  });

  console.log("formData",formData);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevForm) => ({
        ...prevForm,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const { title, description, image, price, old_price, category, quantity_stock } = formData
    
    // Check if any field is empty
    if (!title || !description || !image || !price || !old_price || !category || !quantity_stock) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
      }); 
      return;
    }

    console.log(formData);
    // addProduct(formData);
    navigate('/dashboard/products')
    setFormData({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    quantity_stock: '',
    LongDesc: '',
    offer:'',
    specification:[{}],
    category:''
    });
  };

  return (
    <StyledProducts>
      <h2 className='mb-5'>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <div className="form-group fw-bold my-2">
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
        <div className="form-group fw-bold my-2">
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
        <div className="form-group">
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
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="description">Short Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="description">Long Description:</label>
          <textarea
            className="form-control"
            id="LongDesc"
            name="LongDesc"
            value={formData.LongDesc}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div className="form-group fw-bold my-2">
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
        <div className="form-group fw-bold my-2">
          <label htmlFor="old_price">discount Price:</label>
          <input
            type="number"
            className="form-control"
            id="discountPrice"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
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
        <div className="form-group fw-bold my-2">
          <label htmlFor="quantity_stock">specification:</label>
          <input
            type="number"
            className="form-control"
            id="specification"
            name="specification"
            value={specifications}
            onChange={handleFormChange}
          />
        </div>
        {/* <div className="form-check fw-bold my-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleFormChange}
          />
          <label className="form-check-label fw-bold mx-2" htmlFor="featured">
            Featured
          </label>
        </div> */}
        <div className="form-group mt-4">
          <Button type="submit" className="me-2">Add Product</Button>
          <Button type="reset">Cancel</Button>
        </div>
      </form>
    </StyledProducts>
  );
};

export default AddProduct;