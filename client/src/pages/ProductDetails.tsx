import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import type { Product } from "../types/product";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    axiosInstance.get<Product>(`/products/${id}`).then(({ data }) => {
      setProduct(data);
      setActiveImage(0);
    });
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    setAdding(true);

    try {
      await addToCart(product!._id, qty);
      toast.success("Added to cart");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (!product)
    return (
      <Container className="py-5">
        <p className="text-stone">Loading...</p>
      </Container>
    );

  const images =
    product.images.length > 0
      ? product.images
      : ["https://via.placeholder.com/600x750?text=FineFit"];

  const isPlaceholder = product.images.length === 0;
  const mainImageSrc = images[activeImage];
  return (
    <Container className="py-5">
      <Row className="g-5">
        <Col md={6}>
          {/* Main image, scaled to 70% width/height within this column */}
          <div style={{ width: "70%" }}>
            <div
              style={{
                aspectRatio: "4/4",
                overflow: "hidden",
                backgroundColor: "#F0EFEA",
              }}
            >
              <img
                src={mainImageSrc}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Thumbnail row */}
          {images.length > 1 && (
            <div className="d-flex gap-2 mt-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  style={{
                    width: "70px",
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    backgroundColor: "#F0EFEA",
                    cursor: "pointer",
                    border:
                      activeImage === idx
                        ? "2px solid #1A1A1A"
                        : "1px solid #E4E2DD",
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </Col>

        <Col md={6}>
          {/* <div className="tag-label mb-2">{product.category}</div> */}
          <h1 className="brand-wordmark mb-3" style={{ fontSize: "1.8rem" }}>
            {product.name}
          </h1>
          <div className="price-tag mb-4" style={{ fontSize: "1.2rem" }}>
            Rs. {product.price.toLocaleString()}
          </div>
          <p className="text-stone mb-4">{product.description}</p>

          <div className="tag-label mb-3">
            {product.stock > 0 ? `IN STOCK (${product.stock})` : "OUT OF STOCK"}
          </div>

          <Row
            className="align-items-center mb-4"
            style={{ maxWidth: "250px" }}
          >
            <Col xs={4}>
              <Form.Control
                type="number"
                min={1}
                max={product.stock}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                style={{ borderRadius: 0 }}
              />
            </Col>
          </Row>

          <Button
            className="btn-ink"
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
          >
            {adding ? "ADDING..." : "ADD TO CART"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
