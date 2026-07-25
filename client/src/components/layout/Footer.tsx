import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="border-top mt-5 py-5"
      style={{ borderColor: "#E4E2DD", backgroundColor: "#FAFAF8" }}
    >
      <Container>
        <Row className="g-4">
          <Col md={5}>
            <div className="brand-wordmark mb-3">FINEFIT</div>
            <p
              className="text-stone"
              style={{ fontSize: "0.85rem", maxWidth: "320px" }}
            >
              Pants, tees, and casual shirts built around fit, fabric, and quiet
              confidence. Designed for men who dress with intention, not noise.
            </p>
          </Col>
          <Col md={3}>
            <div className="tag-label mb-3">SHOP</div>
            <div
              className="d-flex flex-column gap-2 font-mono"
              style={{ fontSize: "0.85rem" }}
            >
              <Link
                to="/shop/Pants"
                className="text-reset text-decoration-none"
              >
                Pants
              </Link>
              <Link
                to="/shop/T-Shirts"
                className="text-reset text-decoration-none"
              >
                T-Shirts
              </Link>
              <Link
                to="/shop/Casual Shirts"
                className="text-reset text-decoration-none"
              >
                Casual Shirts
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="tag-label mb-3">GET IN TOUCH</div>
            <div
              className="d-flex flex-column gap-2 font-mono"
              style={{ fontSize: "0.85rem" }}
            >
              <span className="text-stone">support.finefit@gmail.com</span>
            </div>
          </Col>
        </Row>
        <hr style={{ borderColor: "#E4E2DD" }} className="my-4" />
        <div className="tag-label text-center" style={{ fontSize: "0.7rem" }}>
          © 2026 FINEFIT. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
