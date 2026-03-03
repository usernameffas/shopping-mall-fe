import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import ProductCard from "../component/ProductCard";

const ProductAll = () => {
  const dispatch = useDispatch();
  // Reducer에서 설정한 이름 'products'와 반드시 일치해야 합니다.
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(productActions.getProductList({}));
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {products && products.length > 0 ? (
          products.map((item) => (
            <Col key={item._id} md={3} sm={12}>
              <ProductCard product={item} />
            </Col>
          ))
        ) : (
          <div className="text-center w-100 mt-5"><h4>상품 데이터를 불러오는 중입니다...</h4></div>
        )}
      </Row>
    </Container>
  );
};

export default ProductAll;