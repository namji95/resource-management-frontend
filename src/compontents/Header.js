import {Nav,Navbar,Button,Container,NavDropdown,Form} from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../css/Header.module.css"
import logo from '../images/wehago.png';



function Header() {
  return (
    <>
      <Navbar  bg="light" data-bs-theme="light">
        <Container className = {styles.header}>
          <img className = {styles.logo} alt = "logo" src = {logo}></img>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          <div>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
            </div>

            <div>
              
            </div>
            
        </Container>
      </Navbar>
  </>
  );
}

export default Header;