import './App.css';
import { useEffect, useState } from 'react';
import Board from './compontents/Board.js';
import Input from './compontents/Input.js';
import { BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Header from './compontents/Header.js';
import Room from './compontents/Room.js';
import {Container, Row, Col, Card, Form, Button,Navbar } from "react-bootstrap";

import ReserveModal from './compontents/ReserveModal'
import Sidebar from './compontents/Sidebar';

function App() {
  
  return (
    <div className = "App">

      
{/* 
      <Routes>
        <Route path="/input" element ={<Input></Input>}></Route>
        <Route path='/board' element = {<Board></Board>}></Route>
        <Route path='/room' element = {<Room></Room>}></Route>
      </Routes> */}

      <Header/>
      <div className = "body">
        <Sidebar/>
        <div className= "main">
          <div style={{border : '1px solid black', height : '100vw',width : '100vw',backgroundColor :'red'}}>
            메인 컨텐트입니다. test
            {/* <ReserveModal/> */}
          </div>
        </div>
        
      <div>

      </div>
      
      </div>
    </div>
  );
}

export default App;
