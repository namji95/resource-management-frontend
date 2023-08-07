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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import { Today } from '@mui/icons-material';
import ResourceList from '../facility/ResourceList';

function InputDeviceForm() {
  const [rsvTitle,setTitle] = useState('');
  const now = new Date();
  const onestartHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  const oneEndHourLater = new Date(onestartHourLater.getTime() + 60 * 60 * 1000);
 
  const [rsvStart, setRsvStart] = useState(onestartHourLater);
  const [rsvEnd, setRsvEnd] = useState(oneEndHourLater);


  const handleStartChange = (date) => {
    setRsvStart(date);
  };
  const handleEndChange = (date) => {
    setRsvEnd(date);
  };
 const [testValue,setTestValue] = useState(9);


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


  const testSubmit = (e) =>{
    e.preventDefault();
    console.log(rsvStart);
    console.log(rsvEnd);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  useEffect(() => {
    console.log('Start date:', rsvStart);
    console.log('End date:', rsvEnd);
  }, [rsvStart, rsvEnd]);


  return (
    <div style={{height : '100%', marginTop   : '15px' }}>
      <Form.Group style={{marginTop : '2em'}}>
        <Row>
        <Form.Label column sm="2" style={{fontSize : '1em', }}>제목 
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" value={rsvTitle}  placeholder="제목을 입력하세요." />
        </Col>
        </Row>
      </Form.Group>
      <InputGroup>
        <Form.Label column sm="2" style={{padding : '1.1rem', paddingRight : '2.3rem'}}>
          일시 
        </Form.Label>
        <div className='endText'> 시작 시간 : </div>
    
         <DatePicker
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
    ></DatePicker>
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