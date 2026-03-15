import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { productActions } from "../action/productAction";
import ProductCard from "../component/ProductCard";

const ProductAll = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const location = useLocation();
    
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name");
    const category = searchParams.get("category");
    dispatch(productActions.getProductList({ name, category }));
  }, [dispatch, location.search]);
  
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
          <div className="text-center w-100 mt-5">
            <h4>상품 데이터를 불러오는 중입니다...</h4>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default ProductAll;