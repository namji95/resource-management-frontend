import { React} from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from "react-bootstrap";
import '../css/Card.css'

import Board from '../compontents/Board';

function Input(){
    const [station,setStation] = useState("");
    const [name,setName] = useState("");

    const handleChange = ({target : {value}}) => setStation(value);
    const handleSubmit = function(event){
        event.preventDefault()
        axios.post('/input',null,{
            params : {
                station : station
            }
            })
        .then(response => {
            const resData =response.data;
            console.log(resData.message);
            // setName(resData)
        })
    }

    return (
        <Container>
            <div className = "outer-box">
                <div className= "inner-box">
                    <form onSubmit={handleSubmit}>                    
                        <p> 시간표 </p>
                        <input type = "text" placeholder="역이름을 입력하세요" onChange = {handleChange}>
                        </input>
                        <button type="submit">제출</button>
                    </form>
                    {name && <Board name = {name}/>}
                </div>
            </div>
        </Container>
    )
}

export default Input;