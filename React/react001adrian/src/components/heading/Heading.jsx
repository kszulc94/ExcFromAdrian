import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import logo from "../../resources/navbar-logo.svg";
import shoppingCart from "../../resources/shopping-cart.svg";
import { useTranslation } from "react-i18next";
import { useState, useContext } from "react";
import ShoppingCart from "../cart/ShoppingCart";
import { CartContext } from "../../context/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./heading.scss";

function Heading() {
  const { cartItems } = useContext(CartContext);

  const { t } = useTranslation();

  const [isCartOpen, setIsCartOpen] = useState(false);

  function showCart() {
    setIsCartOpen(true);
  }

  function hideCart() {
    setIsCartOpen(false);
  }

  return (
    <>
      <div className="heading heading-margin">
        <Navbar className="shadow-sm" fixed="top" bg="white" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Button
              variant="outline-primary"
              className="rounded-circle shopping-cart-pos cart-btn-header"
              onClick={showCart}
            >
              <img src={shoppingCart} alt="Shopping Cart Icon" />
              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center cart-btn-header-qty-indicator"
              >
                {cartItems.length !== 0
                  ? cartItems.map((item, index) => {
                      if (index === cartItems.length - 1) {
                        return cartItems.reduce(
                          (total, item) => total + item.quantity,
                          0
                        );
                      }
                      return null; // Ignore ESlint
                    })
                  : 0}
              </div>
            </Button>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">{t("navbar.home")}</Nav.Link>
                <Nav.Link href="#link">{t("navbar.about")}</Nav.Link>
                <NavDropdown
                  title={t("navbar.panel.title")}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    {t("navbar.panel.orders")}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    {t("navbar.panel.contact")}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    {t("navbar.panel.rules")}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    {t("navbar.panel.loginRegister")}
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <ShoppingCart open={isCartOpen} handleClose={hideCart}></ShoppingCart>
      </div>
    </>
  );
}

export default Heading;
