import React, { useState } from "react";
import resourceListStyle from './css/ResourceList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacilityModal from "./FacilityModal";
import CarSelectAll from "./CarSelectAll";
import DeviceSelectAll from "./DeviceSelectAll";
import SpaceSelectAll from "./SpaceSelectAll";

function ResourceList(props) {

  // 상태 (state) 변수들
  const [showModal, setShowModal] = useState(false);
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

      {/* 상단 카테고리 */}
      <div className={resourceListStyle.topCategory}>
        <div className={resourceListStyle.facilitySearch}>
          <form>
            <input 
            type="search" 
            placeholder="선택 자원 조회" 
            name="facilitySearch" />
            <input type="submit" value="조회"onChange={handleShow} ></input>
          </form>
        </div>
        <div className={resourceListStyle.selectFacility}>
          <input type="button" onClick={openModal} value="자원추가"></input>
            {
              showModal ?
              <FacilityModal showModal={showModal} setShowModal={setShowModal} />
              : <></>
            }
            <input type="button" value="전체 조회" onClick={handleShow} />
        </div>
      </div>

      {/* 자원 카테고리 */}
      <div className={resourceListStyle.resourceCategory}>
        <div className={resourceListStyle.categoryList}>
        <label className={resourceListStyle.category} onClick={onClickCarResource}>
          차량자원
        </label>
          <div className={resourceListStyle.carlis} />
        </div>
        <div className={resourceListStyle.categoryList}>
          <label className={resourceListStyle.category} onClick={onClickDeviceResource}>
            모바일기기 자원
          </label>
            <div className={resourceListStyle.deviceList}>
            </div>
        </div>
        <div className={resourceListStyle.categoryList}>
          <label className={resourceListStyle.category} onClick={onClickSpaceResource}>
            공간자원
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

export default ResourceList;