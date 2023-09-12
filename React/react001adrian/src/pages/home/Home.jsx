import React, { useState, useEffect } from "react";
import { Container, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Filter from "../../components/filter/Filter";
import "./home.scss";
import CardComponent from "../../components/cards/CardComponent";

function Home() {
  const { t } = useTranslation();
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortData = (sortType) => {
    switch (sortType) {
      default:
        break;
      case "priceAsc":
        setData(
          data
            .sort(
              (a, b) => parseFloat(a.money.value) - parseFloat(b.money.value)
            )
            .slice(0, data.length)
        );
        break;
      case "priceDesc":
        setData(
          data
            .sort(
              (a, b) => parseFloat(b.money.value) - parseFloat(a.money.value)
            )
            .slice(0, data.length)
        );
        break;
      case "alphabetical":
        setData(
          data
            .sort((a, b) => a.title.localeCompare(b.title))
            .slice(0, data.length)
        );
        break;
    }
  };

  return (

    <Container className="main-container">
      <Row>
        <Col md={12} className={"option-group"}>
          <div className="ms-auto d-flex">
      <Filter />
          <DropdownButton
            id="dropdown-basic-button"
            title={t("homePage.sortBtn.btnTitle")}
            size="sm"
          >
            <Dropdown.Item
              onClick={() => {
                sortData("priceAsc");
              }}
            >
              {t("homePage.sortBtn.sortFromLowest")}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortData("priceDesc");
              }}
            >
              {t("homePage.sortBtn.sortFromHighest")}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortData("alphabetical");
              }}
            >
              {t("homePage.sortBtn.sortAlphabetical")}
            </Dropdown.Item>
          </DropdownButton>

          </div>
        </Col>
        <Col>
          <Row md={3}>
            {data.map((item, key) => (
              <Col className="column-margin" key={key}>
                <CardComponent cardItem={item} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
