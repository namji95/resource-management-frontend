import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ChangePasswordModal({ show, onHide }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [dbpwd,setDbpwd] = useState('');
  const handleSave = () => {

    axios.get('http://localhost:8080/api/user/findPwd', {
    }).then((response) => {
        console.log(response.data)
        setDbpwd(response.data);
    }).catch((error) => {
        console.log(error)
    })
    setError(''); 


    if (currentPassword === '') {
      setError('현재 비밀번호를 입력하세요.');
      return;
    }
    if (currentPassword === dbpwd) {
        setError('현재 비밀번호가 일치하지 않습니다.');
        return;
      }
    if (newPassword === '') {
      setError('새 비밀번호를 입력하세요.');
      return;
    }
    if (confirmPassword === '') {
      setError('비밀번호 확인을 입력하세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }


    
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>비밀번호 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="text-danger mb-3">{error}</div>}
        <Form>
          <Form.Group controlId="currentPassword">
            <Form.Label>현재 비밀번호</Form.Label>
            <Form.Control
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>새 비밀번호</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSave}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePasswordModal;