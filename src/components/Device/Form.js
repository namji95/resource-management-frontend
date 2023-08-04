import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css';
import React, { useState } from "react";



function GridComplexExample() {
  const [category,setCategory] = useState("아이패드");
  const [inputs, setInputs] = useState({
    deviceNumber : "",
    manager: "",
    location : "",
    company : "",
    model : "",
    explanation : ""
  })
  const handleonChange = (e) => {
    setInputs({
      ...inputs, 
      [e.target.name]: e.target.value
    })
  };

  const handleChangeCategory = (e) =>{
    setCategory(e.target.value);
  }
  const handleSubmit = (e) => {
    alert(`저장 목록 : 제품번호 : ${inputs.deviceNumber},제품종류 : ${category},제품담당자 : ${inputs.manager},제품장소: ${inputs.location},제조회사:${inputs.company},제품모델 : ${inputs.model},제품설명 : ${inputs.explanation}`);
    e.preventDefault();
  };

  return (
 
    <Form onSubmit={handleSubmit}>

      <Form.Label>제품 종류</Form.Label>
        <Form.Select name="category" onChange={handleChangeCategory}>
      <option>{category}</option>
      <option value="아이폰">아이폰</option>
      <option value="노트북">노트북</option>
      <option value="카메라">카메라</option>
    </Form.Select>
<p/>
        <Form.Group as={Col} controlId="">
          <Form.Label>제품번호</Form.Label>
          <Form.Control type="text" placeholder="Number"name="deviceNumber"onChange={handleonChange} />
        </Form.Group>
        <p/>

      <Form.Group as={Col} controlId="">
        <Form.Label>제조회사</Form.Label>
        <Form.Control type="text" placeholder="Company"name="company"onChange={handleonChange} />
      </Form.Group>
      <p/>
      <Form.Group as={Col} controlId="">
        <Form.Label>제품모델</Form.Label>
        <Form.Control type="text" placeholder="Model"name="model" onChange={handleonChange}/>
      </Form.Group>
      <p/>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="">
          <Form.Label>담당자</Form.Label>
          <Form.Control type="text"  placeholder="Manager"name="manager"onChange={handleonChange} />
        </Form.Group>
        <p/>
        <Form.Group as={Col} controlId="">
          <Form.Label>제품장소</Form.Label>
          <Form.Control type="text" placeholder="location"name="location"onChange={handleonChange} />
        </Form.Group>
        <p/>
        <Form.Group controlId="formFile" className="">
        <Form.Label>제품 사진</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <p/>
        <Form.Group className="mb-3" controlId="">
        <Form.Label>제품 설명서</Form.Label>
        <Form.Control type="text" rows={3} placeholder='제품설명' name = "explanation"onChange={handleonChange} />
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
  );
}

export default GridComplexExample;