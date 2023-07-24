import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';

import styles from './Company.module.css';


function Company() {
    const [copRegNum, setCopRegNum] = useState("");
    const [copName, setCopName] = useState("");
    const [copAdmin, setCopAdmin] = useState("");

    let data = {};

    return (
        <>
            <div className={styles.page}>
            <h1>회사 등록</h1>
            <br/>
        <h6>회사 정보를 입력해주세요.
            <br/>
            입력한 내용으로 최초 관리자 정보가 설정됩니다.
        </h6>

        <br />
        <span className={styles.inputTitle}>사업자등록번호</span>
        <Form.Control 
            type="text" 
            placeholder="" 
            value={copRegNum}
            onChange={(e) => {
                setCopRegNum(e.target.value);
         }}/>
        <br />

        <span className={styles.inputTitle}>회사명</span>
        <Form.Control
            type="text" 
            placeholder="" 
            value={copName}
            onChange={(e) => {
                setCopName(e.target.value);
            }}
        />
        <br />
        <span className={styles.inputTitle}>관리자 ID</span>
        <Form.Control
            type="text" 
            placeholder="" 
            value={copAdmin}
            onChange={(e) => {
                setCopAdmin(e.target.value);
            }}
        />
        <br />


        <button className={styles.bottomButton}  onClick={() => {
                // axios.post('https://deeb-112-221-198-150.ngrok-free.app/member', {
                axios.post('http://localhost:9000/api/company', {
                    copRegNum: copRegNum,
                    copName: copName,
                    copAdmin: copAdmin
                })
                .then((result) => {
                    data = result.data;
                    console.log(data)
                    alert("신청 완료")
                })
                .catch((error) => {
                    console.log('요청실패');
                    console.log(error);
                })
            }}>서비스 신청하기</button>

            </div>

            
        </>
    )
}

export default Company;




