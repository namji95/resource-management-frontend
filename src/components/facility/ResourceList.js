import React, { useState } from "react";
import resourceListStyle from './css/ResourceList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacilityModal from "./FacilityModal";
import CarSelectAll from "./CarSelectAll";
import DeviceSelectAll from "./DeviceSelectAll";
import SpaceSelectAll from "./SpaceSelectAll";
import axios from "axios";

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
  const [facilitySelectType, setFacilitySelectType] = useState ("car");
  // facilitySelectType : select에서 선택된 것의 상태 관리
  const [facilityType, setFacilityType] = useState("queryType");
  // facilityType : select에서 선택된 것의 상태 관리
  // const [queryType, setQueryType] = useState("");
  // 하위 select option의 queryType 상태 관리 하위 select에서 선택한 값 저장
  const [searchString, setSearchString] = useState("");

  const openModal = () => {
    setShowModal(showModal => !showModal);
  };
  // 모달 창 열기 / 닫기 함수
  const onClickCarResource = () => {
    setCarResourceListwClick(!carResourceListClick);
  }
  const onClickDeviceResource = () => {
    setDeviceResourceListClick(!deviceResourceListClick);
  }
  const onClickSpaceResource = () => {
    setspaceResourceListClick(!spaceResourceListClick);
  }
  // 자원 리스트 클릭 시 보이게 / 숨기게 하는 함수
  const handleShow = () => {
    setShow(!show);
  };
  // 보이기 함수
  // 상태관리 함수 정의 후 각 함수의 열기/닫기 보이기/숨기기 함수 정의

  const handleFacilitySelectType = (e) => {
    setFacilitySelectType(e.target.value);
    console.log(setFacilitySelectType);
  }
  const handleFacilityType = (event) => {
    setFacilityType(event.target.value);
    console.log(setFacilityType);
  }
  // select 태그의 상태 값 변하게 하는 함수
  const handleSearchString = (event) => {
    setSearchString(event.target.value);
    console.log(searchString);
  }

  const onSearch = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/api/${facilitySelectType}/search?${facilityType}=${searchString}`)
    .then(response => {
        console.log(response.data);
        alert("조회 완료");
    })
    .catch(error => {
        alert("조회 실패",error)
    });
  }

  return (
    <div className={resourceListStyle.resourceTable}>

      {/* 상단 카테고리 */}
      <div className={resourceListStyle.topCategory}>
        <div className={resourceListStyle.facilitySearch}>
          <form>
          {/* <form action={onSearch()}> */}
          <select  
            className={resourceListStyle.selectBox} 
            onChange={handleFacilitySelectType}>
              <option value="car" selected>차량</option>
              <option value="device">모바일 기기</option>
              <option value="space">공간</option>
          </select>
            {facilitySelectType === "car" && (
              <select className={resourceListStyle.selectBox}
              onChange={handleFacilityType}
              name="queryType"
              >
                <option value="ex" selected>선택</option>
                <option name="queryType" value="carName">차량명</option>
                <option name="queryType" value="carNumber">차량번호</option>
              </select>
            )}
            {facilitySelectType === "device" && (
              <select className={resourceListStyle.selectBox}
              onChange={handleFacilityType}
              name="queryType"
              >
                <option value="ex" selected>선택</option>
                <option name="queryType" value="dvcName">기기명</option>
                <option name="queryType" value="dvcSerial">기기번호</option>
              </select>
            )}
            {facilitySelectType === "space" && (
              <select className={resourceListStyle.selectBox}
              onChange={handleFacilityType}
              name="queryType"
              >
                <option value="ex" selected>선택</option>
                <option name="queryType" value="spcName">공간명</option>
              </select>
            )}
            {/* {selectType === "all" && (
              <select className={resourceListStyle.selectBox}>
                <option>전체검색</option>
              </select>
            )} */}
            {/* {selectType === "ex" && show === true (
              alert("검색하고 싶은 자원을 선택 후 조회를 눌러주세요.")
            )} */}
            <input 
            type="search"
            placeholder="선택 자원 조회" 
            className="searchString"
            onChange={handleSearchString} />
            {/* <input type="submit" value="조회"></input> */}
            <input type="submit" value="조회" onClick={onSearch} ></input>
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