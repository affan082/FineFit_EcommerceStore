import { Container, Table, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();
  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
    toast.info("Item removed from cart");
  };

  if (loading)
    return (
      <Container className="py-5">
        <p className="text-stone">Loading...</p>
      </Container>
    );

  if (!cart || cart.items.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2 className="brand-wordmark mb-3">YOUR CART IS EMPTY</h2>
        <Link to="/" className="btn btn-ink">
          CONTINUE SHOPPING
        </Link>
      </Container>
    );
  }

  const total = cart.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return (
    <Container className="py-5">
      <h1 className="brand-wordmark mb-4">CART</h1>
      <Table borderless className="align-middle">
        <thead>
          <tr className="tag-label border-bottom">
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th>SUBTOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.product._id} className="border-bottom">
              <td>
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: "60px",
                      aspectRatio: "3/4",
                      overflow: "hidden",
                      backgroundColor: "#F0EFEA",
                    }}
                  >
                    <img
                      src={
                        item.product.images[0]
                          ? item.product.images[0]
                          : "https://via.placeholder.com/100x130"
                      }
                      alt={item.product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "0.9rem" }}>
                    {item.product.name}
                  </span>
                </div>
              </td>
              <td className="price-tag">
                Rs. {item.product.price.toLocaleString()}
              </td>
              <td>
                <Form.Control
                  type="number"
                  min={1}
                  max={item.product.stock}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.product._id, Number(e.target.value))
                  }
                  style={{ width: "70px", borderRadius: 0 }}
                />
              </td>
              <td className="price-tag">
                Rs. {(item.product.price * item.quantity).toLocaleString()}
              </td>
              <td>
                <Button
                  variant="link"
                  className="text-stone tag-label p-0"
                  onClick={() => handleRemove(item.product._id)}
                >
                  REMOVE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-4">
        <div style={{ minWidth: "280px" }}>
          <div className="d-flex justify-content-between mb-3">
            <span className="tag-label">TOTAL</span>
            <span className="price-tag" style={{ fontSize: "1.1rem" }}>
              Rs. {total.toLocaleString()}
            </span>
          </div>
          <Button
            className="btn-ink w-100"
            onClick={() => navigate("/checkout")}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
