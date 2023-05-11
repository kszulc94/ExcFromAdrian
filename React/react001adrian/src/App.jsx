import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./App.scss";
import CardComponent from "./components/cards/CardComponent";
function App() {
  // Store json file path/URL in const
  const jsonURL = process.env.REACT_APP_CARD_JSON_URL;

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
        {data.map((item, key) => (
          <Col className="column-margin" key={key}>
            <CardComponent cardItem={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default App;
