import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";

const MyPage = () => {
  const dispatch = useDispatch();

  //오더리스트 들고오기
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(orderActions.getOrderList());
}, []);
  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  return (
    <Container className="status-card-container">
     {orders && orders.length > 0 ? (
  orders.map((order) => (
     <OrderStatusCard key={order._id} order={order} />
    ))
  ) : (
    <div className="text-center mt-5">
      <h4>주문한 상품이 없습니다</h4>
    </div>
  )}
    </Container>
  );
};

export default MyPage;
