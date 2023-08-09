import 'bootstrap/dist/css/bootstrap.min.css';
import './InputDeviceForm.css'
import './FormEx.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './Button.css'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import { useSelector } from 'react-redux';
import resourceListStyle from '../facility/css/ResourceList.module.css';

import FacilityTable from '../facility/FacilityTable';
function InputDeviceForm() {
 
  const now = new Date();
  const onestartHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  const oneEndHourLater = new Date(onestartHourLater.getTime() + 60 * 60 * 1000);

   const [currData, setCurrData] = useState({
     dataList: []
  });

  const handleStartChange = (date) => {
    setRsvStart(date);
  };
  const handleEndChange = (date) => {
    setRsvEnd(date);
  };

 const filterPassedTime = (time) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};
  const filterPassedEndTime = (time) => {
    const currentDate = new Date(rsvStart);
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  }  


  const [rsvStart, setRsvStart] = useState(onestartHourLater);
  const [rsvEnd, setRsvEnd] = useState(oneEndHourLater);

  const [facility,setFacility] = useState('carsearch');

  const userDataInRedux = useSelector((state) => state.info.info);
  const token = useSelector((state) => state.info.token);

  const [Users,setUsers] = useState({
    userName : "",
    copSeq : "",
    userId : ""
  })

  useEffect(() => {

    setUsers((prevUsers) => ({
      ...prevUsers,  
      userName : userDataInRedux.userName,
    }))
  }, []);


  const [rsvSave,setRsvSave] = useState({
    rsvTitle : "",
    rsvParti : "", 
    rsvExplain : ""
  });

  // 설비 테이블 조회
  const SerachButton = (e) => {
    
    e.preventDefault();
    let Data1 = {
      rsvStart: rsvStart, 
      rsvEnd: rsvEnd,
    }
   
  const apiUrl = `http://localhost:8080/api/car/${facility}`;


    axios.post(apiUrl, Data1,{
    headers: {  Authorization : token }, 
    }).then(response =>{
    console.log(response.data);
    setCurrData({
      dataList: response?.data?.data?.list || []
    });
    alert("예약 조회 성공");
   })
  .catch(error => {
    alert("예약 조회 실패",error);
   });
  }

  // // 예약 테이블 insert
  // const testSubmit = (e) =>{
  //   console.log(rsvStart);
  //   console.log(rsvEnd);
  //   e.preventDefault();
  //   let Data2 = {
  //     rsvStart: rsvStart, 
  //     rsvEnd: rsvEnd,
  //     rsvTitle : rsvSave.rsvTitle,
  //     copSeq : Users.copSeq,
  //     userName : Users.userName
  //   }
  //   console.log(rsvStart);
  //   console.log(rsvEnd);
  //   const formData = new FormData();
  //   formData.append("data", new Blob([JSON.stringify(Data2)],{
  //   type: "application/json"
  // }));
  //   axios.post("http://localhost:8080/api/reservation",Data2, {
  //     headers: { 'Content-Type': 'application/json' }, 
  //   }).then(response =>{
  //     console.log(response.data);
  //     alert("등록 완료");
  //   })
  //   .catch(error => {
  //     alert("등록 실패",error);
  // });
  // }

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  useEffect(() => {
    console.log('Start date:', rsvStart);
    console.log('End date:', rsvEnd);
  }, [rsvStart, rsvEnd]);


  const OnchangeReservation = (e) => {
    let newName = e.target.name;
    let newValue = e.target.value;
    const newObj = {
        ...rsvSave,
        [newName] : newValue,
    }
    setRsvSave(newObj);
}
const Onchangefacility = (e) => {
  let newValue = e.target.value;
  setFacility(newValue);
}

  return (
    <div style={{height : '100%', marginTop   : '15px' }}>
      <Form.Group style={{marginTop : '2em'}}>
        <Row>
        <Form.Label column sm="2" style={{fontSize : '1em', }}>제목 
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" name = "rsvTitle" value={rsvSave.rsvTitle} onChange={OnchangeReservation} placeholder="제목을 입력하세요." />
        </Col>
        </Row>
      </Form.Group>
      <InputGroup>
        <Form.Label column sm="2" style={{padding : '1.1rem', paddingRight : '2.3rem'}}>
          일시 
        </Form.Label>
        <div className='endText'>
        <select
          name="facility" // rsvDetail 값을 변경하기 위해 name 속성 추가
          style={{ 'margin-right': '90px' }}
          onChange={Onchangefacility} // 변경 이벤트 추가
          value={facility} // 선택된 값
        >
          <option value={'carsearch'}>차량</option>
          <option value={'devicesearch'}>전자기기</option>
          <option value={'roomsearch'}>공간</option>
        </select>
    </div>
        <div className='endText'> 시작 시간 : </div>
    
         <DatePicker
      className='startTime'
      selected={rsvStart}
      onChange={handleStartChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={60}
      dateFormat="yyyy-MM-dd aa h :00"
      locale={ko}
      minDate={today}
      filterTime={filterPassedTime}
      // includeTimes={availableTimes} // 사용 가능한 시간 목록을 전달
    />
    
     <div className='endText'> 종료 시간 : </div>
    <DatePicker
      className='endTime'
      selected={rsvEnd}
      onChange={handleEndChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={60}
      dateFormat="yyyy-MM-dd aa h:00"
      locale={ko}
      minDate={today}
      filterTime={filterPassedEndTime}
      // includeTimes={availableTimes}
    >
    </DatePicker>
    <div className='SearchButton'>
    <button onClick={SerachButton}>검색</button>
    </div>
     </InputGroup>
     
      <hr/>
      <Form>
        <Form.Group as={Row} className="mb-3" style={{marginBottom : '0.3%'}}>
          <Form.Label column sm="2">
            이름 
          </Form.Label>
          <Col sm="8">
            <Form.Control type="text" Value = {Users.userName} readOnly/>
          </Col>
        </Form.Group>
      </Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2" style={{marginBottom : '0.3%'}}>
          수용인원
        </Form.Label>
        <Col sm="6">
          <Row>
            <Col sm="10"> 
              <Form.Control placeholder='인원 수를 입력하세요.'></Form.Control>
            </Col>
          </Row>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2" style={{marginBottom : '0.3%'}}>
          설비 조회
        </Form.Label>
        <Col sm="10">
          <Row>
            <Col sm="10"> 
            <div className="categoeryreservation">
        <div className={resourceListStyle.resourceList}>
          <div>
            {currData?.dataList?.length ?
              <FacilityTable category={currData.category} dataList={currData.dataList} />
              : <span>검색 결과가 없습니다.</span>
            }
          </div>
        </div>
      </div>

            </Col>
          </Row>
        </Col>
      </Form.Group>
      <Form>
        <Form.Group as={Row} className="mb-3" style={{marginBottom : '0.3%'}}>
          <Form.Label column sm="2">
            메모
          </Form.Label>
          <Col sm="8">
            <Form.Control as="textarea" rows={5} placeholder='메모를 입력하세요.'/>
          </Col>
        </Form.Group>
      </Form>
      <Form>
        <Form.Group as={Row} className="mb-3">
          {/* 저장 버튼 */}
          <Col sm="4">
            <Button
              type="submit"
              className="submit"
              // onClick={testSubmit}
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '0.375rem',
                marginBottom : '10rem'
              }}
            >
              저장
            </Button>
          </Col>
          {/* 취소 버튼 */}
          <Col sm="2">
            <Button
              as="input"
              type="button"
              className="buttoncancle"
              value="취소"
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '0.375rem',
              }}
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default InputDeviceForm;