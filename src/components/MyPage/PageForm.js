
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './PageForm.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {useState,useEffect } from "react";
import ChangePasswordModal from './PwModal';
import axios from 'axios';

import { useSelector } from 'react-redux';

function MyPage() {

  const userDataInRedux = useSelector((state) => state.info.info);

  const [Users,setUsers] = useState({
    copSeq : "",
    copRegNum : "", 
    copName : "",
    userSeq : "",
    userId : "",
    userName : "",
    userEmail : "",
    userImage : "",
    empPosition : "",
    empImage : "",
    authLevel : "",
    // userAdress : ""
  })

  const [image,setImage] = useState('');

  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (event) => {

    const selectedFile = event.target.files[0];

    if (selectedFile) {
       const reader = new FileReader();

      reader.onloadend = () => {

        setUsers((prevUsers) => ({
          ...prevUsers,
          userImage: reader.result // 선택한 이미지를 userImage 상태에 바로 저장이 될까
        }));
      };

      setImage(selectedFile)
      
      reader.readAsDataURL(selectedFile);
    }
    
  };

  const saveMypage = (e) => {

    e.preventDefault();

    let data = {
      userId : Users.userId,
      copSeq : Users.copSeq,
      copRegNum : Users.copRegNum,
      copName : Users.copName,
      userSeq : Users.userSeq,
      userName : Users.userName,
      userEmail : Users.userEmail,
      empPosition : Users.empPosition,
      authLevel : Users.authLevel
    }

    const formData = new FormData();
    formData.append("data",new Blob([JSON.stringify(data)],{
      type : "application/json"
    }));

    formData.append("image", image);

      axios.post("http://localhost:8080/api/mypage/image/update", formData, {
                headers: {'Content-Type' : 'multipart/form-data', charset: 'UTF-8'},
            })
            .then (response => {
              localStorage.setItem("userInfo", JSON.stringify(Users));
             })
            .catch (error => {
                alert(error);
            })
        }
  // const changeUser = (e) =>{
  //   let newName = e.target.name;
  //   let newValue = e.target.value;
  //   const newObj = {
  //     ...Users,
  //     [newName] : newValue
  //   }
  //   setUsers(newObj);
  // }
  // const psdButton = () => {
  //   setShowModal(showModal => !showModal);
  // }
  
  useEffect(() => {

    setUsers((prevUsers) => ({
      ...prevUsers,
      copSeq : userDataInRedux.copSeq,
      copRegNum : userDataInRedux.copRegNum, 
      copName : userDataInRedux.copName,
      userSeq : userDataInRedux.userSeq,
      userId : userDataInRedux.userId,
      userName : userDataInRedux.userName,
      userEmail : userDataInRedux.userEmail,
      userImage : userDataInRedux.userImage,
      empPosition : userDataInRedux.empPosition,
      empImage : userDataInRedux.empImage,
      authLevel : userDataInRedux.authLevel,
      // userAddress : userDataInRedux.userAddress
    }))
  }, []);

  useEffect(() => {console.log(image)}, [image])

    return(
    <div>
       
      <div className="MyPageform-container">
      <fieldset className="MyPagefieldset-container">
      <Form.Group as={Row}>
          <Form.Label column sm="2">나의 프로필</Form.Label>
          <Col sm={{ span: 5, offset: 2 }}> {/* 버튼을 맨 오른쪽으로 배치 */}
            <InputGroup className='buttongroup'>
              <Button type="submit" className='submit' onClick={saveMypage}>저장</Button>
              <Button as="input" type="button" className='buttoncancle' value="취소" />
            </InputGroup>
          </Col>
        </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
            <img src={Users.userImage} style={{ width: '240px', height: '150px',marginRight : '50px'}} />
        </Form.Label>
        <Col sm = "2">
        <Form.Control type = "file" onChange={handleImageChange} className='imgtag'></Form.Control>
        </Col>
        </Form.Group>



        <Form.Group as={Row}>
        <Form.Label column sm="2">이름 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" Value={Users.userName} readOnly/>
        </Col>
        </Form.Group>
        <hr/>
        <Form.Group as={Row}>
        <Form.Label column sm="2">Email 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" Value = {Users.userEmail}readOnly/>
        </Col>
        <ChangePasswordModal show={showModal} onHide={() => setShowModal(false)} />
        </Form.Group>
        <hr/>
        <Form.Group as={Row}>
        <Form.Label column sm="2">직책 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" Value = {Users.empPosition}readOnly/>
        </Col>
        </Form.Group>
        <hr/>
        <Form.Group as={Row}>
        <Form.Label column sm="2">권한 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" Value = {Users.authLevel}readOnly/>
        </Col>
        </Form.Group>
        <hr/>
        <Form.Group as={Row}>
        <Form.Label column sm="2">주소 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" Value = "형이 백단 구현 다되면 나옴"readOnly/>
        </Col>
        </Form.Group>
      </fieldset>
      </div>
    </div>
    );
  }
export default MyPage;