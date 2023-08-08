import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function PlaintextExample() {
  return (
    <InputGroup>
    <Form.Label column sm="2" style={{padding : '1.1rem', paddingRight : '2.3rem'}}>
        일시 
      </Form.Label>
      <div className='inputType'>
    <input type = "Date" value={Datevalue} onChange={handleDate} style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem'}}></input> &nbsp;
    <input type = "Time" onChange={handleTime} style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem'}}></input>
    <text> - </text>
    <input type = "Date" style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem', marginLeft : '0.5em'}}></input> &nbsp;
    <input type = "Time" style={{ border : '1px solid #dee2e6', borderRadius : '0.375rem'}}></input>
    </div>
    </InputGroup>
  );
}

export default PlaintextExample;