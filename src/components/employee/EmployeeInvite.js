import React, { useState } from "react";
import axios from 'axios';

import styles from './css/EmployeeAdd.module.css';
import { Container } from 'react-bootstrap';

const EmployeeInvite = ({ inviteModal, handleCancel, onInvite }) => {
    const [form, setForm] = useState({
        empEmail:"",
        empName: "",
        empPosition: "",
        copSeq: "",
        userSeq: "",
        authLevel: "",
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
        axios.post('http://localhost:8080/api/employee/mail', {
            empEmail: form.empEmail,
            empName: form.empName,
            empPosition: form.empPosition,
            copSeq: form.copSeq,
            userSeq: form.userSeq,
            authLevel: form.authLevel,
        })
            .then((result) => {
                console.log(result.data)
                alert("이메일 발송 완료")
            })
            .catch((error) => {
                console.log('요청실패');
                console.log(error);
            })



        // // 프엔 ///// 삭제 예정
        // e.preventDefault();

        // onSaveData(form)
        // console.log(form);
        // setForm({
        //     empName: "",
        //     empPosition: "",
        //     copSeq: "",
        //     userSeq: "",
        //     authLevel:"",
        // })
    }


    return (
        <div>
            <div className={styles.cpFormContainer}>
                <fieldset className={styles.cpFieldsetContainer}>
                <Container className={styles.modalHead}>
                <div><h1>사원 등록</h1></div>
                <div><button className={styles.buttonSub} onClick={onCancel}>X</button></div>
                </Container>
                <br/>
                <form onSubmit={handleSubmit}>
                    <div className={styles.editContainer}>
                        <div className={styles.labelInput}><span className={styles.labelItem}>사원명</span>
                        <input
                            className={styles.inputItem}
                            type="text"
                            name="empName"
                            placeholder=""
                            value={form.empName}
                            onChange={handleChange}
                        />
                        </div>
                        <div className={styles.labelInput}><span className={styles.labelItem}>이메일</span>
                        <input
                            className={styles.inputItem}
                            type="text"
                            name="empPosition"
                            placeholder=""
                            value={form.empEmail}
                            onChange={handleChange}
                        />
                        </div>
                      
                    </div>
                <div className={styles.footBtn}>
              <div><button type='reset' className={styles.buttonCancel} onClick={onInvite}>취소</button></div>
              <div><button type='submit' className={styles.buttonSave}>초대</button></div>
            </div>
                    </form>
                </fieldset>
            </div>
        </div>
    )



}

export default EmployeeInvite;