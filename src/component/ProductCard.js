import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/product/${product?._id}`);
  };

  // 🛡️ 가격 변환 시 에러가 나지 않도록 미리 안전 장치를 합니다.
  const formattedPrice = product?.price ? Number(product.price).toLocaleString() : "0";

  return (
    <div className="product-card" onClick={showDetail} style={{ 
      cursor: "pointer", 
      border: "1px solid #ddd", 
      padding: "15px", 
      margin: "10px", 
      minHeight: "300px",
      background: "#fff"
    }}>
      <img
        // 🖼️ 이미지가 없으면 빈 박스가 아닌 기본 이미지를 보여줍니다.
        src={product?.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"}
        alt={product?.name}
        style={{ width: "100%", height: "180px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
      />
      <div style={{ fontWeight: "bold", marginTop: "10px", fontSize: "1.1rem" }}>
        {product?.name || "상품명 없음"}
      </div>
      <div style={{ color: "#e44d26", fontWeight: "600" }}>
        ₩ {formattedPrice}
      </div>
    </div>
  );
};

export default ProductCard;