import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faListAlt, faBox } from '@fortawesome/free-solid-svg-icons';
import { FaIndianRupeeSign } from "react-icons/fa6";
import styled from 'styled-components';
import { getTodayOrders, calculateTotalSales } from '../../utils/helpers';
import { UNSAFE_DataRouterStateContext } from 'react-router-dom';

const StyledCard = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.radius};
  padding: 10px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const NumberText = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  ${props => props.theme.textColor}
`;

const BottomText = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textColor};
`;

const Stats = ({ orders, users, products, neworder }) => {
  // const [newOrder, setNewOrder] = useState([]);

  // const OrdersCount = orders?.length;
  // const totalUsers = users?.length;
  const totalProducts = products?.length;
  const totalSales = calculateTotalSales(orders);
  const todaySales = calculateTotalSales(getTodayOrders(orders));
  // const pendingOrders = res.data.filter(order => order.order_status === "pending");
  // setNewOrder(pendingOrders);

  return (
    <div className="container mt-4">
      <div className="row gy-4" style={{ width: 'calc(100vw - 270px)' }}>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faListAlt} />
            </IconWrapper>
            {/* <NumberText>{pendingOrders.length}</NumberText> */}
            <BottomText>New Orders</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faUser} />
            </IconWrapper>
            {/* <NumberText>{totalUsers}</NumberText> */}
            <BottomText>Total Users</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faShoppingCart} />
            </IconWrapper>
            {/* <NumberText>{OrdersCount}</NumberText> */}
            <BottomText>Total Orders</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faBox} />
            </IconWrapper>
            <NumberText>{totalProducts}</NumberText>
            <BottomText>Total Products</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FaIndianRupeeSign />
            </IconWrapper>
            <NumberText>{totalSales.toFixed(2)}</NumberText>
            <BottomText>Total Sales</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FaIndianRupeeSign />
            </IconWrapper>
            <NumberText>{todaySales.toFixed(2)}</NumberText>
            <BottomText>Today&apos; Sales</BottomText>
          </StyledCard>
        </div>
      </div>
    </div>
  );
};

export default Stats;