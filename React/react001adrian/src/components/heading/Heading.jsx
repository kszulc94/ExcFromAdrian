import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../resources/navbar-logo.svg";
import { useTranslation } from "react-i18next";
function Heading() {
  const {t} = useTranslation();
  return (
    <div className="heading heading-margin">
      <Navbar fixed = "top" bg="light" expand="lg">
        <Container >
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">{t('navbar.home')}</Nav.Link>
              <Nav.Link href="#link">{t('navbar.about')}</Nav.Link>
              <NavDropdown title={t('navbar.panel.title')} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">{t('navbar.panel.orders')}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                {t('navbar.panel.contact')}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                {t('navbar.panel.rules')}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                {t('navbar.panel.loginRegister')}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Heading;
