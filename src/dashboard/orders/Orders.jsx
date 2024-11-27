import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { DashboardContext } from "../../context/DashboardContext";
import Button from "../../components/Button";
import { Divider, Modal, Table, Select } from "antd";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import "../../Css-Pages/WallBackground.css";
import { div } from "three/webgpu";
import { MdCancel } from "react-icons/md";
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
  const [isOrderModel, setOrderModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [userData, setUserData] = useState("");
  const [userID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Option } = Select;

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
    },
    {
      title: "Price",
      dataIndex: "discountPrice",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Sub Total",
      render: (record) => (
        <div>
          <p>{record.quantity * record.discountPrice}</p>
        </div>
      ),
    },
  ];

  const orderDetail = [
    {
      title: "S.No",
      render: (i, record, index) => (
        <div>
          <p>{1 + index}</p>
        </div>
      ),
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
      title: "Email",
      dataIndex: "email",
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Total Amount",
      dataIndex: "order_total",
    },
    {
      title: "Status Update",
      dataIndex: "changeStatus",
      render: (record, e) => {
        if (e.order_status === "cancelled") {
          return (
            <span style={{ color: "red", fontWeight: "bold" }}>Canceled</span>
          );
        }
        return (
          <div onClick={() => getId(e)}>
            <Select
              defaultValue={e.order_status}
              onChange={(status) => {
                UpdateOrder(status);
              }}
              style={{ width: 120 }}
            >
              <Option value="Pending" style={{ color: "orange" }}>
                Pending
              </Option>
              <Option value="Inprogress" style={{ color: "blue" }}>
                In Progress
              </Option>
              <Option value="Shipped" style={{ color: "purple" }}>
                Shipped
              </Option>
              <Option value="Delivered" style={{ color: "green" }}>
                Delivered
              </Option>

              <Option value="Cancelled" style={{ color: "red" }}>
                Cancelled
              </Option>
            </Select>
          </div>
        );
      },
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

  const orderModel = (e) => {
    setOrderModel(true);
    setSelectedOrder(e.items);
  };
  const handleOk = () => {
    setOrderModel(false);
  };
  const handleCancel = () => {
    setOrderModel(false);
  };

  const getId = async (e) => {
    const userID = e.user_id;
    setUserID(userID);
    const orderGetId = e._id;
    setOrderId(orderGetId);
    fetchUser();
  };
  const fetchOrder = async () => {
    axios
      .get(`${import.meta.env.VITE_MY_API}products/order`)

      .then((response) => {
        setData(response.data);
        setDataFilter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the order data", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchUser = async () => {
    axios
      .get(`${import.meta.env.VITE_MY_API}user/getUser/${userID}`)
      .then((response) => {
        setUserData(response.data.data);
      });
  };
  const UpdateOrder = async (status) => {
    const emailDetails = {
      name: userData.username,
      email: userData.email,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}products/updateorder/${orderId}`,
        { order_status: status, emailDetails }
      );

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

  const filteredOrders =
    selectedStatus === "All"
      ? data
      : data.filter((order) => order.order_status === selectedStatus);

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
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Inprogress">In Progress</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Canceled</option>
        </StyledSelect>
      </StyledSelectWrapper>

      <div>
        <Divider style={{ fontSize: "30px" }}>All Orders</Divider>
        <Table
          columns={orderDetail}
          dataSource={filteredOrders}
          loading={loading}
          rowKey="_id"
          size="middle"
        />
      </div>
      <Modal
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
