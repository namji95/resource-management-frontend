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
import CalendarSide from '../CalendarSide';
import moment from 'moment/moment';
import CalendarValue from '../CalendarValue';
import MeetingResourceList from './ResourceList';
import DateTimePicker from 'react-datetime-picker';
function InputDeviceForm() {

  ///////////////////////////////////////////// 시간은 라이브러리 써야겠다.... 크롬 되돌리기 라이브러리로..


const [title,setTitle] = useState('');
const [date, setDate] = useState('');
const [time, setTime] = useState('');

const availableTimeSlots = ['10:00', '11:00', '13:00', '14:00', '15:00']; // 예약 가능한 시간대

const handleDateChange = (event) => {
  const selectedDate = event.target.value;
  const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜를 가져옴 (YYYY-MM-DD 형식)
  if (selectedDate >= currentDate) {
    setDate(selectedDate);
  } else {
    alert('과거 날짜는 선택할 수 없습니다.');
  }
};

const handleTimeChange = (event) => {
  setTime(event.target.value);
};

const isSlotAvailable = (selectedDate, selectedTime) => {
  // 선택한 날짜와 시간이 예약 가능한 시간대에 포함되는지 확인
  const selectedDateTime = `${selectedDate} ${selectedTime}`;
  return availableTimeSlots.includes(selectedTime) && new Date(selectedDateTime) > new Date();
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (isSlotAvailable(date, time)) {
    // 여기서 예약 정보를 처리하는 로직을 추가할 수 있습니다.
    console.log('예약 날짜:', date);
    console.log('예약 시간:', time);
  } else {
    alert('선택한 시간은 예약이 불가능합니다.');
  }
};
const testSubmit =(e) =>{
  e.preventDefault();
  axios.post('http://localhost:9000/devices',{
    title : title
  }).then(response=>{
    console.log(title);
    console.log(response.data);
  })
}

  return (

    <div style={{height : '100%', marginTop   : '15px' }}>
      
    
      <Form.Group style={{marginTop : '2em'}}>
        <Row>
        <Form.Label column sm="2" style={{fontSize : '1em', }}>제목 
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" value={title}  placeholder="제목을 입력하세요." />
        </Col>
        </Row>
      </Form.Group>
      <InputGroup>
      <Form.Label column sm="2" style={{padding : '1.1rem', paddingRight : '2.3rem'}}>
          일시 
        </Form.Label>
      
        <div className='inputType'>
        <input type="date" value={date} onChange={handleDateChange} />
        <input type="time" value={time} onChange={handleTimeChange} />
     
      <text> - </text>
      <input type = "Date" style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem', marginLeft : '0.5em'}}></input> &nbsp;
      <input type = "Time" style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem'}}></input>
      </div>
      </InputGroup>
  
      
      
      
      <hr/>
    
      <Form>
      <Form.Group as={Row} className="mb-3" style={{marginBottom : '0.3%'}}>
        <Form.Label column sm="2">
         이름 
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" placeholder="예약자 명" />
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
     설비
   </Form.Label>
   <Col sm="10">
     <Row>
     <Col sm="10"> 
      <MeetingResourceList></MeetingResourceList>
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
                onClick={testSubmit}
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