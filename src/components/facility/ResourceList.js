import React, { useState } from "react";
import resourceListStyle from "../facility/ResourceList.module.css";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FacilitySaveModal from '../facility/FacilitySaveModal';
import FacilityModal from "../facility/FacilityModal";
import { Height } from "@mui/icons-material";

function ResourceList(props) {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(showModal => !showModal);
  };
  
  const [carResourceListClick, setCarResourceListwClick] = useState(false);

  const onClickCarResource = () => {
    setCarResourceListwClick(!carResourceListClick);
  }

  return (
    <div className={resourceListStyle.resourceTable}>
      <div className={resourceListStyle.topCategory}>
        <input type="button" className={resourceListStyle.manage} value="일반"></input>
        <input type="button" className={resourceListStyle.manage} value="캘린더 관리"></input>
        <input type="button" className={resourceListStyle.manage} value="설비"></input>
        <input type="button" onClick={openModal} className={resourceListStyle.facility_input} value="설비추가"></input>
        {
          showModal ?
          // <FacilitySaveModal showModal={showModal} setShowModal={setShowModal} />
          <FacilityModal showModal={showModal} setShowModal={setShowModal} />
          : <></>
        }
      </div>
        <hr className={resourceListStyle.firstLine} />
      <div className={resourceListStyle.resourceCategory}>
        <div>
          <label className={resourceListStyle.category}>
            공간자원
            <input type="button" className={resourceListStyle.categoryButton}></input>
            </label>
        </div>
        <div>
          <label className={resourceListStyle.category} onClick={onClickCarResource}>
            차량자원
            {/* <input type="button"className={resourceListStyle.categoryButton}></input> */}
            </label>
            <div className={resourceListStyle.carlist} style={{height:carResourceListClick ? "500px" : "0px"}}></div>
        </div>
        <div>
          <label className={resourceListStyle.category}>
            모바일기기 자원
            <input type="button"className={resourceListStyle.categoryButton}></input>
            </label>
        </div>
      </div>
      <div className={resourceListStyle.categoeryInfomation}>
        <div className={resourceListStyle.categoryName}>
          <span>
            선택 자원
          </span>
        </div>
        <div>
          <Table>
            <thead className={resourceListStyle.tableHead}>
              <tr>
              <input type="checkbox" className={resourceListStyle.resourceListCheck}></input>
              <th className={resourceListStyle.facilityName}>설비명</th>
              <th className={resourceListStyle.faciitySetting}>사용 설정</th>
              <th className={resourceListStyle.facilityReservation}>예약 관리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={resourceListStyle.resourceList}>
                  
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ResourceList;