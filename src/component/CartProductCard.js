import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";

const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (event) => {
    dispatch(cartActions.updateQty(item._id, event.target.value));
  };

  const deleteCart = (id) => {
    dispatch(cartActions.deleteCartItem(id));
  };

  return (
    <div className="product-card-cart">
      <Row>
        <Col md={2} xs={12}>
          <img src={item.productId?.image} width={112} />
        </Col>
        <Col md={10} xs={12}>
          <div className="display-flex space-between">
            <h3>{item.productId?.name}</h3>
            <button className="trash-button">
              <FontAwesomeIcon
                icon={faTrash}
                width={24}
                onClick={() => deleteCart(item._id)}
              />
            </button>
          </div>
          <div>
            <strong>₩ {currencyFormat(item.productId?.price)}</strong>
          </div>
          <div>Size: {item.size}</div>
          <div>Total: ₩ {currencyFormat(item.productId?.price * item.qty)}</div>
          <div>
            Quantity:
            <Form.Select
              onChange={handleQtyChange}
              required
              defaultValue={item.qty}
              className="qty-dropdown"
            >
              {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </Form.Select>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartProductCard;