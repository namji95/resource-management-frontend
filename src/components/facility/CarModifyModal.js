import axios from "axios";
import { useEffect, useState } from "react";
import carUpdateStyle from './css/CarModifyModal.module.css';

function CarModifyModal(props) {
    const defaultCarObj = {
        carName : "",
        carNumber :"",
        carDistance : "",
        carYear : "",
        carExplain : ""
    }
    const [carObj, setCarObj] = useState(defaultCarObj);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (props.selectCar) {
            setCarObj(props.selectCar);
        }
    }, []);

    const closeModifyModal = () => {
        props.setUpdateModal(false);
    }

    let data;

    data = {
        carName: carObj.carName,
        carNumber: carObj.carNumber,
        carDistance: carObj.carDistance,
        carYear: carObj.carYear,
        carExplain: carObj.carExplain
    };

    const onChangeCar = (e) => {
        const currentDateTime = new Date().toISOString();
        let newName = e.target.name;
        let newValue = e.target.value;
        const newObj = {
            ...carObj,
            [newName] : newValue,
            carCreated : currentDateTime,
            carUpdated : currentDateTime
        }
        setCarObj(newObj);
    }

    const onChangeImageInput = e => {
        setImage(e.target.files[0]);
    }

    const CarUpdateModal = (event) => {
        event.preventDefault();

        const formData = new FormData();

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }

        formData.append("image", image);
        formData.append("data", new Blob([JSON.stringify(data)],{
            type: "application/json"
        }));

        axios.post(`http://localhost:8080/api/car/${props.selectCar.carSeq}`, formData, config)
        .then(response => {
            console.log(response.data);
            alert("변경 완료");
        })
        .catch(error => {
            alert("변경 실패",error)
        });
    }

    const  CarDeleteModal = (event) => {
        event.preventDefault();

        const formData = new FormData();

        const config = {
            headers : { 'Content-Type' : 'multipart/form-data' }
        }

        formData.append("image", image);
        formData.append("data", new Blob([JSON.stringify(data)],{
            type: "application/json"
        }));

        axios.post(`http://localhost:8080/api/car/del/${props.selectCar.carSeq}`, formData, config)
        .then(response => {
            console.log(response.data);
            alert("삭제 완료");
        })
        .catch(error => {
            alert("삭제 실패", error)
        });
    }

    const printCarUpdateForm = () => {
        return (
            <>
                <div className={carUpdateStyle.names}>
                    <span className={carUpdateStyle.carname}>
                    ● 차량명
                    </span>
                    <input
                    type='text'
                    className={carUpdateStyle.name}
                    placeholder={data.carName}
                    name="carName"
                    value={data.carName}
                    onChange={onChangeCar}></input>
                </div>
                <div className={carUpdateStyle.numbers}>
                    ● 차량번호
                    <input
                    type='text'
                    className={carUpdateStyle.number}
                    placeholder="차량번호"
                    name="carNumber"
                    value={data.carNumber}
                    onChange={onChangeCar}></input>
                </div>
                <div className={carUpdateStyle.distances}>
                    ● 주행거리
                    <input
                    type='number'
                    className={carUpdateStyle.distance}
                    placeholder="주행거리"
                    name="carDistance"
                    value={data.carDistance}
                    onChange={onChangeCar}></input>
                </div>
                <div className={carUpdateStyle.years}>
                    ● 차량연식
                    <input
                    type='date'
                    className={carUpdateStyle.year}
                    name="carYear"
                    value={data.carYear}
                    onChange={onChangeCar}></input>                
                </div>
                <div className={carUpdateStyle.explanations}>
                    설명
                    <input 
                    type='text'
                    className={carUpdateStyle.explanation}
                    placeholder="차량 추가에 대한 설명"
                    name ="carExplain"
                    value={data.carExplain}
                    onChange={onChangeCar}></input>
                </div>
                <div className={carUpdateStyle.images}>
                    이미지
                    <input
                    type='file'accept="image/jpg,image/png,image/jpeg,image/gif"
                    className={carUpdateStyle.image}
                    name="carImage"
                    value={data.carImage}
                    onChange={onChangeImageInput}></input>
                </div>
            </>
        )
    }

    const printBtn = () => {
        const updateBtn = <input 
                            type="submit"
                            value="수정"
                            className={carUpdateStyle.update}
                            onClick={CarUpdateModal} 
                            />
        const resetBtn = <input 
                            type="submit"
                            value="삭제"
                            className={carUpdateStyle.cancel}
                            onClick={CarDeleteModal}
                            />
        return (
            <div className={carUpdateStyle.sNcBtn}>
                {resetBtn}
                {updateBtn}
            </div>
        )
    }

    return (
        <div className={carUpdateStyle.backgroud_block}>
            <div className={carUpdateStyle.back} />
            <div className={carUpdateStyle.update_page}>
            <button className={carUpdateStyle.cancelButton} onClick={closeModifyModal}>X</button>
                <form action={CarUpdateModal} method="POST" encType="multipart/form-Data">
                    <div className={carUpdateStyle.essential}>
                        ● 필수 항목
                    </div>
                        {printCarUpdateForm()}
                        <hr className={carUpdateStyle.firstLine}/>
                        <div className={carUpdateStyle.companys}>
                            사용 회사
                            <input 
                            type="button" 
                            value="회사 선택" 
                            className={carUpdateStyle.company}></input>
                        </div>
                        <hr className={carUpdateStyle.secondLine}/>
                    {printBtn()}
                </form>
            </div>
        </div>
    )
}

export default CarModifyModal;