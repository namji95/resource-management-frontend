import axios from "axios";
import { useEffect, useState } from "react";
import deviceModifyStyle from './css/DeviceModifyModal.module.css';

function DeviceModifyModal(props) {

    const defaultdeviceObj = {
        dvcName : "",
        dvcSerial: "",
        dvcBuy : "",
        dvcExplain : ""
    }

    const [deviceObj, setDeviceObj] = useState(defaultdeviceObj);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (props.selectDevice) {
            setDeviceObj(props.selectDevice);
        }
    }, []);

    const closeModifyModal = () => {
        props.setUpdateModal(false);
    }

    let data;

    data = {
        dvcName: deviceObj.dvcName,
        dvcSerial: deviceObj.dvcSerial,
        dvcBuy: deviceObj.dvcBuy,
        dvcExplain: deviceObj.dvcExplain
    };

    const onChangeDevice = (e) => {
        const currentDateTime = new Date().toISOString();
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...deviceObj,
            [newName] : newValue,
            deviceCreated : currentDateTime,
            deviceUpdated : currentDateTime
        }
        setDeviceObj(newObj);
    }

    const onChangeImageInput = e => {
        setImage(e.target.files[0]);
    }

    const DeviceUpdateModal = (event) => {
        event.preventDefault();

        const formData = new FormData();

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }

        formData.append("image", image);
        formData.append("data", new Blob([JSON.stringify(data)],{
            type: "application/json"
        }));

        axios.post(`http://localhost:8080/api/device/${props.selectDevice.dvcSeq}`, formData, config)
        .then(response => {
            alert("변경 완료");
            closeModifyModal();

            props.setModifiedObj(response?.data?.data);
            console.log("props > ", props);
            console.log("response.data.data > ", response.data.data);
            console.log(`${props.selectDevice.dvcSeq}`)
        })
        .catch(error => {
            alert("변경 실패",error);
        });
    }

    const DeviceDeleteModal = (event) => {
        event.preventDefault();

        const formData = new FormData();

        const config = {
            headers : { 'Content-Type' : 'multipart/form-data' }
        }

        formData.append("image", image);
        formData.append("data", new Blob([JSON.stringify(data)],{
            type: "application/json"
        }));

        axios.post(`http://localhost:8080/api/device/del/${props.selectDevice.dvcSeq}`, formData, config)
        .then(response => {
            alert("삭제 완료");
            closeModifyModal();

            props.setDeletedObj(response?.data?.data);
            console.log("props > ", props);
            console.log("response.data.data > ", response.data.data);
            console.log(`${props.selectDevice.dvcSeq}`)
        })
        .catch(error => {
            alert("삭제 실패", error);
        });
    }
    const printDeviceUpdateForm = () => {
        return (
            <>
                <div className={deviceModifyStyle.names}>
                    ● 전자기기명
                    <input
                    type='text'
                    className={deviceModifyStyle.name}
                    placeholder="전자기기명"
                    name="dvcName"
                    value={data.dvcName}
                    onChange={onChangeDevice}></input>                
                </div>
                <div className={deviceModifyStyle.Serials}>
                    ● 제품번호
                    <input
                    type='text'
                    className={deviceModifyStyle.Serial}
                    placeholder="제품번호"
                    name="dvcSerial"
                    value={data.dvcSerial}
                    onChange={onChangeDevice}></input>
                </div>
                <div className={deviceModifyStyle.years}>
                    ● 구입년도
                    <input
                    type='Date'
                    className={deviceModifyStyle.year}
                    placeholder="구입년도"
                    name="dvcBuy"
                    value={data.dvcBuy}
                    onChange={onChangeDevice}></input>
                </div>
                <div className={deviceModifyStyle.explanations}>
                    설명
                    <input
                    type='textarea'
                    className={deviceModifyStyle.explanation}
                    name="dvcExplain"
                    value={data.dvcExplain}
                    onChange={onChangeDevice}></input>                
                </div>
                <div className={deviceModifyStyle.images}>
                    이미지
                    <input
                    type='file'accept="image/jpg,image/png,image/jpeg,image/gif"
                    className={deviceModifyStyle.image}
                    name="dvcImage"
                    value={data.dvcImage}
                    onChange={onChangeImageInput}></input>
                </div>
            </>
        )
    }

    const printBtn = () => {
        const updateBtn = <input 
                            type="submit"
                            value="수정"
                            className={deviceModifyStyle.update}
                            onClick={DeviceUpdateModal} 
                            />
        const resetBtn = <input 
                            type="reset"
                            value="삭제"
                            className={deviceModifyStyle.cancel}
                            onClick={DeviceDeleteModal}/>
        return (
            <div className={deviceModifyStyle.sNcBtn}>
                {resetBtn}
                {updateBtn}
            </div>
        )
    }

    return (
        <div className={deviceModifyStyle.backgroud_block}>
            <div className={deviceModifyStyle.back} />
            <div className={deviceModifyStyle.update_page}>
            <button className={deviceModifyStyle.cancelButton} onClick={closeModifyModal}>X</button>
                <form>
                    <div className={deviceModifyStyle.essential}>
                        ● 필수 항목
                    </div>
                        {printDeviceUpdateForm()}
                        <hr className={deviceModifyStyle.firstLine}/>
                        <div className={deviceModifyStyle.companys}>
                            사용 회사
                            <input 
                            type="button" 
                            value="회사 선택" 
                            className={deviceModifyStyle.company}></input>
                        </div>
                        <hr className={deviceModifyStyle.secondLine}/>
                    {printBtn()}
                </form>
            </div>
        </div>
    )
}

export default DeviceModifyModal;