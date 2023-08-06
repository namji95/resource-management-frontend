import React, { useState } from "react";
import resourceListStyle from '../facility/css/ResourceList.module.css';
import CarSelectAll from "../facility/CarSelectAll";
import 'bootstrap/dist/css/bootstrap.min.css';
import DeviceSelectAll from "../facility/DeviceSelectAll";
import SpaceSelectAll from "../facility/SpaceSelectAll";

function MeetingResourceList(props) {

  // 상태 (state) 변수들
  const [showModal, setShowModal] = useState
  (false);
  // showModal : 모달 창의 보이기 / 숨기기 상태를 관리
  const [show, setShow] = useState(false);
  // show : 보이기 / 숨기기 상태를 관리
  const [carResourceListClick, setCarResourceListwClick] = useState(false);
  // carResourceListClick : 차량 자원 리스트를 보이기 / 숨기기 상태 관리
  const [deviceResourceListClick, setDeviceResourceListClick] = useState(false);
  // carResourceListClick : 차량 자원 리스트를 보이기 / 숨기기 상태 관리
  const [spaceResourceListClick, setspaceResourceListClick] = useState(false);
  // carResourceListClick : 차량 자원 리스트를 보이기 / 숨기기 상태 관리

  const openModal = () => {
    setShowModal(showModal => !showModal);
  };
  // 모달 창 열기 / 닫기 함수
  
  // 자원 리스트 클릭 시 보이게 / 숨기게 하는 함수
  const onClickCarResource = () => {
    setCarResourceListwClick(!carResourceListClick);
  }
  const onClickDeviceResource = () => {
    setDeviceResourceListClick(!deviceResourceListClick);
  }
  const onClickSpaceResource = () => {
    setspaceResourceListClick(!spaceResourceListClick);
  }

  // 보이기 함수
  const handleShow = () => {
    setShow(!show);
  };
  // 상태관리 함수 정의 후 각 함수의 열기/닫기 보이기/숨기기 함수 정의

  return (
    <div className={resourceListStyle.resourceTable}>

      {/* 자원 카테고리 */}
      <div className={resourceListStyle.resourceCategory}>
        <div className={resourceListStyle.categoryList}>
        <label className={resourceListStyle.category} onClick={onClickCarResource}>
          차량
        </label>
          <div className={resourceListStyle.carlis} />
        </div>
        <div className={resourceListStyle.categoryList}>
          <label className={resourceListStyle.category} onClick={onClickDeviceResource}>
            전자기기 
          </label>
            <div className={resourceListStyle.deviceList}>
            </div>
        </div>
        <div className={resourceListStyle.categoryList}>
          <label className={resourceListStyle.category} onClick={onClickSpaceResource}>
            공간
          </label>
            <div className={resourceListStyle.SpaceList}>
            </div>
        </div>
      </div>
      {/* 자원 정보 */}
      <div className={resourceListStyle.categoeryInfomation}>
        {carResourceListClick && (
          <tr className={resourceListStyle.resourceList}>
            <td>
              <CarSelectAll />
            </td>
          </tr>
        )}
        {deviceResourceListClick && (
          <tr className={resourceListStyle.resourceList}>
            <td>
              <DeviceSelectAll />
            </td>
          </tr>
        )}
        {spaceResourceListClick && (
          <tr className={resourceListStyle.resourceList}>
            <td>
              <SpaceSelectAll />
            </td>
          </tr>
        )}
        {show && (
          <tr className={resourceListStyle.resourceList}>
            <td>
              <CarSelectAll />
              <DeviceSelectAll />
              <SpaceSelectAll />
            </td>
          </tr>
        )}
      </div>
    </div>
  );
}

export default MeetingResourceList;