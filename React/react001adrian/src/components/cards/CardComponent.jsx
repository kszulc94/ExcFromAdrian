import { Card } from "react-bootstrap";
function CardComponent(props) {
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
        <p className="price-position">
          {props.cardItem.money.value + " " + props.cardItem.money.currency}
        </p>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
