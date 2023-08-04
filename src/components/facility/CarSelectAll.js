import { useState,useEffect } from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import CarSelectAllStyle from "./css/CarSelectAll.module.css";
import CarModifyModal from "./CarModifyModal";

function CarSelectAll(props) {

    const [carObj, setcarObj] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectCar, setSelectCar] = useState(null);

    const openModal = () => {
      setUpdateModal(updateModal => !updateModal);
    }

    const handleInfoClick = (car) => {
      setSelectCar(car);
      setUpdateModal(true); // 모달창 열기
    }

    const closeModifyModal = () => {
      setUpdateModal(false);
    }

    useEffect(() => {
        axios
          .get("http://localhost:8080/api/car")
          .then((response) => {
            console.log(response.data);
            setcarObj(response.data.carList);
          })
          .catch((error) => {
            console.error("기기 정보를 가져오는데 실패했습니다.", error);
          });
      }, []);

      const handleCheckboxChange = (index) => {
        const updatedCarObj = [...carObj];
        updatedCarObj[index].checked = !updatedCarObj[index].checked;
        setcarObj(updatedCarObj);
      };

      return (
        <div>
          <Table>
            <div className={CarSelectAllStyle.resourceTable}>
              <thead>
                <tr>
                  <th className={CarSelectAllStyle.check}><input type="checkbox" /></th>
                  <th className={CarSelectAllStyle.name}>차량명</th>
                  <th className={CarSelectAllStyle.number}>차량 번호</th>
                  <th className={CarSelectAllStyle.distance}>주행거리</th>
                  <th className={CarSelectAllStyle.year}>차량 연식</th>
                  <th className={CarSelectAllStyle.explain}>차량 설명</th>
                  <th className={CarSelectAllStyle.image}>차량 이미지</th>      
                </tr>
              </thead>
              <tbody>
                {carObj.map((car, index) => (
                  <tr key={index} 
                      className={CarSelectAllStyle.carInformation} 
                      onClick={() => handleInfoClick(car)}>
                    {/* 각 행을 클릭할 때 해당 행의 정보를 선택 */}
                    <td className={CarSelectAllStyle.check}>
                      <input
                        type="checkbox"
                        checked={car.checked || false}
                        onChange={() => handleCheckboxChange(index)}
                      />
                  </td>
                    <td className={CarSelectAllStyle.name} onClick={openModal}>{car.carName}</td>
                    <td className={CarSelectAllStyle.number} onClick={openModal}>{car.carNumber}</td>
                    <td className={CarSelectAllStyle.distance} onClick={openModal}>{car.carDistance}</td>
                    <td className={CarSelectAllStyle.year} onClick={openModal}>{car.carYear}</td>
                    <td className={CarSelectAllStyle.explain} onClick={openModal}>{car.carExplain}</td>
                    <td><img src={car.carImage} className={CarSelectAllStyle.image} onClick={openModal}></img></td>
                 </tr> 
                ))}
                {updateModal && (
                  <CarModifyModal
                  // 모달창 열림 상태일 때 CarModifyModal 컴포넌트 렌더링
                  updateModal={updateModal}
                  setUpdateModal={setUpdateModal}
                  selectCar={selectCar}
                  closeModifyModal={closeModifyModal}
                  setSelectCar={setSelectCar}
                  //setSelectCar 함수를 CarModifyModal 컴포넌트로 전달
                  // 선택한 자원 정보를 CarModifyModal 컴포넌트로 전달
                  />
                )}
              </tbody>
            </div>
          </Table>
        </div>
      );
    }

export default CarSelectAll;