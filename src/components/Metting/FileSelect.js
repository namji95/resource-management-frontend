import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function FormFileExample() {
  return (
     <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">장소
        </Form.Label>
        
        <Col sm="10">
          <Form.Control type="text" placeholder="장소를 입력하세요. " />
        </Col>
        <Form.Label column sm="2">
        </Form.Label>
        <Col sm = "10">
          <Form.Control type = "file"/>
          </Col>
      </Form.Group>
     );
}

export default FormFileExample;