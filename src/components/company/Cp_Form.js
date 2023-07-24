import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Cp_Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './Cp_Button.css'
function CpForm() {

  return (
   <div>
        <div className="Cp_form-container">
      <fieldset className="Cp_fieldset-container">
     <h2>회사 정보</h2>
    <text style={{fontWeight: 'bold'}}>기본정보</text><hr/>
    <div className='labe1'>
    <Form>
    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
         회사명
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text"/>
        </Col>
      </Form.Group>
    </Form>     


    <Form>
    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
         관리자아이디
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text"/>
        </Col>
      </Form.Group>
    </Form>   

    <Form>
    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
         사업자등록번호
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" />
        </Col>
      </Form.Group>
    </Form>   
    </div>
    <text style={{fontWeight: 'bold'}}>시간</text><hr/>

    <div className='labe1'>
    <Form>
    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
        생성일시
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text"/>
        </Col>
      </Form.Group>
    </Form>   

    <Form>
    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
         수정일시 
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text"/>
        </Col>
      </Form.Group>
    </Form>
    </div>   
      </fieldset>
      <div className='Buttoncss'>
    <Button type="submit">저장</Button>{' '}
    <Button as="input" type="button"className='buttoncancle' value="취소" />{' '}
    </div>
    </div>
    </div>
  );
}

export default CpForm;