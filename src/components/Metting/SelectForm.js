import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function SelectSizesExample() {
  return (
    <Form>
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="2">
       캘린더 
      </Form.Label>
      <Col sm="10"> {/* 너 였구나 */}
        <Form.Select aria-label="Default select example">
      <option>[기본]김동민</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
      </Col>
    </Form.Group>

    
  </Form>
  );
}

export default SelectSizesExample;