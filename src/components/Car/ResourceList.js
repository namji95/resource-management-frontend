import React from "react";
import '../../css/Car.css';
import { Tab, Table, Tabs } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Resource_list(props) {
  
  return (
    <div>
      <form>
        <div className="top_category">
          <input type="button" className="manage" value="일반"></input>
          <input type="button" className="manage" value="캘린더 관리"></input>
          <input type="button" className="manage" value="설비"></input>
          <input type="button" className="facility_input" value="설비 추가"></input>
        </div>
        <div>
          <hr className="firstLine" />      
        </div>
        </form>
      </div>
  );
}

export default Resource_list;