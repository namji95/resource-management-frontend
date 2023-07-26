
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './PageForm.css';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useRef, useState } from 'react';
import Avatar from 'react-avatar';

function MyPage(){
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  const handleAvatarClick = () => {
    fileInput.current.click();
  };

  const handleFileInputChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    } else { // 업로드 취소할 시
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
      return;
    }

    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

    return(
    <div>
       
      <div className="MyPageform-container">
      <fieldset className="MyPagefieldset-container">
      <Form.Group as={Row}>
        <Form.Label column sm="2">{"<"}내 프로필 
        </Form.Label>
       </Form.Group> 
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          
        <Avatar
        src={image}
        style={{ margin: '20px' }}
        size={200}
        onClick={handleAvatarClick}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
        
        
        </Form.Label>
        </Form.Group>

        <Form.Group as={Row}>
        <Form.Label column sm="2">닉네임 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" placeholder="닉네임" />
        </Col>
        </Form.Group>
        <hr/>
      
         <Form.Group as={Row} className="mb-3">
         <Form.Label column sm="2">
          핸드폰 
         </Form.Label>
         <Col sm="4"> 
         <Form>
      <Row>
        <Col>
      
          <Form.Control placeholder="대한민국 +82" />
        </Col>
        <Col sm = "9">
          <Form.Control placeholder="'-'없이 숫자만 입력해주세요." />
        </Col>
      </Row>
    </Form>
         </Col> 
        </Form.Group><hr/>
        <Form.Group as={Row}>
        <Form.Label column sm="2">ID 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" placeholder="ID" />
        </Col>
        </Form.Group>
        <hr/>
        <Row className="align-items-center">
            
        <Form.Label column sm="2">이메일
        </Form.Label>
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            Name
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="douzone"
          />
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Username
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="douzone.co.kr" />
          </InputGroup>
        </Col>
        </Row>
      </fieldset>
      </div>
    </div>
    );
  }
export default MyPage;