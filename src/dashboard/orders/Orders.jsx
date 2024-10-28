import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { DashboardContext } from "../../context/DashboardContext";
import Button from "../../components/Button";
import { Divider, Modal, Table, Select } from "antd";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
// styled components

const data = [
  {
    key: "1",
    name: "User1",
    phone: "1234567890",
    date: "10-12-2023",
    details: "Ordered",
    changeStatus: "No",
    orderTotal: "12",
    deliveryCompany: "Amazon",
    status: "Process",
    address: "Delhi",
  },
  {
    key: "2",
    name: "User2",
    phone: "2345678901",
    date: "11-12-2023",
    details: "Order",
    changeStatus: "-",
    orderTotal: "13",
    deliveryCompany: "SD",
    status: "Pending",
    address: "Pune",
  },
  {
    key: "3",
    name: "User3",
    phone: "3456789012",
    date: "12-12-2023",
    details: "Not Placed",
    changeStatus: "yes",
    orderTotal: "14",
    deliveryCompany: "Flipkart",
    status: "--",
    address: "Mumbai",
  },
];
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
  const [isOrderModel, setOrderModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [status, setStatus] = useState("");
  console.log("status", status);
  const [orderId, setOrderId] = useState(null);

  const [data, setData] = useState([]);
  console.log("data", data);
  const [loading, setLoading] = useState(true);

  const viewOrder = [
    {
      title: "Sno",
      render: (i, record, index) => (
        <div>
          <p>{1 + index}</p>
        </div>
      ),
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

  const orderDetail = [
    {
      title: "Sno",
      render: (i, record, index) => (
        <div>
          <p>{1 + index}</p>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "shipping_address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "order_status",
    },
    // {
    //   title: "Delivery Company",
    //   dataIndex: "deliveryCompany",
    // },

    {
      title: "Date",
      dataIndex: "created_at",
    },

    {
      title: "orderTotal",
      dataIndex: "order_total",
    },
    {
      title: "Change Status",
      dataIndex: "changeStatus",
      render: (record, e) => (
        <div onClick={() => getId(e)}>
          <Select
            defaultValue={e.order_status}
            // value={status}
            onChange={(status) => {
              setStatus(status); // Update the status
              orderdata(status);
            }}
            style={{ width: 120 }}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Inprogress">In Progress</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Initial">Initial</Option>
          </Select>
        </div>
      ),
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
          {/* <MdEdit
            style={{ fontSize: "20px", cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleEdit(record)}
          />
          <MdDelete
            style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
            onClick={() => handleDelete(record)}
          /> */}
        </div>
      ),
    },
  ];

  const orderModel = (e) => {
    setOrderModel(true);
    setSelectedOrder(e.items);
  };
  const handleOk = () => {
    setOrderModel(false);
  };
  const handleCancel = () => {
    setOrderModel(false);
    // setSelectedOrder(null);
  };

  const getId = async (e) => {
    console.log("recorzd", e);
    const orderGetId = e._id;
    setOrderId(orderGetId);
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_MY_API}products/order`)

      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the order data", error);
        setLoading(false);
      });
  }, []);

  const orderdata = async (status) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}products/updateorder/${orderId}`,
        { order_status: status }
      );
      // const updatedData = Array.isArray(response.data)
      //   ? response.data
      //   : [response.data];

      // setData(updatedData);
      // setData(response.data);
      const updatedOrder = response.data;
      setData((prevData) =>
        prevData.map((order) =>
          order._id === orderId
            ? { ...order, order_status: updatedOrder.order_status }
            : order
        )
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Order has been updated successfully.`,
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

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
  };

  // const filteredOrders =
  //   selectedStatus === "all"
  //     ? orders
  //     : orders.filter((order) => order.order_status === selectedStatus);
  // useEffect(() => {
  //   orderdata();
  // }, []);

  return (
    <StyledOrders>
      {/* <Button handleClick={() => fetchData()} className='me-3 my-4'>Refresh Data</Button> */}
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
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
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
          columns={orderDetail}
          dataSource={data}
          loading={loading}
          rowKey="_id"
          size="middle"
        />
      </div>
      <Modal
        // title="Order Model"
        open={isOrderModel}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div>
          <Divider style={{ fontSize: "30px" }}>Order Details</Divider>
          {selectedOrder && (
            <Table
              columns={viewOrder}
              dataSource={selectedOrder}
              loading={loading}
              // rowKey="_id"
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
