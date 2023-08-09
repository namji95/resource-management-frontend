import React, { useEffect, useState } from "react";
import axios from "axios";

// import resourceListStyle from '../css/ResourceList.module.css';
import resourceListStyle from '../facility/css/ResourceList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import FacilityInsertModal from "./FacilityInsertModal";
// import FacilityTable from "./FacilityTable";
// import Loading from "../common/Loading";
import FacilityInsertModal from "../facility/FacilityInsertModal";
import FacilityTable from "../facility/FacilityTable";
import Loading from "../common/Loading";

function MeetingResourceList(props) {

  
  const [currData, setCurrData] = useState({
    category: "car",
    dataList: []
  });

  const getList = (category) => {
    const defaultUrl = "http://localhost:8080/api/";
    const sendUrl = `${defaultUrl}${category}`;
    
    axios.get(sendUrl)
      .then((response) => {
        console.log("서버에서 가져온 데이터 >>", response.data);
        setCurrData({
          category,
          dataList: response?.data?.data?.list || []
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCurrData({
          category,
          dataList: []
        });
      });
  }

  return (
      <div className={resourceListStyle.categoeryInfomation}>
        <div className={resourceListStyle.resourceList}>
          <div>
            {currData?.dataList?.length ?
              <FacilityTable category={currData.category} dataList={currData.dataList} />
              : <span>검색 결과가 없습니다.</span>
            }
          </div>
        </div>
      </div>
  );
}

export default MeetingResourceList;