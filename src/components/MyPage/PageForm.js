
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './PageForm.css'
import PhoneNumber from './PhoneForm';
import InputGroup from 'react-bootstrap/InputGroup';
import ProfileImage from './Image';

function MyPage(){
    
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
          
        <ProfileImage></ProfileImage>
        
        
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