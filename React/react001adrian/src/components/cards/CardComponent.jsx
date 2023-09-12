import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./cardComponent.scss";
import { useTranslation } from "react-i18next";
function CardComponent(props) {
  const {t} = useTranslation();
  return (
    <Card className="card-custom h-100 no-border-radius">
      <div className="image-container">
        <Card.Img
          src={props.cardItem.thumbnail}
          className="img no-border-radius"
        />
      </div>
      <Card.Body className="card-body text-start">
        <Card.Title>{props.cardItem.title}</Card.Title>
        <Card.Text style={{ paddingBottom: "20px" }}>
          {props.cardItem.teaser_desc}
        </Card.Text>

        <Row xs={2} md={2}>
          <Col className="price-position">
            <div className="price text-muted">
              {props.cardItem.money.value + " " + props.cardItem.money.currency}
            </div>
          </Col>
          <Col className="price-position details-button">
            <div className="block">
              <li id="product-details-btn">
                <Link to={"product?sku=" + props.cardItem.sku}>
                  <button className="btn btn-primary btn-sm py-0 px-1 btn-sm-font">
                    {t('card.details')}
                  </button>
                </Link>
              </li>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
