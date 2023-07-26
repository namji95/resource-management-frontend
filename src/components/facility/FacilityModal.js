import { useState } from "react";
import axios from "axios";
import facilityStyle from "../facility/FacilityModal.module.css";

function FacilityModal(props) {

    const defaultCarObj = {
        carName : "",
        carNumber :"",
        carDistance : "",
        carYear : "",
        // carImage : "",
        carExplan : ""
    }

    const defaultMeetingObj = {
        name : "",
        roomNum :"",
        description : "",
        useDate : "",
    }

    const [currCategory, setCurrCategory] = useState("car");

    const onSelectChange = (e) => {
        let newValue = e.target.value;
        setCurrCategory(newValue);
        console.log(currCategory);
    }

    // 객체 Key : value
    
    const [carObj, setCarObj] = useState(defaultCarObj);
    const [meetingObj, setMeetingObj] = useState(defaultMeetingObj);

    const onChangeCar = (e) => {
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...carObj,//spread 연산자
            [newName] : newValue
        }
        setCarObj(newObj);
    }

    const onChangeMeetingObj = (e) => {
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...meetingObj,//spread 연산자
            [newName] : newValue
        }
        setMeetingObj(newObj);
    }

    const onReset = () => {
        setCarObj(defaultCarObj);
        setMeetingObj(defaultMeetingObj);
        setCurrCategory("car");
    }

    const closeModal = () => {
        props.setShowModal(!props.showModal);
    }

    const FacilityModal = (event) => {
        event.preventDefault();
            
            axios.post("http://localhost:8080/FacilityModal", 
                carObj
            ).then (response => {
    
                if (response.data != null) {
                    alert("등록이 완료되었습니다.");
                } else {
                    alert("이미 등록된 설비입니다. 다시 등록하세요");
                }

            }).catch (error => {
                alert(error);
            })
        }

    const printMeetingForm = () => {
        return (
            <>
                <div className={facilityStyle.carNames}>
                    ● 회의실명
                    <input
                    type='text'
                    className={facilityStyle.carName}
                    placeholder="회의실명"
                    name="name"
                    value={meetingObj.name}
                    onChange={onChangeMeetingObj}></input>                
                </div>
                <div className={facilityStyle.carNumbers}>
                    ● 회의실번호
                    <input
                    type='text'
                    className={facilityStyle.carNumber}
                    placeholder="회의실번호"
                    name="roomNum"
                    value={meetingObj.roomNum}
                    onChange={onChangeMeetingObj}></input>
                </div>
                <div className={facilityStyle.explanations}>
                    ● 설명
                    <input 
                    type='text'
                    className={facilityStyle.explanation}
                    placeholder="회의실에 대한 설명"
                    name ="description"
                    value={meetingObj.description}
                    onChange={onChangeMeetingObj}></input>
                </div>
                <div className={facilityStyle.carYears}>
                    ● 이용날짜
                    <input
                    type='date'
                    className={facilityStyle.carYear}
                    name="carYear"
                    value={meetingObj.useDate}
                    onChange={onChangeMeetingObj}></input>                
                </div>
                <hr className={facilityStyle.firstLine}/>
                <div className={facilityStyle.companys}>
                    사용 회사
                    <input 
                    type="button" 
                    value="회사 선택" 
                    className={facilityStyle.company}></input>
                </div>
            </>
        )
    }

    const printCarForm = () => {
        return (
            <>
                <div className={facilityStyle.carNames}>
                    ● 차량명
                    <input
                    type='text'
                    className={facilityStyle.carName}
                    placeholder="차량명"
                    name="carName"
                    value={carObj.carName}
                    onChange={onChangeCar}></input>                
                </div>
                <div className={facilityStyle.carNumbers}>
                    ● 차량번호
                    <input
                    type='text'
                    className={facilityStyle.carNumber}
                    placeholder="차량번호"
                    name="carNumber"
                    value={carObj.carNumber}
                    onChange={onChangeCar}></input>
                </div>
                <div className={facilityStyle.carDistances}>
                    ● 주행거리
                    <input
                    type='number'
                    className={facilityStyle.carDistance}
                    placeholder="주행거리"
                    name="carDistance"
                    value={carObj.carDistance}
                    onChange={onChangeCar}></input>
                </div>
                <div className={facilityStyle.carYears}>
                    ● 차량연식
                    <input
                    type='date'
                    className={facilityStyle.carYear}
                    name="carYear"
                    value={carObj.carYear}
                    onChange={onChangeCar}></input>                
                </div>
                <div className={facilityStyle.carImages}>
                    이미지
                    <input
                    type='file'
                    className={facilityStyle.carImage}
                    name="carImage"
                    value={carObj.carImage}
                    onChange={onChangeCar}></input>
                </div>
                <div className={facilityStyle.explanations}>
                    설명
                    <input 
                    type='text'
                    className={facilityStyle.explanation}
                    placeholder="차량 추가에 대한 설명"
                    name ="carExplan"
                    value={carObj.carExplan}
                    onChange={onChangeCar}></input>
                </div>
                <hr className={facilityStyle.firstLine}/>
                <div className={facilityStyle.companys}>
                    사용 회사
                    <input 
                    type="button" 
                    value="회사 선택" 
                    className={facilityStyle.company}></input>
                </div>

            </>
        )
    }

const printBtn = () => {
    const saveBtn = <input 
                    type="submit" 
                    value="저장"
                    className={facilityStyle.save}
                    onClick={FacilityModal}
                    />;

    const resetBtn =<input 
                     onClick={onReset}
                     type="reset"
                     value="초기화"
                     className={facilityStyle.cancel}
                     />

    return (
            <div className={facilityStyle.sNcBtn}>
                {resetBtn}
                {saveBtn}
            </div>
    )
}

const printForm = (currCategory) => {
    console.log("1");
    if(currCategory == "car"){
        return printCarForm();
    }else{
        return printMeetingForm();
    }
}


// ============================================== end logic

    return (
        <div className={facilityStyle.backgroud_block}>
            <div className={facilityStyle.black}/>
            <div className={facilityStyle.update_page}>
            <button className={facilityStyle.cancelButton} onClick={closeModal}>X</button>
                <form action="http://localhost:8080/FacilityModal" method="POST" encType="multipart/form-data">
                    <div className={facilityStyle.essential}>
                        ● 필수 항목
                    </div>
                    <div className={facilityStyle.categorys}>
                        카테고리
                        <select className={facilityStyle.category} value={currCategory} onChange={onSelectChange}>
                            <option value={"car"} selected>차량</option>
                            <option value={"mobile"}>모바일 기기</option>
                            <option value={"meeting"}>회의실</option>
                            <option value={'edu'}>교육장</option>
                        </select>
                    </div>
                    {printForm(currCategory)}
                    <hr className={facilityStyle.secondLine}/>
                    {printBtn(currCategory)}
                </form>
            </div>
        </div>
    )
}

export default FacilityModal;