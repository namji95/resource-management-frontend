import { useEffect, useState } from "react";
import axios from "axios";

import facilityModifyStyle from "../car/FacilitySaveModal.module.css";

function FacilityModifyModal(props) {


    const defaultCarObj = {
        carName : "",
        carNumber :"",
        carDistance : "",
        carYear : "",
        carImage : "",
        carExplan : ""
    }

    const [carObj, setCarObj] = useState(defaultCarObj);

    const onChangeCar = (e) => {
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...carObj,
            [newName] : newValue
        }
        setCarObj(newObj);
    }

    const onReset = () => {
            setCarObj(defaultCarObj);
    }

    const closeModal = () => {
        props.setShowModal(!props.showModal);
    }

    const Facility_modals = (event) => {
        event.preventDefault();

        // // 이미지를 선택하고 base64로 인코딩
        // const fileInput = document.querySelector('input[type="file"]');
        // const file = fileInput.files[0];
        // const reader = new FileReader();

        // reader.onloadend = () => {
        //     const base64Image = reader.result;

        // // 이미지를 담은 FormData 생성
        // const formData = new FormData();
        // formData.append("carName", carObj.carName);
        // formData.append("carNumber", carObj.carNumber);
        // formData.append("carDistance", carObj.carDistance);
        // formData.append("carYear", carObj.carYear);
        // formData.append("carImage", base64Image);
        // formData.append("carExplan", carObj.carExplan);

        //         // 서버로 전송
        //         axios.post("http://localhost:8080/facilityModals", formData, {
        //             headers: {
        //                 "Content-Type": "multipart/form-data"
        //             }
        //         }).then (response => {
        //             if (response.data != null) {
        //                 alert("등록이 완료되었습니다.");
        //             } else {
        //                 alert("이미 등록된 설비입니다. 다시 등록하세요");
        //             }
        //         }).catch (error => {
        //             alert(error);
        //         });
        //     };
        
        //     if (file) {
        //         reader.readAsDataURL(file);
        //     }

        axios.post("http://localhost:8080/facilityModals", 
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

    return (
        <div className={facilityModifyStyle.backgroud_block}>
            <div class={facilityModifyStyle.black}/>
            <div className={facilityModifyStyle.update_page}>
            <button className={facilityModifyStyle.cancelButton} onClick={closeModal}>X</button>
                <form action="http://localhost:8080/facilityModals" method="POST" encType="multipart/form-data">
                    <div className={facilityModifyStyle.essential}>
                        ● 필수 항목
                    </div>
                    <div className={facilityModifyStyle.categorys}>
                        카테고리
                    <select className={facilityModifyStyle.category}>
                        <option>차량</option>
                        <option>모바일 기기</option>
                        <option>회의실</option>
                        <option>교육장</option>
                    </select><br/>
                    </div>
                    <div className={facilityModifyStyle.carNames}>
                        ● 차량명
                        <input
                        type='text'
                        className={facilityModifyStyle.carName}
                        placeholder="차량명"
                        name="carName"
                        value={carObj.carName}
                        onChange={onChangeCar}></input>                
                    </div>
                    <div className={facilityModifyStyle.carNumbers}>
                        ● 차량번호
                        <input
                        type='text'
                        className={facilityModifyStyle.carNumber}
                        placeholder="차량번호"
                        name="carNumber"
                        value={carObj.carNumber}
                        onChange={onChangeCar}></input>
                    </div>
                    <div className={facilityModifyStyle.carDistances}>
                        ● 주행거리
                        <input
                        type='number'
                        className={facilityModifyStyle.carDistance}
                        placeholder="주행거리"
                        name="carDistance"
                        value={carObj.carDistance}
                        onChange={onChangeCar}></input>
                    </div>
                    <div className={facilityModifyStyle.carYears}>
                        ● 차량연식
                        <input
                        type='date'
                        className={facilityModifyStyle.carYear}
                        name="carYear"
                        value={carObj.carYear}
                        onChange={onChangeCar}></input>                
                    </div>
                    <div className={facilityModifyStyle.carImages}>
                        이미지
                        <input
                        type='file'
                        className={facilityModifyStyle.carImage}
                        name="carImage"
                        value={carObj.carImage}
                        onChange={onChangeCar}></input>
                    </div>
                    <div className={facilityModifyStyle.explanations}>
                        설명
                        <input 
                        type='text'
                        className={facilityModifyStyle.explanation}
                        placeholder="차량 추가에 대한 설명"
                        name ="carExplan"
                        value={carObj.carExplan}
                        onChange={onChangeCar}></input>
                    </div>
                    <hr className={facilityModifyStyle.firstLine}/>
                    <div className={facilityModifyStyle.companys}>
                        사용 회사
                        <input 
                        type="button" 
                        value="회사 선택" 
                        className={facilityModifyStyle.company}></input>
                    </div>
                    <hr className={facilityModifyStyle.secondLine}/>
                    <div className={facilityModifyStyle.sNcBtn}>
                        <input 
                        onClick={onReset}
                        type="reset"
                        className={facilityModifyStyle.cancel}></input>
                        <input 
                        type="submit" 
                        value="수정"
                        className={facilityModifyStyle.save}
                        onClick={Facility_modals}></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FacilityModifyModal;