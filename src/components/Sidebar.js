import {React,useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaUserAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';
import styles from "../css/Sidebar.module.css";
import itemStyles from '../css/SidebarItem.module.css';
import { green, red } from '@mui/material/colors';
import moment from 'moment/moment';
import './sidebarDate.css';
import CalendarSide from './CalendarSide';

import { useSelector } from 'react-redux';

const barData = [
  {
    title : '나의 예약정보',
    path : '/main',
    icon : <AiIcons.AiFillContacts/>,
    cName : 'navText'
  },
  {
    title : '나의 프로필',
    path : '/mypage',
    icon : <FaUserAlt/>,
    cName : 'navText'
  },
]

const adminData = [
  {
    title : '회사 관리',
    path : '/company',
    icon : <AiIcons.AiFillShop/>,
    cName : 'navText'
  },
  {
    title : '사원 관리',
    path : '/employee',
    icon : <AiIcons.AiOutlineTeam/>,
    cName : 'navText'
  },
  {
    title : '자원 관리',
    path : '/resourceList',
    icon : <AiIcons.AiFillHdd/>,
    cName : 'navText'
  },
  {
    title : '예약 관리',
    path : '/Reservation',
    icon : <AiIcons.AiFillCarryOut/>,
    cName : 'navText'
  },
]

function Sidebar() {

  const user = useSelector((state) => state.info.info);

  const authenticated = () => {
  
    const authLevel = user.authLevel === 'MANAGER' || user.authLevel === 'MASTER';
    
    return authLevel;
  }

  const [Datevalue, setValue] = useState();  

  return (
    <>
      <nav className ={`${styles.navMenu} ${styles.navbarMargin}`}>         
        <ul className ={styles.navMenuItems} >
          <Link to = "/meeting" >
            <button className = {`${styles.reserveButton}`} style={{margin : '30px', marginRight : '60px', marginTop : '10px', color : 'white'}}>+ 예약하기</button>
          </Link>
      
          <div className={itemStyles.sideItem}>
          {barData.map((item,index)=>{
            return (
              <li key = {index} className={`${styles.item} ${styles[item.cName]}`}>
                <Link to = {item.path}>
                  {item.icon} &nbsp;&nbsp;
                  <span style={{color : '#306AA3'}}>{item.title}</span>
                </Link>
              </li>
            )
          })}
          </div>

          {authenticated() ? 

          <div className={itemStyles.sideItem}>
          {adminData.map((item,index)=>{
            return (
              <li key = {index} className={`${styles.item} ${styles[item.cName]}`}>
                <Link to = {item.path}>
                  {item.icon} &nbsp;&nbsp;
                  <span style={{color : '#306AA3'}}>{item.title}</span>
                </Link>
              </li>
            )
          })}
          </div>

          :

          <></>
          }

        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
