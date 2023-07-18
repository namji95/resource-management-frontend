import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function PlaintextExample() {
  return (
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">제목 
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="제목을 입력하세요." />
        </Col>
      </Form.Group>

// <Form.Group as={Row} className="mb-3">
// <Form.Label column sm="2">장소
// </Form.Label>

// <Col sm="10">
//   <Form.Control type="text" placeholder="장소를 입력하세요. " />
// </Col>
  );
}

export default PlaintextExample;