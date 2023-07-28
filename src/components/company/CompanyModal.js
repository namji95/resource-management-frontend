import React, { useState } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styles from './CompanyUpdate.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function CompanyModal(props) {
  let data = {};
  const copSeq = 1;

  const defaultCompanyObj = {
    copRegNum : "",
    copName :"",
    copAdmin : "",
  }

  const [companyObj, setCompanyObj] = useState(defaultCompanyObj);

  const onChangeCompany = (e) => {
      let newName = e.target.name;
      let newValue = e.target.value;
      const newObj = {
          ...companyObj,
          [newName] : newValue
      }
      setCompanyObj(newObj);
  }

const onReset = () => {
  setCompanyObj(defaultCompanyObj);
}

const closeModal = () => {
    props.setShowModal(!props.showModal);
}

const FacilitySaveModal = (event) => {
    event.preventDefault();


  

  return (
    <div>

<br/>

      <div className={styles.cpFormContainer}>
        <fieldset className={styles.cpFieldsetContainer}>
          <h2>회사 정보</h2>

          <div className={styles.myLabel}>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  사업자등록번호
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text" 
                    placeholder=''
                    value={companyObj.copRegNum}
                    onChange={onChangeCompany}
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
                    value={companyObj.copName}
                    onChange={onChangeCompany}
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
                    value={companyObj.copAdmin}
                    onChange={onChangeCompany}
                  />
                </Col>
              </Form.Group>
            </Form>


          </div>

        </fieldset>

              {/* <div className='Buttoncss'> */}
      <div className={styles.buttonContainer}>
        {/* <input type="reset" class="btn btn-outline-secondary" value="취소" /> */}
        <input type="reset" class={styles.buttoncancle} value="취소" />
        <button 
          // class="btn btn-primary" 
          class={styles.buttonSave} 
          type="submit"
          onClick={() => {
            axios.put(`http://localhost:9000/api/company/${copSeq}`, {
                copRegNum: companyObj.copRegNum,
                copName: companyObj.copName,
                copAdmin: companyObj.copAdmin
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
}

export default CompanyModal;