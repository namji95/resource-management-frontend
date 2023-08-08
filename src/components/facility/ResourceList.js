import React, { useEffect, useState } from "react";
import axios from "axios";

import resourceListStyle from './css/ResourceList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FacilityInsertModal from "./FacilityInsertModal";
import FacilityTable from "./FacilityTable";
import Loading from "../common/Loading";


function ResourceList(props) {

  // 상태 (state) 변수들
  // const [show, setShow] = useState(false);

// ==============================================
// [검색 select, input 핸들링]

  const defaultSearchObj = {
    columnName : "carName",
    searchString : "",
  }

  const [searchObj, setSearchObj] = useState(defaultSearchObj);

  const onResetSearchObj = () => {
    setSearchObj(defaultSearchObj);
  }
  
  const onChangeSearchObj = (e) => {
    let newName = e.target.name;
    console.log("e.target.name : ", e.target.name);
    let newValue = e.target.value;
    console.log("e.target.value : ", e.target.value);
    const newSearchObj = {
      ...searchObj,
      [newName] : newValue
    }
    setSearchObj(newSearchObj);
    console.log("newName : ",e.target.name);
    console.log("newValue :",e.target.value);
    console.log(newSearchObj);
    console.log(searchObj);
    console.log("columnName : ", searchObj.columnName);
  }

// ==============================================
// [서버에서 가져온 데이터]

  const defaultCurrData = {
    category : "car",
    dataList: []
  }

  const [currData,setCurrData] = useState(defaultCurrData);

// ==============================================
// [axios get 요청]

  const getList = (e=null, category="car", searchType="get") => {
    if(e)
      e.preventDefault();

    const defaultUrl = "http://localhost:8080/api/";
    
    let sendUrl = "";
    let result;

    if(searchType === "get" || !searchObj.searchString) {
      sendUrl = `${defaultUrl}${category}`
    }else{
      sendUrl = `${defaultUrl}${currData.category}/search?columnName=${searchObj.columnName}&searchString=${searchObj.searchString}`
    }
    console.log("sendUrl : ",sendUrl);
    axios
    .get(sendUrl)
    .then((response) => {
      console.log("서버에서 가져온 데이터 >>",response.data);
      result = response?.data?.data?.list;
      console.log("result : ", result);
    })
    .catch((error) => {
      result = [error];
    })
    .then(()=>{
      const newCurrData = {
        category,
        dataList : result
      }
      console.log("newCurrData : ",newCurrData);
      setCurrData(newCurrData);
      setIsLoadFromServer(true);
      let defaultSelectValue = "carName";
      switch(category){
        case "car" :
          defaultSelectValue = "carName";
          break;
        case "space" :
          defaultSelectValue = "spcName";
          break;
        case "device" :
          defaultSelectValue = "dvcName";
          break;
      }
      const newSearchObj = {
        ...searchObj,
        "columnName" : defaultSelectValue
      }
      console.log(">>",newSearchObj );
      setSearchObj(newSearchObj);
    });
  }

// ==============================================

  // [insert modal]

  const [showInsertModal, setShowInsertModal] = useState(false);

  const openInsertModal = () => {
    setShowInsertModal(showInsertModal => !showInsertModal);
  };

  const renderInsertModal = () => { 
    if(showInsertModal)
      return (
        <FacilityInsertModal showInsertModal={showInsertModal} setShowInsertModal={setShowInsertModal} getList={getList} />
      )
  }
  
// ==============================================

  const renderColumnNameSelect = () => {

      let currOptions;
  
      switch(currData.category){
        case "car" :
          currOptions = (
            <>
              <option name="columnName" value="carName">차량명</option>
              <option name="columnName" value="carNumber">차량번호</option>
            </>
          );
          break;
        case "device" :
          currOptions = (
            <>
            <option name="columnName" value="dvcName">기기명</option>
            <option name="columnName" value="dvcSerial">기기번호</option>
            </>
          );
          break;
        case "space" :
          currOptions = (
          <>
            <option name="columnName" value="spcName">공간명</option>
            <option name="columnName" value="spcCap">수용인원</option>
          </>
          );
          break;
        default :
          currOptions = (
            <>
              <option name="columnName" value="carName">차량명</option>
              <option name="columnName" value="carNumber">차량번호</option>
            </>
          );
          break;
      }
      return (
        <select className={resourceListStyle.selectBox}
        name="columnName"
        onChange={onChangeSearchObj}
        >
          {currOptions}
        </select>
      )
  }

// ==============================================
// [최초 데이터 가져오기]

const [isLoadFromServer, setIsLoadFromServer] = useState(false);

useEffect(()=>{
    getList(null,"car");
},[])

// ==============================================

  return (
    <div className={resourceListStyle.resourceTable}>
      {renderInsertModal()}
      {/* 상단 카테고리 */}
      <div className={resourceListStyle.topCategory}>
        <div className={resourceListStyle.facilitySearchBox}>
          <form>
            {renderColumnNameSelect()}
            <input 
              type="search"
              placeholder="검색어를 입력하세요." 
              className={resourceListStyle.facilitySearch}
              name="searchString"
              onChange={onChangeSearchObj} />
            <input type="submit" className={resourceListStyle.searchBtn} value="검색" onClick={(e)=>getList(e,currData.category,"search")} />
          </form>
        </div>
        <div className={resourceListStyle.selectFacility}>
          <input type="button" className={resourceListStyle.addBtn}  onClick={openInsertModal} value="자원 추가" />
        </div>
      </div>
      {/* 자원 카테고리 */}
      <div className={resourceListStyle.resourceCategory}>
        <div className={resourceListStyle.categoryList}>
          <label className={currData.category === "car" ? resourceListStyle.categoryClicked : resourceListStyle.category} onClick={(e)=>getList(e,"car")}>
            차량자원
          </label>
          <div className={resourceListStyle.carlis} />
        </div>
        <div className={resourceListStyle.categoryList}>
          <label className={currData.category === "device" ? resourceListStyle.categoryClicked : resourceListStyle.category} onClick={(e)=>getList(e,"device")}>
            모바일기기 자원
          </label>
            <div className={resourceListStyle.deviceList} />
        </div>
        <div className={resourceListStyle.categoryList}>
          <label className={currData.category === "space" ? resourceListStyle.categoryClicked : resourceListStyle.category} onClick={(e)=>getList(e,"space")}>
            공간자원
          </label>
          <div className={resourceListStyle.SpaceList} />
        </div>
      </div>
      {/* 자원 정보 */}
      {
        isLoadFromServer ?
          (
            <div className={resourceListStyle.categoeryInfomation}>
            <div className={resourceListStyle.resourceList}>
              <div>
                {
                  currData?.dataList?.length ?
                    <FacilityTable category={currData.category} dataList={currData.dataList}/>
                  :
                  <span>검색 결과가 없습니다.</span>
                }
              </div>
            </div>
          </div>
          ) : <Loading/>
      }
    </div>
  );
}

export default ResourceList;