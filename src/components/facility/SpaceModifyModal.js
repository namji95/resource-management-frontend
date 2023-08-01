import axios from "axios";
import { useEffect, useState } from "react";
import SpaceModifyStyle from "./css/SpaceModifyModal.module.css";

function SpaceModifyModal(props) {

    const defaultSpaceObj = {
        spcName : "",
        spcCap : "",
        spcExplain : "",
        spcImage : ""
    }

    const [spaceObj, setSpaceObj] = useState(defaultSpaceObj);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (props.selectSpace) {
            setSpaceObj(props.selectSpace);
        }
    }, [props.selectDevice]);

    const closeModifyModal = () => {
        props.setUpdateModal(false);
        props.setSelectSpace(null);
    }

    let data;

    data = {
        spcName: spaceObj.spcName,
        spcCap: spaceObj.spcCap,
        spcExplain: spaceObj.spcExplain,
        spcImage: spaceObj.spcImage
    };

    const onChangeDevice = (e) => {
        const currentDateTime = new Date().toISOString();
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...spaceObj,
            [newName] : newValue,
            spaceCreated : currentDateTime,
            spaceUpdated : currentDateTime
        }
        setSpaceObj(newObj);
    }

    const onChangeImageInput = e => {
        setImage(e.target.files[0]);
    }

    const onReset = () => {
        setSpaceObj(data);
    }

    const SpaceUpdateModal = (event) => {
        event.preventDefault();

        const formData = new FormData();

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }

        formData.append("image", image);
        formData.append("data", new Blob([JSON.stringify(data)],{
            type: "application/json"
        }));

        axios.post(`http://localhost:8080/api/space/${props.selectSpace.spcSeq}`, formData, config)
        .then(response => {
            console.log(response.data);
            alert("변경 완료");
        })
        .catch(error => {
            alert("변경 실패",error)
        });
    }
    const printSpaceUpdateForm = () => {
        return (
            <>
                <div className={SpaceModifyStyle.names}>
                    ● 전자기기명
                    <input
                    type='text'
                    className={SpaceModifyStyle.name}
                    placeholder="전자기기명"
                    name="dvcName"
                    value={data.dvcName}
                    onChange={onChangeDevice}></input>                
                </div>
                <div className={SpaceModifyStyle.Serials}>
                    ● 제품번호
                    <input
                    type='text'
                    className={SpaceModifyStyle.Serial}
                    placeholder="제품번호"
                    name="dvcSerial"
                    value={data.dvcSerial}
                    onChange={onChangeDevice}></input>
                </div>
                <div className={SpaceModifyStyle.years}>
                    ● 구입년도
                    <input
                    type='Date'
                    className={SpaceModifyStyle.year}
                    placeholder="구입년도"
                    name="dvcBuy"
                    value={data.dvcBuy}
                    onChange={onChangeDevice}></input>
                </div>
                <div className={SpaceModifyStyle.explanations}>
                    설명
                    <input
                    type='textarea'
                    className={SpaceModifyStyle.explanation}
                    name="dvcExplain"
                    value={data.dvcExplain}
                    onChange={onChangeDevice}></input>                
                </div>
                <div className={SpaceModifyStyle.images}>
                    이미지
                    <input
                    type='file'accept="image/jpg,image/png,image/jpeg,image/gif"
                    className={SpaceModifyStyle.image}
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
                            className={SpaceModifyStyle.update}
                            onClick={SpaceUpdateModal} 
                            />
        const resetBtn = <input 
                            type="reset"
                            value="초기화"
                            className={SpaceModifyStyle.cancel}
                            onClick={onReset}/>
        return (
            <div className={SpaceModifyStyle.sNcBtn}>
                {resetBtn}
                {updateBtn}
            </div>
        )
    }

    return (
        <div className={SpaceModifyStyle.backgroud_block}>
            <div className={SpaceModifyStyle.back} />
            <div className={SpaceModifyStyle.update_page}>
            <button className={SpaceModifyStyle.cancelButton} onClick={closeModifyModal}>X</button>
                <form action={SpaceUpdateModal} method="POST" encType="multipart/form-Data">
                    <div className={SpaceModifyStyle.essential}>
                        ● 필수 항목
                    </div>
                        {printSpaceUpdateForm()}
                        <hr className={SpaceModifyStyle.firstLine}/>
                        <div className={SpaceModifyStyle.companys}>
                            사용 회사
                            <input 
                            type="button" 
                            value="회사 선택" 
                            className={SpaceModifyStyle.company}></input>
                        </div>
                        <hr className={SpaceModifyStyle.secondLine}/>
                    {printBtn()}
                </form>
            </div>
        </div>
    )
}

export default SpaceModifyModal;