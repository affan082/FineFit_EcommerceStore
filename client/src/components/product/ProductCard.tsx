import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

const ProductCard = ({ product }: { product: Product }) => {
  const image =
    product.images[0] || "https://via.placeholder.com/400x500?text=FineFit";
  return (
    <Link
      to={`/product/${product._id}`}
      className="text-decoration-none text-reset"
    >
      <div
        className="mb-2"
        style={{
          aspectRatio: "2/2.3",
          overflow: "hidden",
          backgroundColor: "#F0EFEA",
        }}
      >
        <img
          src={image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="tag-label mb-1">{product.category}</div>
      <div className="mb-1" style={{ fontSize: "0.95rem" }}>
        {product.name}
      </div>
      <div className="price-tag">Rs. {product.price.toLocaleString()}</div>
    </Link>
  );
};

export default ProductCard;
