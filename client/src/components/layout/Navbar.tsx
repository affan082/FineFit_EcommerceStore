// import { Navbar as BsNavbar, Container, Nav, Badge } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useCart } from "../../context/CartContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { cart } = useCart();
//   const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

//   return (
//     <BsNavbar
//       expand="md"
//       className="bg-white border-bottom py-3"
//       style={{ borderColor: "#E4E2DD" }}
//     >
//       <Container>
//         <BsNavbar.Brand as={Link} to="/" className="brand-wordmark fs-4">
//           FINEFIT
//         </BsNavbar.Brand>
//         <BsNavbar.Toggle aria-controls="main-nav" />
//         <BsNavbar.Collapse id="main-nav">
//           <Nav
//             className="mx-auto font-mono"
//             style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
//           >
//             <Nav.Link as={Link} to="/shop/Pants">
//               PANTS
//             </Nav.Link>
//             <Nav.Link as={Link} to="/shop/T-Shirts">
//               T-SHIRTS
//             </Nav.Link>
//             <Nav.Link as={Link} to="/shop/Casual Shirts">
//               CASUAL SHIRTS
//             </Nav.Link>
//           </Nav>
//           <Nav
//             className="align-items-center font-mono"
//             style={{ fontSize: "0.85rem" }}
//           >
//             <Nav.Link as={Link} to="/cart" className="position-relative">
//               CART
//               {itemCount > 0 && (
//                 <Badge bg="dark" className="ms-1">
//                   {itemCount}
//                 </Badge>
//               )}
//             </Nav.Link>
//             <Nav.Link as={Link} to="/account/orders">
//               ORDERS
//             </Nav.Link>
//             {user ? (
//               <>
//                 {user.role === "admin" && (
//                   <Nav.Link as={Link} to="/admin">
//                     ADMIN
//                   </Nav.Link>
//                 )}

//                 <Nav.Link disabled className="text-ink" style={{ opacity: 1 }}>
//                   HI, {user.name.toUpperCase()}
//                 </Nav.Link>

//                 <Nav.Link onClick={logout} role="button">
//                   LOGOUT
//                 </Nav.Link>
//               </>
//             ) : (
//               <Nav.Link as={Link} to="/login">
//                 LOGIN
//               </Nav.Link>
//             )}
//           </Nav>
//         </BsNavbar.Collapse>
//       </Container>
//     </BsNavbar>
//   );
// };

// export default Navbar;

import { Navbar as BsNavbar, Container, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  return (
    <BsNavbar
      expand="md"
      className="bg-white border-bottom py-3"
      style={{ borderColor: "#E4E2DD" }}
    >
      <Container
        className="d-none d-md-grid"
        style={{ gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}
      >
        {/* Left third: logo */}
        <div>
          <BsNavbar.Brand as={Link} to="/" className="brand-wordmark fs-4 mb-0">
            FINEFIT
          </BsNavbar.Brand>
        </div>

        {/* Center: categories, always centered regardless of side widths */}
        <Nav
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          <Nav.Link as={Link} to="/shop/Pants">
            PANTS
          </Nav.Link>
          <Nav.Link as={Link} to="/shop/T-Shirts">
            T-SHIRTS
          </Nav.Link>
          <Nav.Link as={Link} to="/shop/Casual Shirts">
            CASUAL SHIRTS
          </Nav.Link>
        </Nav>

        {/* Right third: account actions, right-aligned within its own column */}
        <Nav
          className="align-items-center font-mono justify-content-end"
          style={{ fontSize: "0.85rem" }}
        >
          <Nav.Link as={Link} to="/cart" className="position-relative">
            CART
            {itemCount > 0 && (
              <Badge bg="dark" className="ms-1">
                {itemCount}
              </Badge>
            )}
          </Nav.Link>
          {user ? (
            <>
              <Nav.Link as={Link} to="/account/orders">
                ORDERS
              </Nav.Link>
              {user.role !== "admin" && (
                <Nav.Link disabled className="text-ink" style={{ opacity: 1 }}>
                  HI, {user.name.toUpperCase()}
                </Nav.Link>
              )}
              {user.role === "admin" && (
                <Nav.Link as={Link} to="/admin">
                  ADMIN
                </Nav.Link>
              )}
              <Nav.Link onClick={logout} role="button">
                LOGOUT
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">
              LOGIN
            </Nav.Link>
          )}
        </Nav>
      </Container>

      {/* Mobile: collapsible version, stacked (unchanged behavior) */}
      <Container className="d-md-none">
        <BsNavbar.Brand as={Link} to="/" className="brand-wordmark fs-4">
          FINEFIT
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-nav-mobile" />
        <BsNavbar.Collapse id="main-nav-mobile">
          <Nav
            className="font-mono"
            style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
          >
            <Nav.Link as={Link} to="/shop/Pants">
              PANTS
            </Nav.Link>
            <Nav.Link as={Link} to="/shop/T-Shirts">
              T-SHIRTS
            </Nav.Link>
            <Nav.Link as={Link} to="/shop/Casual Shirts">
              CASUAL SHIRTS
            </Nav.Link>
          </Nav>
          <Nav
            className="align-items-start font-mono"
            style={{ fontSize: "0.85rem" }}
          >
            <Nav.Link as={Link} to="/cart" className="position-relative">
              CART
              {itemCount > 0 && (
                <Badge bg="dark" className="ms-1">
                  {itemCount}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/account/orders">
                  ORDERS
                </Nav.Link>
                {user.role !== "admin" && (
                  <Nav.Link
                    disabled
                    className="text-ink"
                    style={{ opacity: 1 }}
                  >
                    HI, {user.name.toUpperCase()}
                  </Nav.Link>
                )}

                {user.role === "admin" && (
                  <Nav.Link as={Link} to="/admin">
                    ADMIN
                  </Nav.Link>
                )}
                <Nav.Link onClick={logout} role="button">
                  LOGOUT
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                LOGIN
              </Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;

// <Nav
//   className="align-items-start font-mono"
//   style={{ fontSize: "0.85rem" }}
// >
//   <Nav.Link as={Link} to="/cart" className="position-relative">
//     CART
//     {itemCount > 0 && (
//       <Badge bg="dark" className="ms-1">
//         {itemCount}
//       </Badge>
//     )}
//   </Nav.Link>

//   <Nav.Link as={Link} to="/account/orders">
//     ORDERS
//   </Nav.Link>

//   {user ? (
//     <>
//       {/* Show username only for non-admin users */}
//       {user.role !== "admin" && (
//         <Nav.Link
//           disabled
//           className="text-ink"
//           style={{ opacity: 1 }}
//         >
//           HI, {user.name.toUpperCase()}
//         </Nav.Link>
//       )}

//       {/* Show Admin link only for admins */}
//       {user.role === "admin" && (
//         <Nav.Link as={Link} to="/admin">
//           ADMIN
//         </Nav.Link>
//       )}

//       <Nav.Link onClick={logout} role="button">
//         LOGOUT
//       </Nav.Link>
//     </>
//   ) : (
//     <Nav.Link as={Link} to="/login">
//       LOGIN
//     </Nav.Link>
//   )}
// </Nav>
