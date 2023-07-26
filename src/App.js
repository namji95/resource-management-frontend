import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Calendar from './components/calendar/Calendar';
import Signup from './components/member/Signup';
import Login from './components/member/Login';
import Company from './components/company/Company';
import Device from './components/Device/Device';
// import Mypage from './components/MyPage/PageForm';
import Meeting from './components/Metting/InputDeviceForm';
import CompanyList from './components/company/CompanyList';
import EmployeeList from './components/employee/EmployeeList';
import DeviceForm from './components/Device/Device';
import Form from './components/Device/Form';
import Reservation from './components/admin/reservation/AdminReservation';
import ResourceList from './components/facility/ResourceList';
 
function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [token, setToken] = useState(1);

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

              <div style={{border : '1px solid rgba(0,0,0,.08)', backgroundColor :'white', width: windowWidth - 260, height: windowHeight - 50 , position: 'fixed', left: '260px', top: '50px', right: '0', bottom: '0' }}>
                <Routes>
                  {/* 회원 */}
                  <Route path='/main' element = {<Calendar/>}></Route>
                  <Route path='/company' element = {<Company/>}></Route> 
                  <Route path='/device' element = {<Device/>}></Route> 
                  <Route path='/meeting' element = {<Meeting/>}></Route> 
                  {/* 관리자 */}
                  <Route path='/companylist' element = {<CompanyList />}></Route>
                  <Route path='/employeelist' element = {<EmployeeList />}></Route>
                  <Route path='/reservation' element = {<Reservation />}></Route>
                  <Route path='/deviceform' element = {<DeviceForm></DeviceForm>}></Route>
                  <Route path='/device' element = {<Device/>}></Route> 
                  <Route path='/resourcelist' element = {<ResourceList />}></Route>
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