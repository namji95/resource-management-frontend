import React,{useState} from "react";
import PhoneInput from 'react-phone-number-input';

function PhoneNumber(){
    const {Number,setNumber} = useState('');
    const {valid,setvalid} = useState(true);

    const handlechange = (value) =>{
        setNumber(value);
        setvalid(vaildate(value));
    }
    const vaildate = (Number) =>{
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(Number);
    }
    return(
        <div>
                <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                     defaultCountry="RU"
                    value={Number}
                    onChange={handlechange}/>
           
        </div>
    )
}
export default PhoneNumber;