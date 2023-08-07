import Button from 'react-bootstrap/Button';
import './Button.css'
import InputGroup from 'react-bootstrap/InputGroup';
function TagTypesExample() {
  return (
    <>
     <InputGroup className='buttongroup'>
    
    <Button type="submit" className='submit'>저장</Button>{' '}
    <Button as="input" type="button"className='buttoncancle' value="취소" />{' '}
    </InputGroup>
    </>
  );
}

export default TagTypesExample;