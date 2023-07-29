import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {useState,useEffect } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveToken } from '../store/CounterSlice';

function EditProfileForm({ show, onClose }) {

  const dispatch = useDispatch();
  const [isFirstInputVisible, setIsFirstInputVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isSecondInputVisible, setIsSecondInputVisible] = useState(false);
    const [Users,setUsers] = useState({
    userId : "",
    userPwd : ""
  })
  const[newUserPwd, setnewUserPwd] = useState({
    userPwd : "",
    userNpwd : ""
  });
  
  const onChangepwd = (e) =>{
      let newName = e.target.name;
      let newValue = e.target.value;
      const newObj = {
          ...Users,
          [newName] : newValue,
      }   
      setUsers(newObj);
  }
  const onchangNpwd = (e) =>{
     let newName = e.target.name;
     let newValue = e.target.value;
     const newObj = {
         ...newUserPwd,
         [newName] : newValue,
     }   
     setnewUserPwd(newObj);
 }
  

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      setUsers((prevUsers) => ({
        ...prevUsers,
        userId: userInfo.userId
      }))
    }
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      userId : Users.userId,
      userPwd : Users.userPwd
    }
    const formData = new FormData();
    formData.append("data",new Blob([JSON.stringify(data)],{
      type : "application/json"
    }));
         axios.post("http://localhost:8080/api/SelectPwd", formData, {
            headers: {'Content-Type' : 'multipart/form-data', charset: 'UTF-8'},
          }).then (response => {
            if (response.data && response.data.statusCode === 401) {
              alert("비밀번호가 틀렸습니다.");
            } else {
              setError("");
              alert("인증 성공")
              setIsFirstInputVisible(true);
              setIsSecondInputVisible(true);
          
            }
          })
          .catch(error => {
            setError("서버에서 데이터를 가져오는 중 오류가 발생했습니다.");
          });
        };
        const PwdSubmit = (e) => {
          const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
         if (passwordRegex.test(newUserPwd.userPwd)) {
            if (newUserPwd.userPwd === newUserPwd.userNpwd) {
              let data = {
                userId : Users.userId,
                userPwd : newUserPwd.userPwd
              }
              const formData = new FormData();
              formData.append("data",new Blob([JSON.stringify(data)],{
                type : "application/json"
              }));
              axios.post("http://localhost:8080/api/updatePwd", formData, {
                headers: {'Content-Type' : 'multipart/form-data', charset: 'UTF-8'},
              }).then(response =>{
                if(response.data && response.data.statusCode === 401){
                  alert('비밀번호 변경 실패 서버 오류..');
                }else{
                  setError("");
                  alert("비밀번호 변경 성공")
                  localStorage.removeItem('accessToken');
                  dispatch(saveToken(localStorage.getItem('accessToken')));   
                }
              })
            } else {
              alert('새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            }
          } else {
            alert(
              '비밀번호 형식을 확인해주세요.\n비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자여야 합니다.'
            );
          }
  }
  return (
    <Modal show={show} style={{ top: '20px', left: '36%' }}>
      <Modal.Header closeButton>
      <Modal.Title>비밀번호 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="currentPassword">
            <Form.Label>현재 비밀번호</Form.Label>
            <Form.Control type="password" name = "userPwd" value={Users.userPwd}
                        onChange={onChangepwd}  placeholder="현재 비밀번호를 입력하세요"></Form.Control>
          </Form.Group>
          {isFirstInputVisible  && isSecondInputVisible && (
        <>
         <Form.Group controlId="new1Password">
  <Form.Label>새로운 비밀번호</Form.Label>
  <Form.Control
    type="password"
    name="userPwd"
    value={newUserPwd.userPwd}
    onChange={onchangNpwd}
    placeholder="새로운 비밀번호를 입력하세요"
  />
</Form.Group>
             
<Form.Group controlId="new2Password">
  <Form.Label>확인 비밀번호</Form.Label>
  <Form.Control
    type="password"
    name="userNpwd"
    value={newUserPwd.userNpwd}
    onChange={onchangNpwd}
    placeholder="다시 한번 비밀번호를 입력하세요"
  />
</Form.Group>
          </>
      )}  <Button variant="primary" onClick = {handleSubmit}type="button">
            확인
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={PwdSubmit}>
          저장
        </Button>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProfileForm;