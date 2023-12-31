import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Calendar from './components/calendar/Calendar';
import Signup from './components/member/Signup';
import Login from './components/member/Login';
import Company from './components/company/Company';
import Device from './components/Device/Device';
import Mypage from './components/MyPage/PageForm';
import Meeting from './components/Meeting/InputDeviceForm';
import CompanyList from './components/company/CompanyList';
import EmployeeList from './components/employee/EmployeeList';
import DeviceForm from './components/Device/Device';
import Form from './components/Device/Form';
import Reservation from './components/admin/reservation/AdminReservation';
import ResourceList from './components/facility/ResourceList';
import Employee from './components/employee/Employee';
import CreateCop from './components/member/CreateCop';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { saveToken, saveEvent, saveInfo } from './components/store/CounterSlice';
 
function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  //const [forcedDelToken, setForcedDelToken] = useState(true);

  // redux-toolkit dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.info.token);
  const user = useSelector((state) => state.info.info);

  // redux true function
  const existLoginData = () => {

    const existToken = (token !== '' && token !== null && token !== undefined);
    const existCop = (user.copSeq !== '' && user.copSeq !== null && user.copSeq !== undefined);
    const existState = (user.userState !== '' && user.userState !== null && user.userState !== undefined);

    return existToken && existCop && existState
  }

  // 토큰과 유저 정보가 모두 존재하는지 확인
  const isLoggedIn = existLoginData();

  // CreateCop 에 접근할 수 있을지 없을지
  const goToCreateCop = () => {

    const existToken = (token !== '' && token !== null && token !== undefined);
    const existCop = (user.copSeq === null);
    const existState = (user.userState !== '' && user.userState !== null && user.userState !== undefined); // 일단 userState 회원 상태가 true, false 는 제외

    return (existToken && existCop && existState) 
  }
  
  // 토큰, user_state 가 true, cop_seq는 
  const accessCopComponent = goToCreateCop();
  

  useEffect(() => {

    // if (localStorage.getItem('userInfo')) {
    //   dispatch(saveInfo({
    //     name : JSON.parse(localStorage.getItem('userInfo')).userName,
    //     email : JSON.parse(localStorage.getItem('userInfo')).userEmail,
    //   }));
    // }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  useEffect(() => {

    function localStorageListener(event) { // StorageEvent 는 local, session 스토리지에 저장된 데이터가 변경되었을 때 발생
      if (event.storageArea !== localStorage) return // 이벤트가 localStorage 에서 발생한 것인지 확인
        if (event.key === 'accessToken') {
          localStorage.clear();
          dispatch(saveToken(localStorage.getItem('accessToken')));
          //setForcedDelToken(false);
        }
        if (event.key === 'userInfo') {
          localStorage.clear();
          dispatch(saveToken(localStorage.getItem('accessToken')));
        }
      }

      window.addEventListener('storage', localStorageListener); // 로컬스토리지에 변경발생시 함수 실행

      return () => {
        window.removeEventListener('storage', localStorageListener) // 컴포넌트 언마운트, 업데이트 되기전 등록된 이벤트 리스너 정리
      }
  }, []);

  // 이 useEffect() 필요한가...?.. redux 초기화..?
  useEffect(() => {
    
    dispatch(saveToken(localStorage.getItem('accessToken')));
    if (localStorage.getItem('userInfo')) {
      dispatch(saveInfo({
        copSeq : JSON.parse(localStorage.getItem('userInfo')).copSeq,
        copName : JSON.parse(localStorage.getItem('userInfo')).copName,
        userSeq : JSON.parse(localStorage.getItem('userInfo')).userSeq,
        userId : JSON.parse(localStorage.getItem('userInfo')).userId,
        userName : JSON.parse(localStorage.getItem('userInfo')).userName,
        userEmail : JSON.parse(localStorage.getItem('userInfo')).userEmail,
        userState : JSON.parse(localStorage.getItem('userInfo')).userState,
        userImage : JSON.parse(localStorage.getItem('userInfo')).userImage,
        empPosition : JSON.parse(localStorage.getItem('userInfo')).empPosition,
        empImage : JSON.parse(localStorage.getItem('userInfo')).empImage,
        authLevel : JSON.parse(localStorage.getItem('userInfo')).authLevel,
      }));
    }
  }, [dispatch])

  if (!isLoggedIn) {

    return (
      <div className = "App" style={{height : '100%'}} >
        <React.Fragment>
          <div className = "body" style={{backgroundColor: '#F7F7F7'}}>
            <div className= "main" >
            <Routes>
                <Route path='/' element = {<Login/>}></Route>
                <Route path='/signup' element = {<Signup/>}></Route>
                <Route path='/create/cop' element={
                  accessCopComponent ? <CreateCop /> : <Navigate to = "/" replace />
                }>
                </Route>
                <Route path='/*' element={<Navigate to = "/" replace />} />
            </Routes>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }

  return (
    <div className = "App">
      <React.Fragment>
        <Header/>
          <div className = "body" >
            <Sidebar />
              <div className= "main" >
                  <div style={{border : '1px solid rgba(0,0,0,.08)', overflow : 'hidden' , backgroundColor :'white', width: windowWidth - 260, height: windowHeight - 50 , position: 'fixed', left: '260px', top: '50px', right: '0', bottom: '0' }}>
                    <Routes>

                      <Route path='/' element = {<Calendar></Calendar>}></Route>
                      {/* 회원 */}
                      <Route path='/main' element = {<Calendar/>}></Route>
                      <Route path='/company' element = {<Company/>}></Route> 
                      <Route path='/device' element = {<Device/>}></Route> 
                      <Route path='/meeting' element = {<Meeting/>}></Route> 
                      <Route path='/mypage' element = {<Mypage/>}></Route> 

                      <Route path='/companylist' element = {<CompanyList />}></Route>
                      <Route path='/employeelist' element = {<EmployeeList />}></Route>
                      <Route path='/reservation' element = {<Reservation />}></Route>
                      <Route path='/deviceform' element = {<DeviceForm></DeviceForm>}></Route>
                      <Route path='/device' element = {<Device/>}></Route> 
                      <Route path='/resourcelist' element = {<ResourceList />}></Route>
                      <Route path='/employee' element = {<Employee />}></Route>


                      <Route path='/*' element = {<Navigate to = "/" />}></Route>

                    </Routes>
                    
                    </div>
              </div>
          </div>
      </React.Fragment>
    </div>
  );

}

export default App;