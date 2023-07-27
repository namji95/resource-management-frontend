import {Nav,Navbar,Button,Container,NavDropdown,Form, Dropdown} from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../css/Header.module.css"
import logo from '../images/wehago.png';

import { saveToken, saveEvent } from '../components/store/CounterSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { border } from '@mui/system';

function Header() {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.info.info);

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(saveToken(localStorage.getItem('accessToken')));
  }
  
  return (
    <>
      <Navbar className={styles.fixedHeader} >
        <Container fluid className = {styles.header}>
          <img className = {styles.logo} alt = "logo" src = {logo}></img>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            
          <div>
            <Form className="d-flex" >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary" className={styles.formControlButton}>Search</Button>
            </Form>
          </div>

          <div className="dropdown" style={{backgroundColor : '#f4f6fc'}}>
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor : '#f4f6fc', border : 'none'}}>
              <b style={{color : '#8d8d8d'}}>{userData.name}</b> &nbsp; <b style={{color : '#8d8d8d'}}>{userData.email}</b>
            </a>
            <ul className="dropdown-menu text-center" style={{textAlign: 'center'}}>
              <li><a className="dropdown-item" href="#">개인정보</a></li>
              <li><a className="dropdown-item" onClick={logout}>로그아웃</a></li>
            </ul>
          </div>
            
        </Container>
      </Navbar>
  </>
  );
}

export default Header;