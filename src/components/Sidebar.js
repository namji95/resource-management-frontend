import {React,useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

import { FaUserAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';
import styles from "../css/Sidebar.module.css";
import itemStyles from '../css/SidebarItem.module.css';
import { green, red } from '@mui/material/colors';

const barData = [
  {
    title : '나의 예약정보',
    path : '/main',
    icon : <FaUserAlt/>,
    cName : 'navText'
  },
  {
    title : '회의실',
    path : '/meeting',
    icon : <AiIcons.AiFillHome/>,
    cName : 'navText'
  },
  {
    title : '모바일 기기',
    path : '/device',
    icon : <AiIcons.AiFillMobile/>,
    cName : 'navText'
  },
  {
    title : '차량',
    path : '/car',
    icon : <AiIcons.AiFillCar/>,
    cName : 'navText'
  },
]

function Sidebar() {

  return (
    <>
      <nav className ={`${styles.navMenu} ${styles.navbarMargin}`}>         
        <ul className ={styles.navMenuItems} >
          <Link to = "/room" >
            <button className = {`${styles.reserveButton}`} style={{margin : '30px', marginRight : '60px', marginTop : '10px'}}>+ 예약하기</button>
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
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
