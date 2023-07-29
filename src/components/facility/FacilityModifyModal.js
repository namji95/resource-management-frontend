import { useState } from "react";
import axios from "axios";
import facilityStyle from "./FacilityModal.module.css";

function FacilityModifyModal(props) {

    const defaultCarObj = {
        carName : "",
        carNumber :"",
        carDistance : "",
        carYear : "",
        carExplain : "",
    }
    const defaultSpaceObj = {
        spcName : "",
        spcCap : "",
        spcExplain : "",
        spcImage : "",
        spcCreated : "",
        spcUpdated : ""
    }

    const defaultdeviceObj = {
        dvcName : "",
        dvcSerial: "",
        dvcBuy : "",
        bvcImage : "",
        dvcExplain : "",
        dvcCreated : "",
        dvcUpdated : ""
    }

    // 객체 Key : value

    const [carObj, setCarObj] = useState(defaultCarObj);
    const [spaceObj, setSpaceObj] = useState(defaultSpaceObj);
    const [deviceObj, setdeviceObj] = useState(defaultdeviceObj);
    const [image, setImage] = useState(null);
    const [currCategory, setCurrCategory] = useState("car");

    let data = {
        carName : carObj.carName,
        carNumber : carObj.carNumber,
        carDistance : carObj.carDistance,
        carYear : carObj.carYear,
        carExplain : carObj.carExplain
    }
    
    const onChangeCar = (e) => {
        const currentDatetime = new Date().toISOString();
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...carObj,//spread 연산자
            [newName] : newValue,
            carCreated : currentDatetime,
            carUpdated : currentDatetime
        }
        setCarObj(newObj);
    }

    const onChangeSpaceObj = (e) => {
        const currentDatetime = new Date().toISOString();
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...spaceObj,//spread 연산자
            [newName] : newValue,
            spcCreated : currentDatetime,
            spcUpdated : currentDatetime
        }
        setSpaceObj(newObj);
    }

    const onChangedevice = (e) => {
        const currentDatetime = new Date().toISOString();
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...deviceObj,
            [newName] : newValue,
            dvcCreated : currentDatetime,
            dvcUpdated : currentDatetime
        }   
        setdeviceObj(newObj);
    }

    const onSelectChange = (e) => {
        let newValue = e.target.value;
        setCurrCategory(newValue);
        console.log(currCategory);
    }
    
    const onChangeImageInput = e => {
        setImage(e.target.files[0])
    ;}

    const formData = new FormData();

    formData.append("image", image);
    formData.append("data", new Blob([JSON.stringify(data)],{
        type: "application/json"
    }));

    const onReset = () => {
        setCarObj(data);
        setSpaceObj(defaultSpaceObj);
        setdeviceObj(defaultdeviceObj);
        setCurrCategory("car");
    }

    const closeModal = () => {
        props.setShowModal(!props.showModal);
    }

    const FacilityModifyModal = (event) => {
        event.preventDefault();
            console.log(image);
            console.log(data);
            console.log(formData);
            axios.put("http://localhost:8080/api/car", formData, {
                headers: {'Content-Type' : 'multipart/form-data', charset: 'UTF-8'},
            })
            .then (response => {
                data = response.data;
                alert("등록 완료")
            })
            .catch (error => {
                alert(error);
            })
        }

    const printMeetingForm = () => {
        return (
            <>
                <div className={facilityStyle.names}>
                    ● 공간자원명
                    <input
                    type='text'
                    className={facilityStyle.name}
                    placeholder="공간자원명"
                    name="spcName"
                    value={spaceObj.spcName}
                    onChange={onChangeSpaceObj}></input>                
                </div>
                <div className={facilityStyle.numbers}>
                    ● 수용인원
                    <input
                    type='text'
                    className={facilityStyle.number}
                    placeholder="회의실번호"
                    name="spcCap"
                    value={spaceObj.spcCap}
                    onChange={onChangeSpaceObj}></input>
                </div>
                <div className={facilityStyle.explanations}>
                    설명
                    <input 
                    type='text'
                    className={facilityStyle.explanation}
                    placeholder="회의실에 대한 설명"
                    name ="spcExplain"
                    value={spaceObj.spcExplain}
                    onChange={onChangeSpaceObj}></input>
                </div>
                <div className={facilityStyle.images}>
                    이미지
                    <input
                    type='file'
                    className={facilityStyle.image}
                    name="spcImage"
                    value={spaceObj.useDate}
                    onChange={onChangeSpaceObj}></input>                
                </div>
            </>
        )
    }

    const printCarForm = () => {
        return (
            <>
                <div className={facilityStyle.names}>
                    <span className={facilityStyle.carname}>
                    ● 차량명
                    </span>
                    <input
                    type='text'
                    className={facilityStyle.name}
                    placeholder="차량명"
                    name="carName"
                    value={data.carName}
                    onChange={onChangeCar}></input>                
                </div>
                <div className={facilityStyle.numbers}>
                    ● 차량번호
                    <input
                    type='text'
                    className={facilityStyle.number}
                    placeholder="차량번호"
                    name="carNumber"
                    value={data.carNumber}
                    onChange={onChangeCar}></input>
                </div>
                <div className={facilityStyle.distances}>
                    ● 주행거리
                    <input
                    type='number'
                    className={facilityStyle.distance}
                    placeholder="주행거리"
                    name="carDistance"
                    value={data.carDistance}
                    onChange={onChangeCar}></input>
                </div>
                <div className={facilityStyle.years}>
                    ● 차량연식
                    <input
                    type='date'
                    className={facilityStyle.year}
                    name="carYear"
                    value={data.carYear}
                    onChange={onChangeCar}></input>                
                </div>
                <div className={facilityStyle.images}>
                    이미지
                    <input
                    type='file'accept="image/jpg,image/png,image/jpeg,image/gif"
                    className={facilityStyle.image}
                    name="carImage"
                    value={data.carImage}
                    onChange={onChangeImageInput}></input>
                </div>
                <div className={facilityStyle.explanations}>
                    설명
                    <input 
                    type='text'
                    className={facilityStyle.explanation}
                    placeholder="차량 추가에 대한 설명"
                    name ="carExplain"
                    value={data.carExplain}
                    onChange={onChangeCar}></input>
                </div>
            </>
        )
    }

    const printDeviceForm = () => {
        return (
            <>
                <div className={facilityStyle.names}>
                    ● 전자기기명
                    <input
                    type='text'
                    className={facilityStyle.name}
                    placeholder="전자기기명"
                    name="dvcName"
                    value={deviceObj.dvcName}
                    onChange={onChangedevice}></input>                
                </div>
                <div className={facilityStyle.Serials}>
                    ● 제품번호
                    <input
                    type='text'
                    className={facilityStyle.Serial}
                    placeholder="제품번호"
                    name="dvcSerial"
                    value={deviceObj.dvcSerial}
                    onChange={onChangedevice}></input>
                </div>
                <div className={facilityStyle.years}>
                    ● 구입년도
                    <input
                    type='Date'
                    className={facilityStyle.year}
                    placeholder="구입년도"
                    name="dvcBuy"
                    value={deviceObj.dvcBuy}
                    onChange={onChangedevice}></input>
                </div>
                <div className={facilityStyle.explanations}>
                    설명
                    <input
                    type='textarea'
                    className={facilityStyle.explanation}
                    name="dvcExplain"
                    value={deviceObj.dvcExplain}
                    onChange={onChangedevice}></input>                
                </div>
                
                <div className={facilityStyle.images}>
                    이미지
                    <input
                    type='file'
                    className={facilityStyle.image}></input> 
                </div>
            </>
        )
    }

    const printBtn = () => {
        const saveBtn = <input 
                        type="submit" 
                        value="수정"
                        className={facilityStyle.save}
                        onClick={FacilityModifyModal}
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
        if (currCategory == "car") {
            return printCarForm();
        }else if (currCategory == "space") {
            return printMeetingForm();
        }else if (currCategory == "device") {
            return printDeviceForm();
        }
    }


// ============================================== end logic

    return (
        <div className={facilityStyle.backgroud_block}>
            <div className={facilityStyle.back}/>
            <div className={facilityStyle.update_page}>
            <button className={facilityStyle.cancelButton} onClick={closeModal}>X</button>
                <form action="http://localhost:8080/FacilityModifyModal" method="POST" encType="multipart/form-data">
                    <div className={facilityStyle.essential}>
                        ● 필수 항목
                    </div>
                    <div className={facilityStyle.categorys}>
                        카테고리
                        <select className={facilityStyle.category} value={currCategory} onChange={onSelectChange}>
                            <option value={"car"} selected>차량</option>
                            <option value={"device"}>모바일 기기</option>
                            <option value={"space"}>공간</option>
                        </select>
                    </div>
                    {printForm(currCategory)}
                        <hr className={facilityStyle.firstLine}/>
                        <div className={facilityStyle.companys}>
                            사용 회사
                            <input 
                            type="button" 
                            value="회사 선택" 
                            className={facilityStyle.company}></input>
                        </div>
                        <hr className={facilityStyle.secondLine}/>
                    {printBtn(currCategory)}
                </form>
            </div>
        </div>
    )
}

export default FacilityModifyModal;