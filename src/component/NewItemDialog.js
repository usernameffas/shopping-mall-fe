import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import { productActions } from "../action/productAction";
import { CATEGORY, STATUS, SIZE } from "../constants/product.constants";
import "../style/adminProduct.style.css";
import { commonUiActions } from "../action/commonUiAction";

const InitialFormData = {
  name: "",
  sku: "",
  stock: {},
  image: "",
  description: "",
  category: [],
  status: "active",
  price: 0,
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const { error } = useSelector((state) => state.product);
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedProduct
  );
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const [stockError, setStockError] = useState(false);

  const handleClose = () => {
    setFormData({ ...InitialFormData });
    setStock([]);
    setShowDialog(false);
  };

  // 🚀 [핵심 수리] 함수 입구에 async를 붙여 await 사용 권한을 획득합니다.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (stock.length === 0) {
      setStockError(true);
      return;
    }
    const stockObj = {};
    stock.forEach((item) => {
      stockObj[item[0]] = item[1];
    });

    if (mode === "new") {
      // 상품 등록이 완료될 때까지 await로 기다립니다.
      await dispatch(productActions.createProduct({ ...formData, stock: stockObj }));
      // 등록 직후, 점장님(AdminProduct)에게 목록 갱신을 요청하는 무전을 보냅니다.
      dispatch(productActions.getProductList({ page: 1, name: "" }));
    } else {
      // 수정 시에도 완료를 기다린 후 목록을 갱신합니다.
      await dispatch(productActions.editProduct({ ...formData, stock: stockObj }, selectedProduct._id));
      dispatch(productActions.getProductList({ page: 1, name: "" }));
    }
    handleClose();
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const addStock = () => {
    setStock([...stock, []]);
  };

  const deleteStock = (idx) => {
    const newStock = stock.filter((_, index) => index !== idx);
    setStock(newStock);
  };

  const handleSizeChange = (value, index) => {
    const newStock = [...stock];
    newStock[index][0] = value;
    setStock(newStock);
  };

  const handleStockChange = (value, index) => {
    const newStock = [...stock];
    newStock[index][1] = parseInt(value); // 숫자로 변환!
    setStock(newStock);
  };

  const onHandleCategory = (event) => {
    if (formData.category.includes(event.target.value)) {
      const newCategory = formData.category.filter((item) => item !== event.target.value);
      setFormData({ ...formData, category: [...newCategory] });
    } else {
      setFormData({ ...formData, category: [...formData.category, event.target.value] });
    }
  };

  const uploadImage = (url) => {
    setFormData({ ...formData, image: url });
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit") {
        setFormData(selectedProduct);
        const stockArray = Object.entries(selectedProduct.stock);
        setStock(stockArray);
      } else {
        setFormData({ ...InitialFormData });
        setStock([]);
      }
    }
  }, [showDialog, mode, selectedProduct]);

  useEffect(() => {
    if (error) {
      dispatch(commonUiActions.showToastMessage(error, "error"));
    }
  }, [error, dispatch]);

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === "new" ? "Create New Product" : "Edit Product"}</Modal.Title>
      </Modal.Header>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="sku">
            <Form.Label>Sku</Form.Label>
            <Form.Control onChange={handleChange} type="string" placeholder="Enter Sku" required value={formData.sku} />
          </Form.Group>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={handleChange} type="string" placeholder="Name" required value={formData.name} />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="string" placeholder="Description" as="textarea" onChange={handleChange} rows={3} value={formData.description} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label className="mr-1">Stock</Form.Label>
          {stockError && <span className="error-message">재고를 추가해주세요</span>}
          <Button size="sm" onClick={addStock}>Add +</Button>
          <div className="mt-2">
            {stock.map((item, index) => (
              <Row key={index}>
                <Col sm={4}>
                  <Form.Select onChange={(event) => handleSizeChange(event.target.value, index)} required value={item[0] ? item[0].toLowerCase() : ""}>
                    <option value="" disabled hidden>Please Choose...</option>
                    {SIZE.map((s, i) => (
                      <option value={s.toLowerCase()} disabled={stock.some((size) => size[0] === s.toLowerCase())} key={i}>{s}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Control onChange={(event) => handleStockChange(event.target.value, index)} type="number" placeholder="number of stock" value={item[1]} required />
                </Col>
                <Col sm={2}>
                  <Button variant="danger" size="sm" onClick={() => deleteStock(index)}>-</Button>
                </Col>
              </Row>
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Image">
          <Form.Label>Image</Form.Label>
          <CloudinaryUploadWidget uploadImage={uploadImage} />
          <img id="uploadedimage" src={formData.image} className="upload-image mt-2" alt="uploadedimage" />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control value={formData.price} required onChange={handleChange} type="number" placeholder="0" />
          </Form.Group>
          <Form.Group as={Col} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" multiple onChange={onHandleCategory} value={formData.category} required>
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>{item}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={formData.status} onChange={handleChange} required>
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>{item}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">{mode === "new" ? "Submit" : "Edit"}</Button>
      </Form>
    </Modal>
  );
};

export default NewItemDialog;