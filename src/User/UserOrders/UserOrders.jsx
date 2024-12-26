import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
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
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [data, setData] = useState([]);
  console.log("dataxs", data);
  const [loading, setLoading] = useState(true);
  const [isOrderModel, setOrderModel] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  console.log("userOrder", userOrder);
  const [orderData, setOrderData] = useState([]);

  const userOrderUpdate = async (id) => {
    console.log("idcd", id._id);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MY_API}products/userUpdateOrder/${id._id}`,
        { order_status: "Cancelled" }
      );

      const updatedOrder = response.data;

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Your  Order has been Cancelled.`,
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
          <IoEyeOutline
            style={{
              fontSize: "20px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={() => orderModel(e)}
          />
        </div>
      ),
    },
    {
      title: "Cancel",
      align: "center",
      key: "",
      render: (record, e) => {
        if (record.order_status === "Cancelled") {
          return <p>g</p>; // Do not render anything for this row
        }
        if (
          record.order_status === "Pending" ||
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
        return;
      },
    },
  ];
  useEffect(() => {
    const id = localStorage.getItem("id");

    axios
      .get(`${import.meta.env.VITE_MY_API}products/getOrder/${id}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the order data", error);
        setLoading(false);
      });
  }, []);

  const dataFilter =
    selectedStatus === "All"
      ? data
      : data.filter((order) => order.order_status === selectedStatus);

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
          <option value="All">All</option>
          <option value="Pending">Pending </option>
          <option value="Inprogress">In Progress</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
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
        width={800}
        // footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div>
          <Divider style={{ fontSize: "30px" }}>
            <center>
              <h5> Your Order</h5>
            </center>
          </Divider>

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
