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
import { height } from '@mui/system';

function InputDeviceForm() {
  
const [selectedOption, setSelectedOption] = useState('');
const [title,setTitle] = useState('');
const[date,setDate] = useState('');
const[time,setTime] = useState('');

const handleOptionChange = (e) => {
  setSelectedOption(e.target.value);
};

const handleTitle = (e) =>{
  setTitle(e.target.value);
}
const handleDate = (e) =>{
  setDate(e.target.value);
}
const handleTime = (e) =>{
  setTime(e.target.value);
}
const testSubmit =(e) =>{
  e.preventDefault();
  axios.post('http://localhost:9000/devices',{
    title : title,
    date : date,
    time : time
  }).then(response=>{
    console.log(title);
    console.log(response.data);
  })
}



  return (

    <div style={{height : '100%', marginTop : '15px' }}>
      
      <div className="form-container ">
      <fieldset className="fieldset-container-meet" >
     
      <Form.Group style={{marginTop : '2em'}}>
        <Row>
        <Form.Label column sm="2" style={{fontSize : '1em', }}>제목 
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" value={title} onChange={handleTitle} placeholder="제목을 입력하세요." />
        </Col>
        </Row>
      </Form.Group>


      <InputGroup>
      <Form.Label column sm="2" style={{padding : '1.1rem', paddingRight : '2.3rem'}}>
          일시 
        </Form.Label>
        <div className='inputType'>
      <input type = "Date" onChange={handleDate} style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem'}}></input> &nbsp;
      <input type = "Time" onChange={handleTime} style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem'}}></input>
      <text> - </text>
      <input type = "Date" style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem', marginLeft : '0.5em'}}></input> &nbsp;
      <input type = "Time" style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem'}}></input>
      </div>
      </InputGroup>
  
      
    <Form.Group as={Row} className="mb-3">
   <Form.Label column sm="2">
     
   </Form.Label>
   <Col sm="6">
     <Row>
       <Col sm="3">
         <Form.Check type="checkbox" label="종일" />
       </Col>
       <Col sm="5">
       </Col>
     </Row>
   </Col>
 </Form.Group>
      
      
      <hr/>
      <Form style={{marginTop : '1em'}}>
    <Form.Group as={Row} className="mb-3" style={{marginBottom : '0.3%'}}>
      <Form.Label column sm="2">
       캘린더 
      </Form.Label>
      <Col sm="8"> 
        <Form.Select aria-label="Default select example">
      <option>[기본]김동민</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
      </Col>
    </Form.Group>

    
  </Form>
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
   <Col sm="6">
     <Row>
     <Col sm="10"> 
        <Form.Select aria-label="Default select example">
      <option>회의실</option>
      <option value="교육장">교육장</option>
    </Form.Select>
      </Col>
       
     </Row>
   </Col>
 </Form.Group>
 
 <Form.Group as={Row} className="mb-3" style={{marginBottom : '0.3%'}}>
        <Form.Label column sm="2">장소
        </Form.Label>
        
        <Col sm="8">
          <Form.Control type="text" placeholder="장소를 입력하세요. " />
        </Col>
        <Form.Label column sm="2">
        </Form.Label>
        {/* <Col sm = "8">
          <Form.Control type = "file"/>
          </Col> */}
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
            <Form.Label column sm="2">
              공개
            </Form.Label>
            <Col sm="2">
              <Col sm="6">
                <Form.Check
                  type="radio"
                  label="공개"
                  name="checkboxGroup"
                  value="option1"
                  checked={selectedOption === 'option1'}
                  onChange={handleOptionChange}
                  style={{ paddingTop: '0.4em' }}
                />
              </Col>
            </Col>
            <Col sm="2">
              <Col sm="">
                <Form.Check
                  type="radio"
                  label="비공개"
                  name="checkboxGroup"
                  value="option2"
                  checked={selectedOption === 'option2'}
                  onChange={handleOptionChange}
                  style={{ paddingTop: '0.4em', textAlign: 'left' }}
                />
              </Col>
            </Col>
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
    
      </fieldset>
    
      </div>

    </div>
  );
}

export default InputDeviceForm;