import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './MultipleInputs.css';

function MultipleInputsExample() {
  return (
    <Form>
    
    <InputGroup>
    <Form.Label column sm="2">
         일시 
      </Form.Label>
      <div className='inputType'>
     <input type = "Date"></input>
     <input type = "Time"></input>
     {/* <text>--</text> */}
     <input type = "Date"></input>
     <input type = "Time"></input>
     </div>
    </InputGroup>
    </Form>
  );
}

export default MultipleInputsExample;