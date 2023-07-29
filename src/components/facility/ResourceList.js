import React, { useState } from "react";
import resourceListStyle from './ResourceList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacilityModal from "./FacilityModal";
import { Height } from "@mui/icons-material";
import CarSelectAll from "./CarSelectAll";

function ResourceList(props) {

  const [showModal, setShowModal] = useState(false);
  const [showText, setShowText] = useState(false);
  const openModal = () => {
    setShowModal(showModal => !showModal);
  };
  
  const [carResourceListClick, setCarResourceListwClick] = useState(false);

  const onClickCarResource = () => {
    setCarResourceListwClick(!carResourceListClick);
  }

  const handleShowText = () => {
    setShowText(true);
  };

  return (
    <div className={resourceListStyle.resourceTable}>
      <div className={resourceListStyle.topCategory}>
        <div className={resourceListStyle.facilitySearch}>
          <form action={handleShowText}>
            <input type="search" placeholder="선택 자원 조회" name="facilitySearch"></input>
            <input type="submit"></input>
            {/* {
              showModal ? 
              <></>
            } */}
          </form>
        </div>
        <div className={resourceListStyle.selectFacility}>
          <input type="button" onClick={openModal} value="자원추가"></input>
          <input type="button" value="자원 전체 조회" onClick={handleShowText}></input>
            {
              showModal ?
              <FacilityModal showModal={showModal} setShowModal={setShowModal} />
              : <></>
            }
        </div>
      </div>

      <div className={resourceListStyle.resourceCategory}>
        <div>
          <label className={resourceListStyle.category}>
            공간자원
            </label>
        </div>
        <div>
          <label className={resourceListStyle.category} onClick={onClickCarResource}>
            차량자원
            </label>
            <div className={resourceListStyle.carlist} style={{height:carResourceListClick ? "500px" : "0px"}}></div>
        </div>
        <div>
          <label className={resourceListStyle.category}>
            모바일기기 자원
            </label>
        </div>
      </div>
      <div className={resourceListStyle.categoeryInfomation}>
             {showText && (
                <tr className={resourceListStyle.resourceList}>
                  <td>
                    <CarSelectAll key = {showModal}></CarSelectAll>
                    
                  </td> 
                </tr>
              )}
      </div>
    </div>
  );
}

export default ResourceList;