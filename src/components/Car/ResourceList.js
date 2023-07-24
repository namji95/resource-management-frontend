import React, { useState } from "react";
import resourceListStyle from "../car/ResourceList.module.css";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FacilitySaveModal from '../car/FacilitySaveModal';

function ResourceList(props) {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(showModal => !showModal);
  };
  
  return (
    <div className={resourceListStyle.resourceTable}>
      <div className={resourceListStyle.topCategory}>
        <input type="button" className={resourceListStyle.manage} value="일반"></input>
        <input type="button" className={resourceListStyle.manage} value="캘린더 관리"></input>
        <input type="button" className={resourceListStyle.manage} value="설비"></input>
        <input type="button" onClick={openModal} className={resourceListStyle.facility_input} value="설비추가"></input>
        {
          showModal ?
          <FacilitySaveModal showModal={showModal} setShowModal={setShowModal} />
          : <></>
        }
      </div>
        <hr className={resourceListStyle.firstLine} />
      <div className={resourceListStyle.resourceCategory}>
        <span>
        <select className={resourceListStyle.category}>
          <option>공간자원</option>
        </select>
        <select className={resourceListStyle.category}>
          <option>차량</option>
        </select>
        <select className={resourceListStyle.category}>
          <option>모바일기기</option>
        </select>
        </span>
      </div>
      <div className={resourceListStyle.categoeryInfomation}>
        <div className={resourceListStyle.categoryName}>
          <span>
            선택 자원
          </span>
        </div>
        <div className={resourceListStyle.table}>
          <Table>
            <thead>
              <tr>
              <input type="checkbox" className={resourceListStyle.resourceListCheck}></input>
              <th className={resourceListStyle.facilityName}>설비명</th>
              <th>사용 설정</th>
              <th>예약 관리</th>
              </tr>
            </thead>
            <tbody>
              <tr className={resourceListStyle.resourceList}>
                <td>
                  asd
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