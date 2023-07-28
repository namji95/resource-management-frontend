import { useState,useEffect } from "react";
import axios from "axios";
import facilitySaveStyle from '../Device/DeviceSaveModal.module.css';
import {Table} from "react-bootstrap";

function CarSelectAll(props) { 
    
    // const [carObj, setcarObj] = useState([])
    const [loading, setLoading] = useState(true);
    const [carObj, setcarObj] = useState({
        carName : "",
        carNumber : "",
        carDistance : "",
        carYear : "",
        carImage : "",
        carExplain : ""
    });

    useEffect(() => {
        axios
          .get("http://localhost:8080/api/car")
          .then((response) => {
            console.log(response.data);
            setcarObj(response.data);
            setLoading(false); // 데이터 가져오기가 완료되면 로딩 상태를 false로 변경
          })
          .catch((error) => {
            console.error("기기 정보를 가져오는데 실패했습니다.", error);
            setLoading(false); // 데이터 가져오기가 실패하더라도 로딩 상태를 false로 변경
          });
      }, []);
    
      return (
        <div>
          {loading ? (
            <div>Loading...</div> // 데이터를 가져오는 동안 로딩 표시
          ) : (
            <Table striped bordered>
              <thead>
                <tr>
                  <th>차량명</th>
                  <th>차량 번호</th>
                  <th>주행거리</th>
                  <th>차량 연식</th>
                  <th>차량 설명</th>
                  <th>차량 이미지</th>
                </tr>
              </thead>
              <tbody>
                {carObj.map((car, index) => (
                 <tr key={index}>
                   <td>{car.carName}</td>
                   <td>{car.carNumber}</td>
                   <td>{car.carDistance}</td>
                   <td>{car.carYear}</td>
                   <td>{car.carExplain}</td>
                   <td>{car.carImage}</td>
                 </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      );
    }

export default CarSelectAll;