import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import CloseButton from 'react-bootstrap/CloseButton';
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import styles from './AdminReservation.module.css'; 
import Container from 'react-bootstrap/Container';

function AdminReservation() {
    const [selectedOption, setSelectedOption] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = useState('');
 
    // 날짜 변경 함수
    const handleNextDate = () => {
      // 현재 날짜를 newDate에 복사하고, 날짜를 하루 뒤로 설정
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      // newDate 상태 업데이트
      setDate(newDate.toISOString().slice(0, 10));
    };
       // 날짜 변경 함수
       const handledownDate = () => {
        // 현재 날짜를 newDate에 복사하고, 날짜를 하루 뒤로 설정
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + -1);
        // newDate 상태 업데이트
        setDate(newDate.toISOString().slice(0, 10));
      };

  return (
    <container>
       <div>
        {/* <fieldset className={styles.pgFieldset}> */}
        <Container>
        
        <div className="d-flex align-items-center">
            <h2 className='left ml-auto'>예약관리</h2>
            {/* <h2 className={styles.left}>예약관리</h2> */}
            {/* <CloseButton className="d-flex align-items-end" /> */}
          </div>
<br/>       
    <div>
    {/* <span className={styles.left}>sky0202 교육장</span> */}
<br/>
    </div>

    <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
            </Form.Label>
            <Col sm="6" className="d-flex align-items-center">
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field2" />
              <button className={styles.datehandle} onClick={handleNextDate}>&lsaquo;</button>
              <button className={styles.datehandle} onClick={handledownDate}>&rsaquo;</button>
            </Col>
          </Form.Group>
    <hr></hr>

        <Row className='field2'>
        <Col>시작일</Col>
            <Col>시작 시간</Col>
            <Col>종료일</Col>
            <Col>종료 시간</Col>
            <Col>제목</Col>
            <Col>예약자</Col>
        </Row>
      </Container>
      <div className={styles.enter}></div>
      <Container>
        <Row>
        <Col>2023.07.10</Col>
        <Col>오전 11:00</Col>
        <Col>2023.07.10</Col>
        <Col>오후 12:00</Col>
         <Col>회의</Col>
        <Col>김동민</Col>
      
      </Row>
      </Container>  
      {/* </fieldset> */}
    </div>

    </container>
    
  

  );
}

export default AdminReservation;