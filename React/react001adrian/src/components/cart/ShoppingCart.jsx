import { useContext } from "react";
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { CartContext } from "../../context/Cart";
import { useTranslation } from "react-i18next";
import "./shoppingCart.scss";

function ShoppingCart(props) {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    getCartTotal,
    removeEntireProductFromCart,
  } = useContext(CartContext);

  const { t } = useTranslation();

  return (
    <>
      <Offcanvas
        show={props.open}
        placement="top"
        onHide={props.handleClose}
        className="offcanvas-h-80 bg-light"
      >
        <Offcanvas.Header closeButton className="cart-underline">
          <Offcanvas.Title>{t("cart.cartTitle")}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="cart-underline">
          {cartItems.length === 0 ? (
            <div>
              <h1 id="empty-cart-label">{t("cart.emptyCart")}</h1>
            </div>
          ) : (
            cartItems.map((item, key) => (
              <Stack
                gap={3}
                className="d-flex align-items-center mb-3 cart-products"
                direction="horizontal"
                key={key}
              >
                <>
                  <img
                    src={item.main}
                    alt={item.title}
                    style={{
                      width: "150px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="me-auto">
                    <div>{item.title}</div>
                    <div className="text-muted" style={{ fontSize: ".65rem" }}>
                      {item.money.value + " " + item.money.currency}
                    </div>
                    {item.quantity > 1 ? (
                      <div
                        className="text-muted"
                        style={{ fontSize: ".75rem" }}
                      >
                        x{item.quantity}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    {(item.money.value * item.quantity).toFixed(2) +
                      " " +
                      item.money.currency}
                  </div>
                  <Button
                    variant="outline-primary"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeEntireProductFromCart(item)}
                  >
                    X
                  </Button>
                </>
                <div></div>
              </Stack>
            ))
          )}
        </Offcanvas.Body>
        <div className="pe-4 mb-4 pt-3">
          {cartItems.length === 0 ? null : (
            <div className="total-cart-price">
              {t("cart.cartTotal")}
              {getCartTotal().toFixed(2) + " "}PLN
              <div className="mt-2" style={{ textAlign: "right" }}>
                <Button variant="success">{t("cart.next")}</Button>
              </div>
            </div>
          )}
        </div>
      </Offcanvas>
    </>
  );
}

export default ShoppingCart;
