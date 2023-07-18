import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function Check() {
  return (
   <Form.Group as={Row} className="mb-3">
   <Form.Label column sm="2">
     
   </Form.Label>
   <Col sm="6">
     <Row>
       <Col sm="2">
         <Form.Check type="checkbox" label="종일" />
       </Col>
       <Col sm="5">
         <Form.Select>
      <option>반복 안 함</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
       </Col>
     </Row>
   </Col>
 </Form.Group>
     );
}

export default Check