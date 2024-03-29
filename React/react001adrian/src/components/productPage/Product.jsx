import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./product.scss";
import { useLocation } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";
import LightBoxHandlerComponent from "../lightbox/LightBoxHandlerComponent";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
function Product() {
  const { t } = useTranslation();
  // Fetch sku from URL
  const query = new URLSearchParams(useLocation().search);
  const sku = query.get("sku");
  // Store json file path/URL in const
  const jsonURL = process.env.REACT_APP_PRODUCT_DETAILS + sku + ".json";
  // Implement React useState and useEffect to fetch and map data from JSON properly/easily (creating hook to get the data in return section)
  const [data, setData] = useState([]);
  // Gallery array for lightbox handler
  const [gallery, setGallery] = useState([]);

  let [loading, setLoading] = useState(true);

  const getData = () => {
    fetch(jsonURL)
      .then((res) => res.json())
      .then((out) => {
        setData(out);
        setGallery(out.images);
        // Push main picture to the array
        setGallery((current) => [out.main, ...current]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? <Loader loading={true}></Loader> : undefined}
      <div className={loading ? "main-product-wrapper" : ""}>
        <Container className="main-container main-column">
          <Row xs={1} lg={2}>
            <Col className=" center-images">
              <LightBoxHandlerComponent
                content={gallery}
                mainPictureStyle="product-main-picture"
                thumbnailStyle="product-thumb"
                onLoadingChange={setLoading}
              />
            </Col>

            <Col className="detail-col">
              <p id="product-title">{data.title}</p>
              <p id="sku">
                <b>{t("productPage.index")}</b>
                {data.sku}
              </p>
              <p id="desc">{data.description}</p>

              <div className="shop-box">
                <div className="price-section">
                  <p id="main-price">
                    {data.money?.value + " " + data.money?.currency}
                  </p>
                  {/* <p id="net-price">
                {Math.round(data.money?.value * 0.77 * 100) / 100 +
                  " " +
                  data.money?.currency +
                  t('productPage.gross')}
              </p> */}
                </div>

                <input
                  type="number"
                  min="1"
                  max="999"
                  step="1"
                  name="quantity"
                  id="product-quantity"
                  defaultValue={1}
                ></input>
                <button className="btn btn-success lower-button" type="submit">
                  <i className="bi bi-cart"></i> {t("productPage.addToCart")}
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default Product;
