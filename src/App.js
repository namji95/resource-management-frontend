import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
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


function App() {
  
  return (
    <div className = "App">
      {/* 하늘이 라우터 */}
      
      
      <Header/>
      <div className = "body" >
        <Sidebar />
        <div className= "main" >
          <div style={{border : '1px solid black', backgroundColor :'white', width: '79vw', height: '90vh' , position: 'fixed', left: '300px', top: '77px', right: '0', bottom: '0' }}>
            {/* <ReserveModal/> */}

            <Routes>
        
              <Route path='/main' element = {<Calendar></Calendar>}></Route>
              <Route path='/signup' element = {<Signup></Signup>}></Route>
              <Route path='/login' element = {<Login></Login>}></Route>
              <Route path='/company' element = {<Company></Company>}></Route> 
              {/* <Route path='/mypage' element = {<Mypage></Mypage>}></Route>  */}
              <Route path='/device' element = {<Device></Device>}></Route> 
              <Route path='/meeting' element = {<Meeting></Meeting>}></Route> 
              <Route path='/car' element = {<Car></Car>}></Route> 

            
            </Routes>
          </div>
        </div>
        
      <div>

      </div>
      
      </div>
    </div>
  );
}

export default App;
