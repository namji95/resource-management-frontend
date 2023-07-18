import './Device.css';
import './Submit'
import GridComplexExample from './Form';
import MyComponent from './Text';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeviceForm() {

  return (
    <div>
        <div className='main'>

        <fieldset className="fieldset-container">
        <div className='button'>
        <Button variant="primary" type="" className='button'>
          X
        </Button>
        </div>
        
        <MyComponent></MyComponent>
        <text>제품등록 페이지</text><hr></hr>
        <GridComplexExample></GridComplexExample>
        </fieldset>

        </div>
        
    </div>
  )
}

export default DeviceForm;
