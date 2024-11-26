import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
// import { UserDashboardContext } from "../Context/UserDashContext";
import { Divider, Modal, Table } from "antd";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { render } from "react-dom";
import Swal from "sweetalert2";
const { confirm } = Modal;

// styled components
const StyledOrders = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
  width: 100%;
`;

const StyledTh = styled.th`
  padding: 10px 25px !important;
`;

const StyledTd = styled.th`
  padding: 10px 25px !important;
  font-weight: 400;
`;

const StyledSelectWrapper = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  label {
    width: 170px;
  }
`;

const StyledSelect = styled.select`
  width: 200px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  margin-right: 8px;

  &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
  }
`;

const UserOrders = () => {
  // const { orders, updateOrderStatus, fetchData } =
  //   useContext(UserDashboardContext);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [data, setData] = useState([]);
  console.log("dataxs", data);
  const [loading, setLoading] = useState(true);
  const [dataFilter, setDataFilter] = useState([]);
  const [isOrderModel, setOrderModel] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  console.log("userOrder", userOrder);
  const [orderData, setOrderData] = useState([]);

  // const [data, setData] = useState("")
  // const handleStatusChange = (orderId, status) => {
  //   updateOrderStatus(orderId, status);
  // };

  // const filteredOrders =
  //   selectedStatus === "all"
  //     ? orders
  //     : orders.filter((order) => order.order_status === selectedStatus);

  const userOrderUpdate = async (id) => {
    console.log("idcd", id._id);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MY_API}products/userUpdateOrder/${id._id}`,
        { order_status: "canceled" }
      );

      const updatedOrder = response.data;

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `User Order has been updated successfully.`,
      });
    } catch (error) {
      console.error("Error updating Order:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error updating the Order. Please try again.",
      });
    }
  };

  const orderCancel = (e) => {
    confirm({
      title: "Are you sure you want to Cancel the Order",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      onOk() {
        userOrderUpdate(e);
      },
      onCancel() {
        console.log("order not Cancel");
      },
    });
  };

  const orderModel = (e) => {
    setOrderModel(true);
    setUserOrder(e.items);
  };
  const handleOk = () => {
    setOrderModel(false);
  };
  const handleCancel = () => {
    setOrderModel(false);
  };

  const userOrderColumn = [
    {
      title: "S.No",
      align: "center",
      render: (i, record, index) => <p>{1 + index}</p>,
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "discountPrice",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Sub Total",
      align: "center",
      render: (record) => <p>{record.quantity * record.discountPrice}</p>,
    },
  ];
  const columns = [
    {
      title: "S.No",
      align: "center",
      render: (i, record, index) => <p>{index + 1}</p>,
    },

    {
      title: "Status",
      align: "center",
      dataIndex: "order_status",
    },
    {
      title: "Delivery Company",
      align: "center",
      dataIndex: "delivery_company",
    },
    {
      title: "Date",
      dataIndex: "created_at",
    },
    {
      title: "Total Amount",
      align: "center",
      dataIndex: "order_total",
    },

    {
      title: "View",
      align: "center",
      key: "Action",
      render: (e) => (
        <div>
          {/* <center> */}
          <IoEyeOutline
            style={{
              fontSize: "20px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={() => orderModel(e)}
          />
          {/* </center> */}
        </div>
      ),
    },
    {
      title: "Cancel",
      align: "center",
      // dataIndex: "_id",
      key: "",
      render: (record) => {
        if (
          record.order_status === "pending" ||
          record.order_status === "Inprogress"
        ) {
          return (
            <div>
              <center>
                <MdCancel
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => orderCancel(e)}
                />
              </center>
            </div>
          );
        }
        return null;
      },
    },
  ];
  useEffect(() => {
    const id = localStorage.getItem("id");

    axios
      .get(`${import.meta.env.VITE_MY_API}products/getOrder/${id}`)
      .then((response) => {
        setData(response.data);
        setDataFilter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the order data", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedStatus === "all") {
      setDataFilter(data);
    } else {
      const orderFilter = data.filter(
        (order) => order.order_status === selectedStatus
      );
      setDataFilter(orderFilter);
    }
    [selectedStatus, data];
  });
  return (
    <StyledOrders>
      <StyledSelectWrapper>
        <label htmlFor="orderStatusFilter" className="me-2">
          Filter by Status :
        </label>
        <StyledSelect
          id="orderStatusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="me-2 form-select"
        >
          <option value="all">All</option>
          <option value="pending">Pending </option>
          <option value="Inprogress">In Progress</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </StyledSelect>
      </StyledSelectWrapper>

      <div>
        <Divider style={{ fontSize: "30px" }}>All Orders</Divider>
        <Table
          columns={columns}
          dataSource={dataFilter}
          loading={loading}
          size="middle"
          rowKey="id"
        />
      </div>

      <Modal
        open={isOrderModel}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div>
          <Divider style={{ fontSize: "30px" }}>
            <center>
              <h5> Your Order</h5>
            </center>
          </Divider>
          {/* <button
              style={{ fontSize: "17px" }}
              onClick={(e) => orderCancel(e)}
            >
              Cancel
            </button> */}

          {userOrder && (
            <Table
              columns={userOrderColumn}
              dataSource={userOrder}
              loading={loading}
              size="middle"
              pagination={false}
            />
          )}
        </div>
      </Modal>
    </StyledOrders>
  );
};

export default UserOrders;
