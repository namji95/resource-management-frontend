import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board.js';
import Input from './components/Input.js';
import { BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Header from './components/Header.js';
import Room from './components/Room.js';
import {Container, Row, Col, Card, Form, Button,Navbar } from "react-bootstrap";

// import ReserveModal from './compontents/ReserveModal'
import Sidebar from './components/Sidebar';
import { Height } from '@mui/icons-material';
import { height, width } from '@mui/system';
import InputDeviceForm from './components/Metting/InputDeviceForm';
import DeviceForm from './components/Device/Device';
import PageForm from './components/Page9/PageForm';

function App() {
  
  return (
    <div className = "App">

      
{/* 
      <Routes>
        <Route path="/input" element ={<Input></Input>}></Route>
        <Route path='/board' element = {<Board></Board>}></Route>
        <Route path='/room' element = {<Room></Room>}></Route>
        <Route path='/metting' element = {<InputDeviceForm/>}</Route>
      </Routes> */}

      <Header/>
      <div className = "body">
        <Sidebar/>
        <div className= "main">
          <div style={{border : '1px solid black', height : '100vw',width : '100vw'}}>
            {/* <ReserveModal/> */}
           <InputDeviceForm></InputDeviceForm>
          </div>
        </div>
        
      <div>

      </div>
      
      </div>
    </div>
  );
}

export default App;
