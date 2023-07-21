import { useState } from "react";
import axios from "axios";
import '../../css/Car.css';


function Facility_modal(props) {

    const [carName, setCarName] = useState();

    const carNameInput = (e) => {
        setCarName(e.target.value);
    }

    const [carNumber, setCarNumber] = useState();

    const carNumberInput = (e) => {
        setCarNumber(e.target.value);
    }

    const [carDistance, setCarDistance] = useState();

    const carDistanceInput = (e) => {
        setCarDistance(e.target.value);
    }

    const [carYear, setCarYear] = useState();

    const carYearInput = (e) => {
        setCarYear(e.target.value);
    }

    const [carImage, setCarImage] = useState();

    const carImageInput = (e) => {
        setCarImage(e.target.value);
    }

    const [carExplan, setCarExplan] = useState();

    const carExplanInput = (e) => {
        setCarExplan(e.target.value);
    }

    const Facility_modals = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/facilityModals", {
            carName : carName,
            carNumber : carNumber,
            carDistance : carDistance,
            carYear : carYear,
            carImage : carImage,
            carExplan : carExplan
        }).then (response => {
            if (response.data != null) {
                alert("등록이 완료되었습니다.");
            } else {
                alert("이미 등록된 설비입니다. 다시 등록하세요");
            }
        }).catch (error => {
            alert(error);
        })
    }


    return (
        <>
        <div className="update_page">
            <form action="http://localhost:8080/facilityModals" method="POST" encType="multipart/form-data">
                <div className="essential">
                    ● 필수 항목
                </div>
                <div className="categorys">
                    카테고리
                <select className="category">
                    <option>차량</option>
                    <option>모바일 기기</option>
                    <option>회의실</option>
                    <option>교육장</option>
                </select><br/>
                </div>
                <div className="carNames">
                    ● 차량명
                    <input type='text' className="carName" placeholder="차량명" value={carName} onChange={carNameInput}></input>                
                </div>
                <div className="carNumbers">
                    ● 차량번호
                    <input type='text' className="carNumber" placeholder="차량번호" value={carNumber} onChange={carNumberInput}></input>
                </div>
                <div className="carDistances">
                    ● 주행거리
                    <input type='text' className="carDistance" placeholder="주행거리" value={carDistance} onChange={carDistanceInput}></input>
                </div>
                <div className="carYears">
                    ● 차량연식
                    <input type='date' className="carYear" value={carYear} onChange={carYearInput}></input>                
                </div>
                <div className='carImages'>
                    이미지
                    <input type='file' className='carImage' value={carImage} onChange={carImageInput}></input>                
                </div>
                <div className="explanations">
                    설명
                    <input 
                    type='text'
                    className="explanation" 
                    placeholder="차량 추가에 대한 설명"
                    value={carExplan} onChange={carExplanInput}></input>
                </div>
                <hr className="firstLine"/>
                <div className="companys">
                    사용 회사
                    <input 
                    type="button" 
                    value="회사 선택" 
                    className="company"></input>
                </div>
                <hr className="secondLine"/>
                <div className="sNcBtn">
                    <input 
                    type="reset"
                    className="cancel"></input>
                    <input 
                    type="submit" 
                    value="저장"
                    className="save"
                    onClick={Facility_modals}></input>
                </div>
            </form>
        </div>
        </>
    )
}

export default Facility_modal;