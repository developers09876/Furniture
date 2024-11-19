import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { generateUUID, currentDate } from "../utils/helpers";
import axios from "axios";
import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../components/Breadcrumb";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { DashboardContext } from "../context/DashboardContext";
const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Checkout = () => {
  // const isFormValid = () => {
  //   return (
  //     name.trim() !== "" && phone.trim() !== "" && shippingAddress.trim() !== ""
  //   );
  // };

  // const isFormValid = () => {
  //   return (
  //     name.trim() !== "" && phone.trim() !== "" && shippingAddress.trim() !== ""
  //   );
  // };

  const isFormValid = () => {
    return (
      name.trim() !== "" && phone.trim() !== "" && shippingAddress.trim() !== ""
    );
  };
  const onSubmit = (data) => console.log(data);

  const { cart, clearCart } = useContext(CartContext);
  const { userID, isAuthenticated } = useContext(AuthContext);
  const [shippingAddress, setShippingAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderID, setOrderID] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("amana");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { cartdata } = useContext(DashboardContext);
  console.log("CartdataCartdata", cartdata);
  const navigate = useNavigate();

  let cartValue = cartdata.items[0];
  const userId = localStorage.getItem("id");
  useEffect(() => {
    if (!isAuthenticated || cartdata.items.lenght == 0) {
      navigate("/cart");
    }
  }, [isAuthenticated, cartdata]);

  const createOrder = async () => {
    if (!isFormValid()) {
      return;
    }
    console.log("Order placed");

    if (cartdata.items.length === 0) {
      throw new Error(
        "No items in the cart. Please fill your cart to make an order."
      );
    }
    const deliveryOption = deliveryOptions[selectedDeliveryOption];
    const order = {
      // order_id: orderId,
      user_id: userId,
      shipping_address: shippingAddress,
      name: name,
      phone: phone,
      order_status: "pending",
      created_at: currentDate(),
      description: `hiii this descrprtion `,
      order_total: totalOrder,
      delivery_company: selectedDeliveryOption === "amana" ? "Amana" : "Ozone",
      delivery_cost: deliveryOption.cost,
      items: cartdata.items.map((item) => ({
        productId: item.productId,
        image: item.image,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        quantity_stock: item.quantity_stock,
        subTotal: item.price * item.quantity,
      })),
    };

    axios
      .post(`${import.meta.env.VITE_MY_API}products/createorder`, order)
      .then((response) => {
        clearCart();
        if (response) {
          Swal.fire({
            title: "Order Placed!",
            text: "your order has been placed",
            icon: "success",
            confirmButtonText: "OK",
          });

          navigate("/");
          cartdata.items.map((item) =>
            axios
              .put(
                `${import.meta.env.VITE_MY_API}products/editquantity/${item.productId
                }`,
                { quantity: item.quantity }
              )
              .then((res) => {
                console.log("Admin Quantity Updated");
              })
          );
          clearCartssss();

        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Order Not placed went something error!",
          text: "Something went wrong while placing your order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error creating order:", error);
        throw error;
      });
  };

  const handleCOD = () => {
    // Simulate COD confirmation logic here
    alert("Order placed successfully with Cash on Delivery!");
    createOrder();
  };

  // const loadRazorpay = async () => {
  //   alert("inside")
  //   // const options = {
  //   //   key:"rzp_test_NYUPSveWybUfyq", // Replace with your Razorpay Key ID
  //   //    amount: "5",
  //   //    currency: "$",
  //   //    name: "Restopeditic Furniture",
  //   //    description: "Test Transaction",
  //   //    order_id: "dsgfweilufbk1",
  //   //    handler: function (response) {
  //   //      console.log("Payment successful", response);
  //   //      // Handle the successful payment here
  //   //    },

  //   //    prefill: {
  //   //      name: "John Doe",
  //   //      email: "johndoe@example.com",
  //   //      contact: "9999999999",
  //   //    },
  //   //    notes: {
  //   //      address: "Razorpay Corporate Office",
  //   //    },
  //   //    theme: {
  //   //      color: "#61dafb",
  //   //    },
  //   //  };
  //   const options = {
  //     "key":"rzp_test_NYUPSveWybUfyq", // Enter the Key ID generated from the Dashboard
  //      "currency":'INR',
  //     //  "amount":data?.price*100,
  //      "amount":100,
  //     "name": "furniture Delivery",
  //     // "image":logo,
  //     "description":"address",
  //      //This is a sample Order ID. Pass the id obtained in the response of Step 1
  //     "handler": function (response){
  //       PaymentHandler(response)
  //     },
  //     "prefill": {
  //         "name":"Rajan",
  //         "email":"abcd@gmail.com",
  //         "contact":"123456789"
  //     },

  //   };
  //   try {
  //     // const order = await axios.post("http://localhost:5000/create-order", {
  //     //   amount: 500, // Amount in smallest currency unit (e.g., 500 paise = ₹5)
  //     //   currency: "INR",
  //     // });

  //     // const { amount, id: order_id, currency } = order.data;

  //       e.preventDefault()

  //       const res= await loadScripts('https://checkout.razorpay.com/v1/checkout.js');
  //     if(!res){
  //       alert('faild to load script')
  //     }

  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   } catch (error) {
  //     console.error("Error in loading Razorpay", error);
  //   }
  // };

  const loadScripts = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(false);
      };
      document.body.appendChild(script);
    });
  };

  const loadRazorpay = async () => {
    const res = await loadScripts(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      Swal.fire({
        title: "SDK Error",
        text: "Failed to load Razorpay SDK. Please refresh the page.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const options = {
      key: "rzp_test_NYUPSveWybUfyq",
      currency: "INR",
      amount: 100, // Amount in paise
      name: "Furniture Delivery",
      description: "Payment for furniture",
      handler: async (response) => {
        console.log("Payment successful", response);
        await createOrder(); // Call after successful payment
      },
      prefill: {
        name: "Rajan",
        email: "abcd@gmail.com",
        contact: "123456789",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    if (paymentMethod === "cod") {
      handleCOD();
    } else {
      alert("razhorpay");
      loadRazorpay();
    }
  };

  const updateProductStock = async () => {
    try {
      for (const item of cartdata.items) {
        const updatedStock =
          parseInt(item.quantity_stock) - parseInt(item.quantity);
        await axios.patch(`${import.meta.env.VITE_MY_API}products/${item.id}`, {
          quantity_stock: updatedStock,
        });
        console.log(updatedStock);
        console.log(item.id);
        console.log(item.quantity);
        console.log(item.quantity_stock);
      }
    } catch (error) {
      console.error("Error updating product stock:", error);
    }
  };

  const handleOrderPlace = async () => {
    const details = {
      name: name,
      phone: phone,
      shippingAddress: shippingAddress,
      title: cartValue.title,
      quantity: cartValue.quantity,
      price: cartValue.price,
      subTotal: cartValue.subTotal,
      // category: "sofa",
      userId: userId,
    };
    console.log("details", details);

    try {
      await axios.post(
        `${import.meta.env.VITE_MY_API}products/createorder`,
        details,
        {
          order_status: "delivered",
        }
      );
      await updateProductStock();
      // clearCart();
      setOrderID(orderId);
      setSuccess(true);

      Swal.fire({
        icon: "success",
        title: "Order placed successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOrderDelivered = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_MY_API}orders/${orderID}`, {
        order_status: "delivered",
      });
      Swal.fire({
        icon: "success",
        title: "Order marked as delivered!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/products");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deliveryOptions = {
    amana: { label: "Delivery by Amana 24h", cost: 60.0 },
    ozone: { label: "Delivery by Ozone 48h", cost: 40.0 },
  };

  const subTotal = cartdata.items.reduce(
    (total, item) => total + (Number(item.discountPrice) || 0),
    0
  );

  const totalOrder = subTotal + deliveryOptions[selectedDeliveryOption].cost;

  return (
    <div className="container px-4 mb-4">
      <Breadcrumb />
      <Title>Checkout</Title>
      <div className="row">
        {success ? (
          <div className="col-md-12">
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
              <h4 className="alert-heading">Order placed successfully!</h4>
              <p>
                You&apos;ll receive your order soon. Once you have received it,
                please click on the button &quot;I received my order&quot; to
                confirm the delivery.
              </p>
              <small className="text-danger">Order n° {orderID}</small>
              <hr />
              <p className="mb-0">Thank you for choosing our service!</p>
            </div>
            {/* <Button handleClick={handleOrderDelivered}>
              I received my order
            </Button> */}
          </div>
        ) : (
          <>
            <div className="col-md-6 mt-5">
              <form className="mt-5">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number :
                  </label>
                  <input
                    type="numbe r"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="shippingAddress" className="form-label">
                    Shipping Address:
                  </label>
                  <input
                    {...register("shippingAddress")}
                    type="text"
                    className="form-control"
                    id="shippingAddress"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={handlePaymentMethodChange}
                    />
                    Pay Online (Razorpay)
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={handlePaymentMethodChange}
                    />
                    Cash on Delivery (COD)
                  </label>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">Your Order</h2>
                  <div className="d-flex justify-content-between">
                    <p className="card-text fw-bold">Product</p>
                    <span className="fw-bold">Sub-Total</span>
                  </div>
                  <hr />
                  {/* {cartdata.items.map((item) => (
                    <div
                      key={item.title}
                      className="d-flex justify-content-between mb-2"
                    >
                      <p className="card-text">
                        {item.title} <small>({item.quantity})</small>
                      </p>
                      <span>
                        <FaIndianRupeeSign /> {item.subTotal.toFixed(2)}
                      </span>
                    </div>
                  ))} */}
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <p className="card-text fw-bold">Order Sub-Total : </p>
                    <span className="text-success">
                      <FaIndianRupeeSign />
                      {/* {subTotal.toFixed(2)} */}
                      {(Number(subTotal) || 0).toFixed(2)}
                    </span>
                  </div>
                  <hr />

                  <div className="d-flex justify-content-between mb-2">
                    <p className="card-text fw-bold">Order Total : </p>
                    <span className="text-danger">
                      <FaIndianRupeeSign /> {totalOrder.toFixed(2)}
                    </span>
                  </div>
                  <p className="card-text">
                    Delivered By :
                    {selectedDeliveryOption === "amana" ? "Amana" : "Ozone"}
                  </p>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="deliveryAmana"
                      value="amana"
                      checked={selectedDeliveryOption === "amana"}
                      onChange={() => setSelectedDeliveryOption("amana")}
                    />
                    <label className="form-check-label" htmlFor="deliveryAmana">
                      Delivery by Amana 24h: 30.00 DH
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="deliveryOzone"
                      value="ozone"
                      checked={selectedDeliveryOption === "ozone"}
                      onChange={() => setSelectedDeliveryOption("ozone")}
                    />
                    <label className="form-check-label" htmlFor="deliveryOzone">
                      Delivery by Ozone 48h: 20.00 DH
                    </label>
                  </div>
                </div>
                <div className="card-footer text-center">
                  <Button
                    className="my-3 px-4"
                    // onClick={() => handleOrderPlace()}   handleOrderPlace
                    handleClick={handleSubmit}
                    disabled={!isFormValid()}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
