import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function CheckboxGroup() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Form.Group>
    
      <Form.Check
        type="radio"
        label="공개"
        name="checkboxGroup"
        value="option1"
        checked={selectedOption === 'option1'}
        onChange={handleOptionChange}
      />
      <Form.Check
        type="radio"
        label="비공개"
        name="checkboxGroup"
        value="option2"
        checked={selectedOption === 'option2'}
        onChange={handleOptionChange}
      />
    </Form.Group>
  );
}

export default CheckboxGroup;