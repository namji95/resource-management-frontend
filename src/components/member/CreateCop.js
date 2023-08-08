import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import styles from './css/CreateCop.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

import { saveInfo, saveToken } from '../../components/store/CounterSlice';

function CreateCop() {

  const [copRegNum, setCopRegNum] = useState("");
  const [copName, setCopName] = useState("");
  const [copAdmin, setCopAdmin] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.info.info);
  const token = useSelector((state) => state.info.token);

  const userName = user.userName;

  let data = {};

  const backToLogin = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회사 등록</h1>
      <h6 className={styles.subtitle}>
        회사 정보를 입력해주세요.<br />
        입력한 내용으로 최초 관리자 정보가 설정됩니다.
      </h6>

      <div className={styles['form-input-wrapper']}>
        <label>사업자등록번호</label>
        <Form.Control
          className={styles['form-input']}
          type="text"
          placeholder="사업자등록번호"
          value={copRegNum}
          onChange={(e) => setCopRegNum(e.target.value)}
        />
      </div>

      <div className={styles['form-input-wrapper']}>
        <label>회사명</label>
        <Form.Control
          className={styles['form-input']}
          type="text"
          placeholder="회사명"
          value={copName}
          onChange={(e) => setCopName(e.target.value)}
        />
      </div>

      {/* 관리자 ID 입력 부분은 주석 처리했습니다. */}
      {/* <Form.Control
        className={styles.form-input}
        type="text"
        placeholder="관리자 ID"
        value={copAdmin}
        onChange={(e) => setCopAdmin(e.target.value)}
      /> */}

      <div className={styles['buttons-wrapper']}>
        <button className={styles['submit-button']} 

                onClick={ async () => {

                    try {

                        const copResult = await axios.post(`http://localhost:8080/api/company`, {
                            copRegNum: copRegNum,
                            copName: copName,
                            //copAdmin: copAdmin
                        }, {
                            headers : {
                                Authorization : token,
                            }
                        });

                        //const copSeqNumber = copResult.data.key;
                        
                        const empResult = await axios.post(`http://localhost:8080/api/employee`, {
                            empName : userName,
                            empPosition : '사장',
                            copSeq : copResult.data.key,
                            userSeq : user.userSeq,
                            authLevel : 'MASTER',
                        }, {
                            headers : {
                                Authorization : token,
                            }
                        });

                        console.log('==========');
                        console.log(empResult);
                        console.log('==========');

                        const userUpdate = await axios.put(`http://localhost:8080/api/user/update`, {
                            copSeq : copResult.data.key,
                        }, {
                            headers : {
                                Authorization : token,
                            }
                        });

                        console.log(userUpdate);

                        const getUserData = await axios.post(`http://localhost:8080/api/user/complete`, {

                        }, {
                            headers : {
                                Authorization : token,
                            }
                        });

                        console.log(getUserData);

                        localStorage.setItem("userInfo", JSON.stringify(getUserData.data.userDTO));

                        console.log(getUserData.data.userDTO.copSeq);

                        dispatch(saveInfo({
                          copSeq : getUserData.data.userDTO.copSeq,
                          copName : getUserData.data.userDTO.copName,
                          userSeq : getUserData.data.userDTO.userSeq,
                          userId : getUserData.data.userDTO.userId,
                          userName : getUserData.data.userDTO.userName,
                          userEmail : getUserData.data.userDTO.userEmail,
                          userState : getUserData.data.userDTO.userState,
                          userImage : getUserData.data.userDTO.userImage,
                          empPosition : getUserData.data.userDTO.empPosition,
                          empImage : getUserData.data.userDTO.empImage,
                          authLevel : getUserData.data.userDTO.authLevel,
                        }))

                        console.log(user.copSeq);
                        console.log(user.userState);

                        toast.success('신청이 정상적으로 완료되었습니다.', {
                          position: toast.POSITION.TOP_CENTER,
                          autoClose: 2000,
                        });

                        await new Promise((resolve) => // resolve promise가 성공적으로 완료되었을때
                        {
                            setTimeout(navigate("/"), 3000)
                        });

                } catch (error) {
                  toast.error('서비스 신청이 정상적으로 되지않았습니다. 관리자에게 문의주세요.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                  });
                }
        }}>서비스 신청하기</button>

        <button className={styles['cancel-button']} 
                style={{margin : '0px'}}
                onClick={backToLogin}>다음에 (서비스 이용이 불가능합니다)</button>
      </div>

      <div>
        <ToastContainer style={{width: '350px', fontSize: '14px'}}/>
      </div>

    </div>
  )
}

export default CreateCop;
