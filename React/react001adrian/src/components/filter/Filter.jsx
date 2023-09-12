import { Button, Form, Row, Col} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Popup from 'reactjs-popup';
import "./filter.scss";
import 'reactjs-popup/dist/index.css';
function Filter() {
    const { t } = useTranslation();


  return (
    <>
            <Popup trigger=
                {<button className="btn btn-sm btn-primary btn-option-group">{t("filter.title")}</button>}
                position="left top">


<div>
<Form role="form" className="price-form">
  <Form.Group>
    <Row>
      <Col lg={6} md={6} sm={12} xs={12}>
        <Form.Label>{t("filter.min")}</Form.Label>
        <Form.Control type="number"  custom>

        </Form.Control>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
        <Form.Label>{t("filter.max")}</Form.Label>
        <Form.Control type="number" custom>

        </Form.Control>
      </Col>
    </Row>
  </Form.Group>
  <Button className="filter-btn-confirm btn-sm" type="submit">{t("filter.title")}</Button>
</Form>
</div>
            </Popup>



 
    </>
    
  );
}

export default Filter;