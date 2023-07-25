import { useState } from "react";
import axios from "axios";
import facilitySaveStyle from './DeviceSaveModal.module.css';

function DeviceSaveModal(props) { 
    

    const defaultdeviceObj = {
        dvcName : "",
        dvcSerial: "",
        dvcBuy : "",
        dvcExplan : "",
        dvcCreated : "",
        dvcUpdated : ""
    }
    const [deviceObj, setdeviceObj] = useState(defaultdeviceObj);

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

    const onReset = () => {
            setdeviceObj(defaultdeviceObj);
    }

    const closeModal = () => {
        props.setShowModal(!props.showModal);
    }
  
    const FacilitySaveModal = (event) => {

        event.preventDefault();
        axios.post("http://localhost:9000/DeviceSaveModal",  
            deviceObj
        ).then(response => {
            if (response.data != null) {    
                alert("등록이 완료되었습니다.");
            } else {
                alert("이미 등록된 설비입니다. 다시 등록하세요");
            }
        })
        .catch(error => {
            alert(error);
        });
    };
    return (
        <div className={facilitySaveStyle.backgroud_block}>
            <div class={facilitySaveStyle.black}/>
            <div className={facilitySaveStyle.update_page}>
            <button className={facilitySaveStyle.cancelButton} onClick={closeModal}>X</button>
                <form>
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
                    <div className={facilitySaveStyle.dvcNames}>
                        ● 전자기기명
                        <input
                        type='text'
                        className={facilitySaveStyle.dvcName}
                        placeholder="전자기기명"
                        name="dvcName"
                        value={deviceObj.dvcName}
                        onChange={onChangedevice}></input>                
                    </div>
                    <div className={facilitySaveStyle.dvcSerials}>
                        ● 제품번호
                        <input
                        type='text'
                        className={facilitySaveStyle.dvcSerial}
                        placeholder="제품번호"
                        name="dvcSerial"
                        value={deviceObj.dvcSerial}
                        onChange={onChangedevice}></input>
                    </div>
                    <div className={facilitySaveStyle.dvcBuys}>
                        ● 구입년도
                        <input
                        type='Date'
                        className={facilitySaveStyle.dvcBuy}
                        placeholder="구입년도"
                        name="dvcBuy"
                        value={deviceObj.dvcBuy}
                        onChange={onChangedevice}></input>
                    </div>
                    <div className={facilitySaveStyle.dvcExplans}>
                        ● 기기 설명
                        <input
                        type='textarea'
                        className={facilitySaveStyle.dvcExplan}
                        name="dvcExplan"
                        value={deviceObj.dvcExplan}
                        onChange={onChangedevice}></input>                
                    </div>
                    
                    <div className={facilitySaveStyle.dvcImages}>
                        이미지
                        <input
                        type='file'
                        className={facilitySaveStyle.dvcImage}></input> 
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

export default DeviceSaveModal;