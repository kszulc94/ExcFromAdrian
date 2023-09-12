import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../context/Cart";
import "./productPageCartManagement.scss";

function ProductPageCartManagement(props) {
  const { cartItems, addToCart, removeFromCart, removeEntireProductFromCart } =
    useContext(CartContext);

  const { t } = useTranslation();

  const isItemInCart = cartItems.find(
    (cartItem) => cartItem.title === props.product.title
  );

  return (
    <>
      <div className="mt-auto cart-action-btns-container">
        {!isItemInCart ? (
          <Button
            className="add-to-cart-btn mx-auto"
            onClick={() => addToCart(props.product)}
          >
            + {t("productPage.addToCart")}
          </Button>
        ) : (
          <div
            className="d-flex align-items-center flex-column w-100"
            style={{ gap: ".5rem" }}
          >
            <div
              className="d-flex align-items-center justify-content-center "
              style={{ gap: ".5rem" }}
            >
              <Button
                variant="outline-primary"
                onClick={() => removeFromCart(props.product)}
              >
                -
              </Button>
              <div>
                <span className="fs-3">{isItemInCart.quantity}</span>
                {t("productPage.inCart")}
              </div>
              <Button
                variant="outline-primary"
                onClick={() => addToCart(props.product)}
              >
                +
              </Button>
            </div>
            <Button
              className="mb-4"
              variant="danger"
              size="sm"
              onClick={() => removeEntireProductFromCart(props.product)}
            >
              {t("productPage.remove")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
export default ProductPageCartManagement;
