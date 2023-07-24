import { React} from "react";
import { useEffect, useState } from 'react';
import { Link, json } from "react-router-dom";
import axios from "axios";
 
// fetch("https://deeb-112-221-198-150.ngrok-free.app/cars")
// .then((response) => response.json())
// .then((json) => console.log(json));

// action={Cars} method="post"

function Car(props) {

    
    const [carSeq, setCarSeq] = useState(0);

    const carSeqInput = (e) => {
        setCarSeq(e.target.value);
    }

    const [carNumber, setCarNumber] = useState(0);

    const carNumberInput = (e) => {
        setCarNumber(e.target.value);
    }

    const [carType, setCarType] = useState('');

    const carTypeInput = (e) => {
        setCarType(e.target.value);
    }

    const [carImage, setcarImage] = useState('');

    const carImageInput = (e) => {
        setcarImage(e.target.value);
    }

    const [carYear, setcarYear] = useState(0);

    const carYearInput = (e) => {
        setcarYear(e.target.value);
    }
    
    const [carDistance, setcarDistance] = useState(0);

    const carDistanceInput = (e) => {
        setcarDistance(e.target.value);
    }
    
    const Cars = (event) => {
            event.preventDefault();
            axios.post("http://localhost:8080/cars", {
                carSeq : carSeq,
                carNumber : carNumber,
                carType : carType,
                carImage : carImage,
                carYear : carYear,
                carDistance : carDistance
            }).then(response => {
                if (response.data.ok == 'ok') {
                    <input type="text"></input>
                    console.log('예약이 완료되었습니다.');
                    window.location = "http://localhost:3000/view";
                } else {
                    console.log('예약이 실패하였습니다.');
                }
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
        <form >

            <label>차량 일련번호</label>
            <input type="text" name="carSeq" placeholder="차량 검색" value={carSeq} onChange={carSeqInput}/><br/>
        
            <label>차량 번호</label>
            <input type="text" name="carNumber" placeholder="차량 연식" value={carNumber} onChange={carNumberInput}/><br/>

            <label>차종</label>
            <input type="text" name="carType" placeholder="주행거리 설정" value={carType} onChange={carTypeInput}/><br/>

            <label>이미지</label>
            <input type="text" name="carImage" placeholder="null" value={carImage} onChange={carImageInput}/><br/>

            <label>연식</label>
            <input type="text" name="carYear" placeholder="연식" value={carYear} onChange={carYearInput}/><br/>

            <label>주행거리</label>
            <input type="text" name="carDistance" placeholder="주행거리" value={carDistance} onChange={carDistanceInput}/><br/>
            
            <Link to="/view">
            <button onClick={Cars}>예약하기</button>
            </Link>
            <br/>

        </form>
    </div>
        
    )
}

export default Car;