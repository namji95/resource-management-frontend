import React, { useEffect, useState } from 'react';
import { Navbar, Button, Container, Form } from 'react-bootstrap';
import styles from '../css/Header.module.css';
import logo from '../images/wehago.png';
import { saveToken, saveEvent } from '../components/store/CounterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import MyPage from './MyPage/PageForm';
import EditProfileForm from './MyPage/PwUdate';

function Header() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.info.info);
  const logout = () => {
    localStorage.clear();
    dispatch(saveToken(localStorage.getItem('accessToken')));
  };
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);

  const handleShowEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
  };

  useEffect(() => {
    console.log(userData);
  }, [])

  return (
    <>
      <Navbar className={styles.fixedHeader}>
        <Container fluid className={styles.header}>
        <div className="d-flex align-items-center">
          <img className={styles.logo} alt="logo" src={logo}></img>
          <Navbar.Brand>Navbar</Navbar.Brand>
        </div>

          <div className="dropdown" style={{ backgroundColor: '#f4f6fc' }}>
            <a
              className="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: '#f4f6fc', border: 'none' }}
            >
              <b style={{ color: '#8d8d8d' }}>{userData.userName}</b> &nbsp;
              <b style={{ color: '#8d8d8d' }}>{userData.userEmail}</b>
            </a>
            <ul className="dropdown-menu text-center" style={{ textAlign: 'center' }}>
              <li>
                <a className="dropdown-item" onClick={logout}>
                  로그아웃
                </a>
              </li>
              <li>
                  <a className="dropdown-item" onClick={handleShowEditProfile}>
                  비밀번호 변경
                </a>
              </li>
            </ul>
          </div>
            <EditProfileForm show={showEditProfile} onClose={handleCloseEditProfile} />
        </Container>
      </Navbar>
    </>
  );
}

export default Header;