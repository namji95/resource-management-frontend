import { useState,useEffect } from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import DeviceSelectAllStyle from "./css/DeviceSelectAll.module.css";
import DeviceModifyModal from "./DeviceModifyModal";

function DeviceSelectAll(props) {

    const [deviceObj, setDeviceObj] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectDevice, setSelectDevice] = useState(null);

    const openModal = () => {
      setUpdateModal(updateModal => !updateModal);
    }

    const handleInfoClick = (device) => {
      setSelectDevice(device);
      setUpdateModal(true);
    }

    const closeModifyModal = () => {
      setUpdateModal(false);
    }

    useEffect(() => {
        axios
          .get("http://localhost:8080/api/device")
          .then((response) => {
            console.log(response.data);
            setDeviceObj(response.data.dvcList);
          })
          .catch((error) => {
            console.error("기기 정보를 가져오는데 실패했습니다.", error);
          });
      }, []);

      const handleCheckboxChange = (index) => {
        const updateDeviceObj = [...deviceObj];
        updateDeviceObj[index].checked = !updateDeviceObj[index].checked;
        setDeviceObj(updateDeviceObj);
      };

      return (
        <div>
            <Table>
                <div className={DeviceSelectAllStyle.resourceTable}>
                    <thead>
                      <tr>
                        <th className={DeviceSelectAllStyle.check}><input type="checkbox" /></th>
                        <th className={DeviceSelectAllStyle.name}>전자기기명</th>
                        <th className={DeviceSelectAllStyle.number}>전자기기 시리얼번호</th>
                        <th className={DeviceSelectAllStyle.year}>전자기기 구입년도</th>
                        <th className={DeviceSelectAllStyle.explain}>전자기기 설명</th>
                        <th className={DeviceSelectAllStyle.image}>전자기기 이미지</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deviceObj.map((device, index) => (
                          <tr key={index} onClick={() => handleInfoClick(device)} className={DeviceSelectAllStyle.deviceInformation}>
                             <td className={DeviceSelectAllStyle.check}>
                              <input 
                              type="checkbox" 
                              checked={device.checked || false}
                              onChange={() => handleCheckboxChange(index)}
                              /></td>
                             <td className={DeviceSelectAllStyle.name} onClick={openModal}>{device.dvcName}</td>
                             <td className={DeviceSelectAllStyle.number} onClick={openModal}>{device.dvcSerial}</td>
                             <td className={DeviceSelectAllStyle.year} onClick={openModal}>{device.dvcBuy}</td>
                             <td className={DeviceSelectAllStyle.explain} onClick={openModal}>{device.dvcExplain}</td>
                             <td><img src={device.dvcImage} className={DeviceSelectAllStyle.image} onClick={openModal}></img></td>
                          </tr> 
                      ))}
                      {updateModal && (
                        <DeviceModifyModal
                        // 모달창 열림 상태일 때 CarModifyModal 컴포넌트 렌더링
                        updateModal={updateModal}
                        setUpdateModal={setUpdateModal}
                        selectDevice={selectDevice}
                        closeModifyModal={closeModifyModal}
                        setSelectDevice={setSelectDevice}
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

export default DeviceSelectAll;