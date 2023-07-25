import { useState,useEffect } from "react";
import axios from "axios";
import facilitySaveStyle from './DeviceSaveModal.module.css';
import {Table} from "react-bootstrap";
function DeviceSelectAll(props) { 
    

    const [deviceObj, setdeviceObj] =useState({
        dvcName : "",
        dvcSerial: "",
        dvcBuy : "",
        dvcExplan : "",
        dvcCreated : "",
        dvcUpdated : ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
          .get("http://localhost:9000/DeviceSelectAll")
          .then((response) => {
            console.log(response.data);
            setdeviceObj(response.data);
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
                  <th>기기명</th>
                  <th>시리얼 번호</th>
                  <th>구입년도</th>
                  <th>기기 설명</th>
                  <th>생성일</th>
                  <th>업데이트일</th>
                </tr>
              </thead>
              <tbody>
                {deviceObj.map((device, index) => (
                  <tr key={index}>
                    <td>{device.dvcName}</td>
                    <td>{device.dvcSerial}</td>
                    <td>{device.dvcBuy}</td>
                    <td>{device.dvcExplan}</td>
                    <td>{device.dvcCreated}</td>
                    <td>{device.dvcUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      );
    }

export default DeviceSelectAll;