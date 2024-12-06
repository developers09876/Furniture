import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { currentDate } from "../utils/helpers";
import axios from "axios";
import styled from "styled-components";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../components/Breadcrumb";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { DashboardContext } from "../context/DashboardContext";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const styles = {
  container: (isSelected) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.5rem",
    border: isSelected ? "2px solid #28a745" : "2px solid #ddd",
    borderRadius: "10px",
    backgroundColor: isSelected ? "#e8f5e9" : "#fff",
    boxShadow: isSelected ? "0 3px 6px rgba(40, 167, 69, 0.2)" : "none",
    cursor: "pointer",
    marginBottom: "1rem",
    transition: "all 0.3s ease",
  }),
  label: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#333",
  },
  hiddenInput: {
    display: "none",
  },
  icon: (isSelected) => ({
    fontSize: "1.5rem",
    color: isSelected ? "#28a745" : "#666",
  }),
};

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
  const { clearCartPlaceOrder } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [shippingAddress, setShippingAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderID, setOrderID] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("amana");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { cartdata } = useContext(DashboardContext);
  console.log("CartdataCartdata", cartdata.items);
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
        discountPrice: item.discountPrice,
        quantity: item.quantity,
        quantity_stock: item.quantity_stock,
        subTotal: item.price * item.quantity,
      })),
    };

    axios
      .post(`${import.meta.env.VITE_MY_API}products/createorder`, order)
      .then((response) => {
        if (response) {
          Swal.fire({
            title: "Order Placed!",
            text: "your order has been placed",
            icon: "success",
            confirmButtonText: "OK",
          });
          clearCartPlaceOrder();
          updateProductStock();
          navigate("/");
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
    alert("going to COD");
    createOrder();
  };

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

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loadRazorpay = async (e) => {
    console.log("ln188");

    // Ensure the Razorpay script is loaded
    const res = await loadScripts(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }
    console.log("ln1941");

    // Razorpay payment options
    const options = {
      key: "rzp_test_NYUPSveWybUfyq",
      currency: "INR",
      amount: 100,
      name: "Furniture Delivery",
      description: "Payment for furniture",
      handler: function (response) {
        console.log("Payment successful", response);
        PaymentHandler(response);
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

    // Check if Razorpay object is available
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load.");
      return;
    }
    console.log("ln221");
    // Open Razorpay checkout modal
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    createOrder();
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const orderPlace = () => {
    if (paymentMethod === "cod") {
      handleCOD();
    } else {
      loadRazorpay();
    }
  };

  const updateProductStock = async () => {
    cartdata.items
      .map((item) =>
        axios
          .put(
            `${import.meta.env.VITE_MY_API}products/editquantity/${
              item.productId
            }`,
            { quantity: item.quantity }
          )
          .then((res) => {
            console.log("Admin Quantity Updated");
          })
      )
      .catch((error) => {
        console.error("Error updating product stock:", error);
      });
  };

  const deliveryOptions = {
    amana: { label: "Delivery by Amana 24h", cost: 60.0 },
    ozone: { label: "Delivery by Ozone 48h", cost: 40.0 },
  };

  const { state } = useLocation();
  const subTotal = state;

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
            <form
              className="mt-5"
              style={{ display: "flex" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-md-6 mt-5" style={{ backgroundColor: "" }}>
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
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    // onChange={(e) => setPhone(e.target.value)}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d{0,10}$/.test(input)) {
                        setPhone(input);
                      }
                    }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="shippingAddress" className="form-label">
                    Shipping Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shippingAddress"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                  />
                </div>
                {/* <div>
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
                </div> */}
                <div>
                  <div
                    style={styles.container(paymentMethod === "online")}
                    onClick={() =>
                      handlePaymentMethodChange({ target: { value: "online" } })
                    }
                  >
                    <label style={styles.label}>
                      <input
                        type="radio"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={handlePaymentMethodChange}
                        style={styles.hiddenInput}
                      />
                      <FaCreditCard
                        style={styles.icon(paymentMethod === "online")}
                      />
                      Pay Online (Razorpay)
                    </label>
                  </div>

                  <div
                    style={styles.container(paymentMethod === "cod")}
                    onClick={() =>
                      handlePaymentMethodChange({ target: { value: "cod" } })
                    }
                  >
                    <label style={styles.label}>
                      <input
                        type="radio"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={handlePaymentMethodChange}
                        style={styles.hiddenInput}
                      />
                      <FaMoneyBillWave
                        style={styles.icon(paymentMethod === "cod")}
                      />
                      Cash on Delivery (COD)
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-6 ms-4">
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
                    {/* <hr /> */}
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
                      <label
                        className="form-check-label"
                        htmlFor="deliveryAmana"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="deliveryOzone"
                      >
                        Delivery by Ozone 48h: 20.00 DH
                      </label>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <Button
                      className="my-3 px-4"
                      // onClick={() => handleOrderPlace()}   handleOrderPlace
                      handleClick={orderPlace}
                      disabled={!isFormValid()}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
