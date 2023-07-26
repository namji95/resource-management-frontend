import { useState } from "react";
import axios from "axios";
import facilitySaveStyle from "../facility/FacilitySaveModal.module.css

function FacilitySaveModal(props) {

    console.log(props);

    const defaultCarObj = {
        carName : "",
        carNumber :"",
        carDistance : "",
        carYear : "",
        // carImage : "",
        carExplan : ""
    }

    // 객체 Key : value
    
    const [carObj, setCarObj] = useState(defaultCarObj);

    const onChangeCar = (e) => {
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...carObj,//spread 연산자
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

    const FacilitySaveModal = (event) => {
        event.preventDefault();
            
            axios.post("http://localhost:8080/FacilitySaveModal", 
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
        <div className={facilitySaveStyle.backgroud_block}>
            <div className={facilitySaveStyle.black}/>
            <div className={facilitySaveStyle.update_page}>
            <button className={facilitySaveStyle.cancelButton} onClick={closeModal}>X</button>
                <form action="http://localhost:8080/FacilitySaveModal" method="POST" encType="multipart/form-data">
                    <div className={facilitySaveStyle.essential}>
                        ● 필수 항목
                    </div>
                    <div className={facilitySaveStyle.categorys}>
                        카테고리
                    <select className={facilitySaveStyle.category}>
                        <option>차량</option>
                        <option>모바일 기기</option>
                        <option>회의실</option>
                        <option>교육장</option>
                    </select><br/>
                    </div>
                    <div className={facilitySaveStyle.carNames}>
                        ● 차량명
                        <input
                        type='text'
                        className={facilitySaveStyle.carName}
                        placeholder="차량명"
                        name="carName"
                        value={carObj.carName}
                        onChange={onChangeCar}></input>                
                    </div>
                    <div className={facilitySaveStyle.carNumbers}>
                        ● 차량번호
                        <input
                        type='text'
                        className={facilitySaveStyle.carNumber}
                        placeholder="차량번호"
                        name="carNumber"
                        value={carObj.carNumber}
                        onChange={onChangeCar}></input>
                    </div>
                    <div className={facilitySaveStyle.carDistances}>
                        ● 주행거리
                        <input
                        type='number'
                        className={facilitySaveStyle.carDistance}
                        placeholder="주행거리"
                        name="carDistance"
                        value={carObj.carDistance}
                        onChange={onChangeCar}></input>
                    </div>
                    <div className={facilitySaveStyle.carYears}>
                        ● 차량연식
                        <input
                        type='date'
                        className={facilitySaveStyle.carYear}
                        name="carYear"
                        value={carObj.carYear}
                        onChange={onChangeCar}></input>                
                    </div>
                    <div className={facilitySaveStyle.carImages}>
                        이미지
                        <input
                        type='file'
                        className={facilitySaveStyle.carImage}
                        name="carImage"
                        value={carObj.carImage}
                        onChange={onChangeCar}></input>
                    </div>
                    <div className={facilitySaveStyle.explanations}>
                        설명
                        <input 
                        type='text'
                        className={facilitySaveStyle.explanation}
                        placeholder="차량 추가에 대한 설명"
                        name ="carExplan"
                        value={carObj.carExplan}
                        onChange={onChangeCar}></input>
                    </div>
                    <hr className={facilitySaveStyle.firstLine}/>
                    <div className={facilitySaveStyle.companys}>
                        사용 회사
                        <input 
                        type="button" 
                        value="회사 선택" 
                        className={facilitySaveStyle.company}></input>
                    </div>
                    <hr className={facilitySaveStyle.secondLine}/>
                    <div className={facilitySaveStyle.sNcBtn}>
                        <input 
                        onClick={onReset}
                        type="reset"
                        className={facilitySaveStyle.cancel}></input>
                        <input 
                        type="submit" 
                        value="저장"
                        className={facilitySaveStyle.save}
                        onClick={FacilitySaveModal}></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FacilitySaveModal;