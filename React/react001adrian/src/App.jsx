import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Col, Row, Card } from "react-bootstrap";

function App() {
  // Store json file path/URL in const
  const jsonURL =
    "https://gist.githubusercontent.com/adrianliegmann/22105bd08d3c57fb04951e1b51c2856f/raw/30205cac63b70c36cb9d6916f6262cacc968d1c0/data-1.json?fbclid=IwAR3uv5OVsRpBZsbHJxMkR8Yg8riHTYuqBPbfpCOnpIGkKUniEiBLiQkQ3ao";
  
  // Implement React useState and useEffect to fetch and map data from JSON properly/easily (creating hook to get the data in return section)
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(jsonURL)
      .then((res) => res.json())
      .then((out) => {
        setData(out.elements);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container fluid className="main-container">
      <Row xs={1} md={3} lg={4}>
        {data.map((item,key) => ( 
          <Col className="column-margin" key={key}>
            <Card className="card-custom h-100 no-border-radius">
              <div className="image-container">
                <Card.Img src={item.thumbnail} className="img no-border-radius"/>
              </div>
              <Card.Body className="card-body text-start">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text style={{ paddingBottom: "20px" }}>
                  {item.teaser_desc}
                </Card.Text>
                <p className="price-position">{item.money.value + " " + item.money.currency}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default App;
