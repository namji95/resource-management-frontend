import React, { useEffect, useState } from "react";
import axios from "axios";

import resourceListStyle from './css/ResourceList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FacilityInsertModal from "./FacilityInsertModal";
import FacilityTable from "./FacilityTable";
import Loading from "../common/Loading";


function ResourceList(props) {

// ======================================
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

    if(searchType ==="get" || !searchObj.searchString ){
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
    })
    .catch((error) => {
      result = [error];
    })
    .then(()=>{
      const newCurrData = {
        category,
        dataList : result
      }
      setCurrData(newCurrData);
      setIsLoadFromServer(true);
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

// [검색 select, input 핸들링]

    const defaultSearchObj = {
        columnName : "carName",
        searchString : "",
    }

  const [searchObj, setSearchObj] = useState(defaultSearchObj);

  const onResetSearchObj = () => {
    setSearchObj(defaultSearchObj);
  }
  
  // 카태고리탭 바뀔 떄 마다 현재 선택된 값 변경 처리
  useEffect(()=>{
    if(currData?.category){
        let defaultValue = "carName";

        switch(currData.category){
            case "device" :
                defaultValue = "dvcName";
            break;
            case "space" :
                defaultValue = "spcName";
            break;
            default :
                defaultValue = "carName";
        }
    
        const newSearchObj = {
            ...searchObj,
            columnName : defaultValue
        }
        setSearchObj(newSearchObj)
    }
  },[currData.category]);

  const onChangeSearchObj = (e) => {
    let newName = e.target.name;
    let newValue = e.target.value;
    const newSearchObj = {
      ...searchObj,
      [newName] : newValue
    }
    setSearchObj(newSearchObj);
    console.log("newName > ", e.target.name);
    console.log("newValue > ", e.target.value);
    console.log("searchObj > ", searchObj);
  }

  const [optionObj, setOptionObj] = useState({
    car : {
        carName : "차량명",
        carNumber : "차량번호"
    },
    device : {
        dvcName : "기기명",
        dvcSerial : "기기번호"
    },
    space : {
        spcName : "공간명",
        spcCap : "수용인원"
    }
  })

  const renderColumnNameSelect = () => {

      const currOptions = [];

      for (const key in optionObj[currData.category]){
        const value = optionObj[currData.category][key];
        currOptions.push(<option name="columnName" value={key}>{value}</option>);
      }

      return (
        <select className={resourceListStyle.selectBox}
        onChange={(e)=>{onChangeSearchObj(e)}}
        name="columnName"
        value={searchObj.columnName}
        >
          {currOptions.map((item)=>{
            return item;
          })}
        </select>
      )
  }



// ==============================================
// [최초 데이터 가져오기]

const [isLoadFromServer, setIsLoadFromServer] = useState(false);

useEffect(()=>{
    getList();
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
                    <FacilityTable category={currData.category} dataList={currData.dataList} refresh={getList}/>
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