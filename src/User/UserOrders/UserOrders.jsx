import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
// import { UserDashboardContext } from "../Context/UserDashContext";
import { Divider, Modal, Table } from "antd";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";

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

  // const handleStatusChange = (orderId, status) => {
  //   updateOrderStatus(orderId, status);
  // };

  // const filteredOrders =
  //   selectedStatus === "all"
  //     ? orders
  //     : orders.filter((order) => order.order_status === selectedStatus);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFilter, setDataFilter] = useState([]);
  const [isOrderModel, setOrderModel] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
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
      render: (i, record, index) => <p>{1 + index}</p>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
    },
  ];
  const columns = [
    {
      title: "S.No",
      render: (i, record, index) => <p>{index + 1}</p>,
    },

    {
      title: "Status",
      dataIndex: "order_status",
    },
    {
      title: "Delivery Company",
      dataIndex: "delivery_company",
    },
    {
      title: "Date",
      dataIndex: "created_at",
    },
    {
      title: "Total Amount",
      dataIndex: "order_total",
    },

    {
      title: "View",
      key: "Action",
      render: (e) => (
        <div>
          <center>
            <IoEyeOutline
              style={{
                fontSize: "20px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => orderModel(e)}
            />
          </center>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log("idor", id);

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
      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered table-hover">
          {/* <thead>
            <tr>
              <StyledTh>#</StyledTh>
              <StyledTh>Name</StyledTh>
              <StyledTh>Address</StyledTh>
              <StyledTh>Phone</StyledTh>
              <StyledTh>Status</StyledTh>
              <StyledTh style={{ minWidth: "205px" }}>
                Delivery Company
              </StyledTh>
              <StyledTh>Date</StyledTh>
              <StyledTh style={{ minWidth: "145px" }}>Order Total</StyledTh>
              <StyledTh style={{ minWidStyledTh: "155px" }}>
                Change Status
              </StyledTh>
              <th>Details</th>
            </tr>
          </thead> */}
          <tbody>
            {/* {filteredOrders.map((order, index) => (
              <tr key={order.id}>
                <StyledTd>{index + 1}</StyledTd>
                <StyledTd>{order.name}</StyledTd>
                <StyledTd>{order.shipping_address}</StyledTd>
                <StyledTd>{order.phone}</StyledTd>
                <StyledTd>{order.order_status}</StyledTd>
                <StyledTd>{order.delivery_company}</StyledTd>
                <StyledTd>{order.created_at}</StyledTd>
                <StyledTd>{order.order_total.toFixed(2)}</StyledTd>
                <StyledTd>
                  {order.order_status != "delivered" ? (
                    <select
                      value={order.order_status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  ) : (
                    "delivered"
                  )}
                </StyledTd>
                <StyledTd>
                  <Link
                    to={`/dashboard/orders/${order.id}`}
                    className="text-center fs-5"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </StyledTd>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>

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
      <center></center>
      <Modal
        open={isOrderModel}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div>
          <Divider style={{ fontSize: "30px" }}> Your Order</Divider>
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
