import React, { useState } from "react";
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import styles from './CompanyAdd.module.css';
import { Container } from 'react-bootstrap';

const CompanyAdd = ({ onSaveData, handleCancel }) => {
    const [form, setForm] = useState({
        copRegNum: "",
        copName: "",
        copState: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }
    const onCancel = () => {
        handleCancel();
      }

    const handleSubmit = (e) => {
        // 백엔
        axios.post('http://localhost:8080/api/company', {
            copRegNum: form.copRegNum,
            copName: form.copName,
            copState: form.copState
        })
            .then((result) => {
                console.log(result.data)
                alert("신청 완료")
            })
            .catch((error) => {
                console.log('요청실패');
                console.log(error);
            })



        // 프엔
        e.preventDefault();

        onSaveData(form)
        console.log(form);
        setForm({
            copRegNum: "",
            copName: "",
            copState: "",
        })
    }

   const data = {}

    return (
        <div>
            <div className={styles.cpFormContainer}>
                <fieldset className={styles.cpFieldsetContainer}>
                <Container className={styles.modalHead}>
                <div><h1>회사 등록</h1></div>
                <div><button className={styles.buttonSub} onClick={onCancel}>X</button></div>
                </Container>
                <br/>

                <div>
                    <h6>회사 정보를 입력해주세요.<br/>입력한 내용으로 최초 관리자 정보가 설정됩니다.</h6>
                </div>

                <br/>

                <form onSubmit={handleSubmit}>
                    <div className={styles.editContainer}>
                        <div className={styles.labelInput}><span className={styles.labelItem}>사업자등록번호</span>
                        <input
                            className={styles.inputItem}
                            type="text"
                            name="copRegNum"
                            placeholder=""
                            value={form.copRegNum}
                            onChange={handleChange}
                        />
                        </div>
                        <div className={styles.labelInput}><span className={styles.labelItem}>회사명</span>
                        <input
                            className={styles.inputItem}
                            type="text"
                            name="copName"
                            placeholder=""
                            value={form.copName}
                            onChange={handleChange}
                        />
                        </div>
                    </div>


                {/* <lebel htmlFor="copState" className={styles.inputTitle}>관리자 여부</lebel>
                <Form.Control
                    type="text"
                    name="copState"
                    placeholder=""
                    value={form.copState}
                    onChange={handleChange}
                />
                <br /> */}
                <div className={styles.footBtn}>
              <div><button type='reset' className={styles.buttonCancel} onClick={onCancel}>취소</button></div>
              <div><button type='submit' className={styles.buttonSave}>저장</button></div>
            </div>
                    </form>
                </fieldset>
            </div>
        </div>
    )



}

export default CompanyAdd;