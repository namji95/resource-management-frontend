import './Device.css';
import './Submit'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Form.css';
import React, { useState,useEffect } from "react";
import myImage from './Image/no_image.png';
import axios from 'axios';

function DeviceForm() {
  const [dvcName,setdvcName] = useState("아이패드");
  const [dvcerror,setdvcError] = useState(null)
  const [inputs, setInputs] = useState({
    dvcSerial : "",
    copAdmin: "",
    location : "",
    company : "",
    dvcBuy : "",
    dvcExplan : "",
    dvcImage : ""
  })
  const handleonChange = (e) => {
    setInputs({
      ...inputs, 
      [e.target.name]: e.target.value 
    })
  };

  const handleChangedvcName = (e) =>{
    setdvcName(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post('http://localhost:9000/devices', {
        dvcSerial: inputs.dvcSerial,
        dvcName: dvcName,
        copAdmin: inputs.copAdmin,
        dvcBuy: inputs.dvcBuy,
        location: inputs.location,
        company: inputs.company,
        dvcExplan: inputs.dvcExplan,  
        // dvcImage: inputs.dvcImage,
      })
      .then((response) => {
        console.log('응답:', response.data);
      })  
      .catch((error) => {
        console.error('데이터 제출 오류:', error);
        alert('실패');
      });
  };
  const handleSelectAll = (e) =>{
    e.preventDefault();
    axios.get('http://localhost:9000/testSelect')
 
  }

  
  return (
    <div>
        <div className='main'>

        <fieldset className="fieldset-container">
        <div className='button'>
        <Button variant="primary" type="" className='button'>
          X
        </Button>
        </div>
        
        <div className="image">
      <img src={myImage} style={{ width: '170px', height: 'auto'}}/>
       </div>
         <text>제품등록 페이지</text><hr></hr>
   
    <Form onSubmit={handleSubmit}>

      <Form.Label>제품 이름</Form.Label>
        <Form.Select name="dvcName" onChange={handleChangedvcName}>
      <option>{dvcName}</option>
      <option value="아이폰">아이폰</option>
      <option value="노트북">노트북</option>
      <option value="카메라">카메라</option>
    </Form.Select>
<p/>
        <Form.Group as={Col} controlId="">
          <Form.Label>제품번호</Form.Label>
          <Form.Control type="text" placeholder="Number"name="dvcSerial"onChange={handleonChange} />
        </Form.Group>
        <p/>

      <Form.Group as={Col} controlId="">
        <Form.Label>제조회사</Form.Label>
        <Form.Control type="text" placeholder="Company"name="company"onChange={handleonChange} />
      </Form.Group>
      <p/>
      <Form.Group as={Col} controlId="">
        <Form.Label>구입년도</Form.Label>
        <Form.Control type="Date" placeholder="Buy"name="dvcBuy" onChange={handleonChange}/>
      </Form.Group>
      <p/>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="">
          <Form.Label>담당자</Form.Label>
          <Form.Control type="text"  placeholder="Manager"name="copAdmin"onChange={handleonChange} />
        </Form.Group>
        <p/>
        <Form.Group as={Col} controlId="">
          <Form.Label>제품장소</Form.Label>
          <Form.Control type="text" placeholder="location"name="location"onChange={handleonChange} />
        </Form.Group>
        <p/>
        <Form.Group controlId="formFile" className="">
        <Form.Label>제품 사진</Form.Label>
        <Form.Control type="text" placeholder="ex)  https://mywado.s3.ap-northeast-2.amazonaws.com/위하여+로고.png"name="dvcImage"onChange={handleonChange} />
      </Form.Group>
      <p/>
        <Form.Group className="mb-3" controlId="">
        <Form.Label>제품 설명서</Form.Label>
        <Form.Control type="text" rows={3} placeholder='제품설명' name = "dvcExplan"onChange={handleonChange} />
      </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="">
        <Form.Check type="checkbox" label="사용설정" />
      </Form.Group>

      <Button variant="primary" type="submit" className='Submit'>
        저장
      </Button>
      <Button variant="primary"  type="cancle" className='Cancle'>
        취소
      </Button>
   
      
    </Form>
    <Form onSubmit={handleSelectAll}>
    <Button variant="primary" type="submit" className='Submit'>
        조회
      </Button>
    </Form>
        </fieldset>

        </div>
        
    </div>
  )
}

export default DeviceForm;
