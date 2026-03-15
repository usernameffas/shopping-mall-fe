import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { currencyFormat } from "../utils/number";

const OrderReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);

  const totalPrice = cartList.reduce(
    (sum, item) => {
      const stock = item.productId?.stock?.[item.size] || 0;
      if (stock <= 0) return sum;
      return sum + item.productId.price * item.qty;
    },
    0
  );

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">주문 내역</h3>
      <ul className="receipt-list">
        {cartList.map((item) => {
          const stock = item.productId?.stock?.[item.size] || 0;
          return (
            <li key={item._id}>
              <div className="display-flex space-between">
                <div>
                  {item.productId.name} ({item.size}) x {item.qty}
                  {stock <= 0 && <span className="text-danger ms-1">(품절)</span>}
                </div>
                <div>{stock <= 0 ? <span className="text-danger">품절</span> : `₩ ${currencyFormat(item.productId.price * item.qty)}`}</div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="display-flex space-between receipt-title">
        <div><strong>Total:</strong></div>
        <div><strong>₩ {currencyFormat(totalPrice)}</strong></div>
      </div>
      {location.pathname.includes("/cart") && (
        <Button
          variant="dark"
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          결제 계속하기
        </Button>
      )}
      <div>
        가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는
        확인되지 않습니다.
        <div>
          30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가 배송 요금
          읽어보기 반품 및 환불
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;