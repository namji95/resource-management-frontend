import React, { useState } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Cp_Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


function CpForm() {

  const [copRegNum, setCopRegNum] = useState();
  const [copName, setCopName] = useState();
  const [copAdmin, setCopAdmin] = useState();

  let data = {};
  const copSeq = 1;

  

  return (
    <div>

<br/>

      <div className="Cp_form-container">
        <fieldset className="Cp_fieldset-container">
          <h2>회사 정보</h2>

          <div className='labe1'>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  사업자등록번호
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text" 
                    placeholder=''
                    value={copRegNum}
                    onChange={(e) => {
                      setCopRegNum(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
            </Form>

            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  회사명
                </Form.Label>
                <Col sm="10">
                  <Form.Control 
                    type="text" 
                    placeholder=''  
                    value={copName}
                    onChange={(e) => {
                      setCopName(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
            </Form>

            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  관리자 ID
                </Form.Label>
                <Col sm="10">
                  <Form.Control 
                    type="text" 
                    placeholder='' 
                    value={copAdmin}
                    onChange={(e) => {
                      setCopAdmin(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
            </Form>


          </div>

        </fieldset>

              {/* <div className='Buttoncss'> */}
      <div className='button-contain'>
        <input type="reset" class="btn btn-outline-secondary" value="취소" />
        <button 
          class="btn btn-primary" 
          type="submit"
          onClick={() => {
            axios.put(`http://localhost:9000/api/company/${copSeq}`, {
                copRegNum: copRegNum,
                copName: copName,
                copAdmin: copAdmin
            })
            .then((result) => {
                data = result.data;
                console.log(data)
                alert("수정 완료")
            })
            .catch((error) => {
                console.log('요청실패');
                console.log(error);
            })
        }}>수정</button>


      </div>

      </div>
    </div>
  );
}

export default CpForm;