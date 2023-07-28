
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './PageForm.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {useState,useEffect } from "react";
import ChangePasswordModal from './PwModal';

function MyPage(){



  const [Users,setUsers] = useState({
    userName : "",
    userEmail : "",
    userImage : ""
  })

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

      reader.readAsDataURL(selectedFile);
    }
  };
  const saveMypage = (e) => {
    
  }

  const psdButton = () => {
    setShowModal(showModal => !showModal);
  }
  
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      setUsers((prevUsers) => ({
        ...prevUsers,
        userEmail: userInfo.userEmail,
        userId : userInfo.userId,
        userPwd : userInfo.userPwd,
        userName : userInfo.userName,
        userImage : userInfo.userImage
      }))

    }
  }, []);

    return(
    <div>
       
      <div className="MyPageform-container">
      <fieldset className="MyPagefieldset-container">
      <Form.Group as={Row}>
        <Form.Label column sm="2">내 프로필 
        </Form.Label>
        <Col sm = "2">
        <InputGroup className='buttongroup'>
    
    <Button type="submit" className='submit' onClick={saveMypage}>저장</Button>{' '}
    <Button as="input" type="button"className='buttoncancle' value="취소" />{' '}
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
        <Form.Label column sm="2">닉네임 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" placeholder={Users.userName }/>
        </Col>
        </Form.Group>
        <hr/>
      
        <Form.Group as={Row}>
        <Form.Label column sm="2">ID 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" value = {Users.userId}/>
        </Col>
        </Form.Group>
        <hr/>
            
        <Form.Group as={Row}>
        <Form.Label column sm="2">PassWord
        </Form.Label>
        <Col sm="2">
        <Button as="input" type="button"className='buttoncancle'onClick={psdButton} value="변경하려면 여기를 누르세용!" />{' '}

        {
              showModal ?
              <ChangePasswordModal showModal={showModal} setShowModal={setShowModal} />
              : <></>
            }
        </Col>
        </Form.Group>
        <hr/>
        <Form.Group as={Row}>
        <Form.Label column sm="2">Email 
        </Form.Label>
        <Col sm="2">
          <Form.Control type="text" value = {Users.userEmail}/>
        </Col>
        <ChangePasswordModal show={showModal} onHide={() => setShowModal(false)} />
        </Form.Group>
      </fieldset>
      </div>
    </div>
    );
  }
export default MyPage;