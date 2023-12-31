import { useState,useEffect } from "react";
import {Table} from "react-bootstrap";
import FacilityTableStyle from "./css/FacilityTable.module.css";
import CarModifyModal from "./CarModifyModal";
import SpaceModifyModal from "./SpaceModifyModal";
import DeviceModifyModal from "./DeviceModifyModal";

function FacilityTable({category="car", dataList=[], refresh}) {

  const [currDataList, setCurrDataList] = useState([]);

  useEffect(()=>{
    setCurrDataList(dataList);
  },[dataList]);

  const [updateModal, setUpdateModal] = useState(false);

  const openModal = () => {
    setUpdateModal(updateModal => !updateModal);
  }

  const [modifiedObj, setModifiedObj] = useState(null);
  const [deletedObj, setDeletedObj] = useState(null);

 useEffect(()=>{
    if(modifiedObj){
      console.log("수정객체 >", modifiedObj)
      const changedSeq = modifiedObj?.carSeq;
      if(changedSeq && currDataList?.length){
        const newDataList = [];
        currDataList.map((item, idx)=>{
          if(item.carSeq === changedSeq){
            newDataList.push(modifiedObj)
          }else {
            newDataList.push(item)
          }
        })
        console.log("새배열",newDataList)
        setCurrDataList(newDataList);
      }
    }
 },[modifiedObj])

 useEffect(()=>{
  refresh();
},[deletedObj])

  const [selectedItem, setSelectedItem] = useState(null);

  const openModifyModal = (item) => {
    setSelectedItem(item);
    setUpdateModal(true); // 모달창 열기
  }

  const closeModifyModal = () => {
    setUpdateModal(false);
  }

// ==================================================================

// [테이블 렌더러]

const [tableRenderInfo,setTableRenderInfo] = useState({
  car: {
    carName : "차량명",
    carNumber :"차량 번호",
    carDistance :"주행거리",
    carYear : "차량 연식",
    carImage : "차량 이미지",
    carExplain : "차량 설명"
  },
  device : {
    dvcName : "전자기기명",
    dvcSerial :"전자기기 시리얼번호",
    dvcImage : "전자기기 이미지",
    dvcBuy :"전자기기 구입년도",
    dvcExplain : "전자기기 설명"
  },
  space : {
    spcName : "공간자원명",
    spcCap : "공간자원 수용인원",
    spcImage : "공간자원 이미지",
    spcExplain :"공간자원 설명"
  }
})


const renderTableHeader = () => {
  const tableHeaderRow = [];

  for( const key in tableRenderInfo[category]){
      tableHeaderRow.push(
        <th className={FacilityTableStyle[key]}>
          {tableRenderInfo[category][key]}
        </th>);
  }

  return(
    <tr>
      {tableHeaderRow}
    </tr>
  )
}

const renderTableData = (item) => {
  const tabledata = [];

  for( const key in item){

    if(tableRenderInfo[category][key]){
      // if(key == "spcImage" || key == "carImage" || key == "dvcImage")
      if(key.includes("Image")){
        tabledata.push(
          <td className={FacilityTableStyle[key]}>
            <img src={item[key]} className={FacilityTableStyle.imgBox}/>
          </td>
        );
      }else{
        tabledata.push(
          <td className={FacilityTableStyle[key]}>
            {item[key]}
          </td>);
      }

    }

  }

  return (
    <>
    {tabledata}
    </>
  )
}

const renderTableRow = () => {

  const tableRow = [];

  currDataList.map((item, index) => {
    if(!item) return;
    tableRow.push(
      <tr key={index} className={FacilityTableStyle.information} onClick={() => openModifyModal(item)}>
        {renderTableData(item)}
      </tr>
    )
  })

  return (
    <>
    {tableRow}
    </>
  )
}

// ==================================================================

const renderModifyModal = () => {

  let modifyModal = "";
  
  switch(category){
    case "device" :
      modifyModal =
      <DeviceModifyModal
          // 모달창 열림 상태일 때 CarModifyModal 컴포넌트 렌더링
            updateModal={updateModal}
            setUpdateModal={setUpdateModal}
            selectDevice={selectedItem}
            closeModifyModal={closeModifyModal}

            setModifiedObj={setModifiedObj}
            setDeletedObj={setDeletedObj}
          //setSelectCar 함수를 CarModifyModal 컴포넌트로 전달
          // 선택한 자원 정보를 CarModifyModal 컴포넌트로 전달
          />
      break;
    case "space" :
      modifyModal =
      <SpaceModifyModal
          // 모달창 열림 상태일 때 CarModifyModal 컴포넌트 렌더링
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          selectSpace={selectedItem}
          closeModifyModal={closeModifyModal}
          //setSelectCar 함수를 CarModifyModal 컴포넌트로 전달
          // 선택한 자원 정보를 CarModifyModal 컴포넌트로 전달
          />
      break;
    default :
      modifyModal =
          <CarModifyModal
              // 모달창 열림 상태일 때 CarModifyModal 컴포넌트 렌더링
              updateModal={updateModal}
              setUpdateModal={setUpdateModal}
              selectCar={selectedItem}
              closeModifyModal={closeModifyModal}

              setModifiedObj={setModifiedObj}
              setDeletedObj={setDeletedObj}
              //setSelectCar 함수를 CarModifyModal 컴포넌트로 전달
              // 선택한 자원 정보를 CarModifyModal 컴포넌트로 전달
              />
  }

  return modifyModal;
}


// ==================================================================

  return (
    <div>
      {updateModal && renderModifyModal()}
      <Table className={FacilityTableStyle.resourceTable}>
          <thead className={FacilityTableStyle.resourceTableHeader}>
            {renderTableHeader()}
          </thead>
          <tbody className={FacilityTableStyle.resourceTableBody}>
            {renderTableRow()}
          </tbody>
      </Table>
    </div>
  );
}

export default FacilityTable;