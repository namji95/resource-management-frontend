import 'bootstrap/dist/css/bootstrap.min.css';
import './InputDeviceForm.css'
import './FormEx.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState } from 'react';
import TagTypesExample from './Button';
import PlaintextExample from './FormEx';
import MultipleInputsExample from './MultipleInputs';
import Check from './CheckBox';
import SelectSizesExample from './SelectForm';
import FormFileExample from './FileSelect';
import TextControlsExample from './Texta';

function InputDeviceForm() {
  
const [selectedOption, setSelectedOption] = useState('');

const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);
};

  return (
    <div>
      
      <div className="form-container">
      <fieldset className="fieldset-container">
     
        <TagTypesExample></TagTypesExample>
        <hr/>
        <PlaintextExample></PlaintextExample> 
        <MultipleInputsExample></MultipleInputsExample>
      
      <Check></Check>
      <hr/>
      <SelectSizesExample></SelectSizesExample>
      <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
         참석자 
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="이름, 부서를 입력하세요." />
        </Col>
      </Form.Group>
    </Form>     
    <Form>
        <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
         화상 회의 
        </Form.Label>
      <Col sm="10"> 
        <Form.Select aria-label="Default select example">
      <option>화상 회의 추가</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
        </Form.Select>
      </Col>
    </Form.Group>
    </Form>
    <Form.Group as={Row} className="mb-3">
   <Form.Label column sm="2">
     설비
   </Form.Label>
   <Col sm="6">
     <Row>
       <Col sm="3">
        <Form.Control type = "text" value="설비 예약">
        </Form.Control>
       </Col>
     </Row>
   </Col>
 </Form.Group>
 
      <FormFileExample></FormFileExample>
      <TextControlsExample></TextControlsExample>
      <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
        공개
        </Form.Label>

        <Col sm = "2">
          <Col sm = "4">
        <Form.Check
        type="radio"
        label="공개"
        name="checkboxGroup"
        value="option1"
        checked={selectedOption === 'option1'}
        onChange={handleOptionChange}/>
          </Col>
        </Col>
      
      <Col sm = "2">
        <Col sm = "5">
      <Form.Check
        type="radio"
        label="비공개"
        name="checkboxGroup"
        value="option2"
        checked={selectedOption === 'option2'}
        onChange={handleOptionChange}
      />
        </Col>
      </Col>
      </Form.Group>

      
    </Form>
      </fieldset>
    
      </div>
      <div>
 
    </div>
    </div>
  );
}

export default InputDeviceForm;
