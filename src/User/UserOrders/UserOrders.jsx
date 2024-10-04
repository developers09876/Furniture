import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
// import { UserDashboardContext } from "../Context/UserDashContext";
import { Divider, Table } from "antd";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const columns = [
  {
    title: "Sno",
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
    title: "Order Total",
    dataIndex: "order_total",
  },

  {
    title: "Action",
    key: "Action",
    render: (_, record) => (
      <div>
        <Row>
          <Col md={3}>
            <a>
              <MdEdit style={{ fontSize: "20px" }} />
            </a>
          </Col>
          <Col md={3}>
            <a>
              <MdDelete style={{ fontSize: "20px" }} />
            </a>
          </Col>
        </Row>
      </div>
    ),
  },
];
const data = [
  {
    key: "1",
    status: "pending",
    deliveryCompany: "amazon",
    date: "11-12-24",
    orderTotal: "121",
  },
  {
    key: "2",
    status: "shipped",
    deliveryCompany: "amazon",
    date: "11-12-24",
    orderTotal: "121",
  },
  {
    key: "3",
    status: "delivered",
    deliveryCompany: "amazon",
    date: "11-12-24",
    orderTotal: "121",
  },
  {
    key: "3",
    status: "canceled",
    deliveryCompany: "amazon",
    date: "11-12-24",
    orderTotal: "121",
  },
];

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
  console.log("data1", data);
  const [loading, setLoading] = useState(true);
  const [dataFilter, setDataFilter] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("id");

    axios
      .get(`http://localhost:5000/products/getOrder/${id}`)
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
      <h2 className="mb-4">All Orders</h2>

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
    </StyledOrders>
  );
};

export default UserOrders;
