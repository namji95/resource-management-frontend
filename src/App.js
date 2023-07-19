import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Calendar from './components/calendar/Calendar';
import Signup from './components/member/Signup';
import Login from './components/member/Login';
import Company from './components/company/Compamy';
import Device from './components/Device/Device';
// import Mypage from './components/MyPage/PageForm';
import Meeting from './components/Metting/InputDeviceForm';
import Car from './components/Car/Car';

<<<<<<< HEAD
import ReserveModal from './compontents/ReserveModal'
import Sidebar from './compontents/Sidebar';
=======
>>>>>>> c138353d50f772288f53d554e74da168954dea3f

function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [token, setToken] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (

    <div className = "App">
      {token === 0 ? 
        <div className = "body" style={{backgroundColor: '#F7F7F7'}}>
          <div className= "main" >

            <Routes>
              <Route path='/' element = {<Login/>}></Route>
              <Route path='/signup' element = {<Signup/>}></Route>
            </Routes>

          </div>
        </div>
      :
        <React.Fragment>
        <Header/>
          <div className = "body" >
            <Sidebar />
            <div className= "main" >
              <div style={{border : '1px solid black', backgroundColor :'white', width: windowWidth - 300, height: windowHeight - 77 , position: 'fixed', left: '300px', top: '77px', right: '0', bottom: '0' }}>

                <Routes>
                  <Route path='/main' element = {<Calendar/>}></Route>
                  <Route path='/company' element = {<Company/>}></Route> 
                  <Route path='/device' element = {<Device/>}></Route> 
                  <Route path='/meeting' element = {<Meeting/>}></Route> 
                  <Route path='/car' element = {<Car/>}></Route> 
                </Routes>
              
              </div>
            </div>
            
            <div>

            </div>
          
          </div>
          </React.Fragment>
      }
    </div>
  );
}

export default App;
