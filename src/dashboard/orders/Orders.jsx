import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DashboardContext } from "../../context/DashboardContext";
import { Divider, Table, Select } from "antd";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

// styled components

const { Option } = Select;

const columns = (handleStatusChange) => [
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
    dataIndex: "Address",
  },
  {
    title: "Phone",
    dataIndex: "Phone",
  },
  {
    title: "Status",
    dataIndex: "Status",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
  },
  {
    title: "Order Total",
    dataIndex: "quantity",
  },
  {
    title: "Change Status",
    dataIndex: "changeStatus",
    render: (text, record) => (
      <Select
        defaultValue={record.status}
        onChange={(value) => handleStatusChange(record.key, value)} // Handle change
        style={{ width: 120 }}
      >
        <Option value="Pending">Pending</Option>
        <Option value="Inprogress">In Progress</Option>
        <Option value="Delivered">Delivered</Option>
        <Option value="Initial">Initial</Option>
      </Select>
    ),
  },
];

const StyledOrders = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
  width: 100%;
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

const Orders = () => {
  const { orders, updateOrderStatus, fetchData } = useContext(DashboardContext);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status)
  }

  useEffect(() => {
    axios.get("http://localhost:5000/products/order").then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the order data", error);
        setLoading(false);
      });
  }, []);

  return (
    <StyledOrders>
      <StyledSelectWrapper>
        <label htmlFor="orderStatusFilter" className="me-2">
          Filter by Status:
        </label>
        <StyledSelect
          id="orderStatusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="me-2 form-select">
          <option >select status</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </StyledSelect>
      </StyledSelectWrapper>

      <div>
        <Divider style={{ fontSize: "30px" }}>All Orders</Divider>
        <Table
          columns={columns(handleStatusChange)}
          dataSource={data}
          loading={loading}
          rowKey="_id"
          size="middle"
        />
      </div>
      <Modal
        title="Order Model"
        open={isOrderModel}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div>
          <Divider style={{ fontSize: "30px" }}>All Orders</Divider>
          {selectedOrder && (
            <Table
              columns={viewOrder}
              dataSource={[selectedOrder]}
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

export default Orders;
