import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
function TextControlsExample() {
  return (
    <Form>
    
       {/* <Form.Control as="textarea" rows={5} placeholder='메모를 입력하세요.'/> */}
       <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
         메모
        </Form.Label>
        <Col sm="10">
        <Form.Control as="textarea" rows={5} placeholder='메모를 입력하세요.'/>
        </Col>
      </Form.Group>

    </Form>
  );
}

export default TextControlsExample;