import {React,useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

import { FaUserAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';
import styles from "../css/Sidebar.module.css"


const barData = [
  {
    title : '나의 예약정보',
    path : '/',
    icon : <FaUserAlt/>,
    cName : 'navText'
  },
  {
    title : '회의실',
    path : '/',
    icon : <AiIcons.AiFillHome/>,
    cName : 'navText'
  },
  {
    title : '모바일 기기',
    path : '/',
    icon : <AiIcons.AiFillHome/>,
    cName : 'navText'
  },
  {
    title : '차량',
    path : '/',
    icon : <AiIcons.AiFillHome/>,
    cName : 'navText'
  },

]

function Sidebar(){

  return (
    <>
      <nav className ={`${styles.navMenu} ${styles.navbarMargin}`}>         
        <ul className ={styles.navMenuItems} >
          <Link to = "/room" >
            <button className = {styles.reserveButton} >+예약하기</button>
          </Link>
          {barData.map((item,index)=>{
            return (
              <li key = {index} className={`${styles.item} ${styles[item.cName]}`}>
                <Link to = {item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
