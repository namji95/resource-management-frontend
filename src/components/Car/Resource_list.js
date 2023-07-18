import React from "react";
import '../../css/Car.css';
import { Tab, Table, Tabs } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function View3() {
  
  return (
    <div>
      <div>
        <Tabs
          defaultActiveKey="facility"
          id="uncontrolled-tab-example"
          className="mb-3">
          <Tab eventKey="common" title="일반" className="common">
            일반 Tab
          </Tab>
          <Tab eventKey="calender" title="캘린더 관리">
            캘린더 관리 Tab
          </Tab>
          <Tab eventKey="facility" title="설비">
            설비 Tab
          </Tab>
          <Tab eventKey="facility_button" title="설비추가" className="facility_button"></Tab>
        </Tabs>
      </div>
        <div className="table_left">
          <input type="button" value="+ 카테고리 추가" className="category_input"></input>
          <select className="resources">
            <option>자원 추가</option>
            <option>차량</option>
            <option>모바일 기기</option>
            <option>공간 자원</option>
          </select>
        </div>
        <div className="table_right">
          <Table>          
            <thead>
              <tr>
                <th><input type="button" value="<" className="category_button"></input></th>
                <th>자원 명</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td><input type="checkbox"></input></td>
                <td>설비명</td>
                <td></td>
                <td>사용 설정</td>
                <td>예약 관리</td>
              </tr>             
            </tbody>
          </Table>
        </div>
      </div>
  );
}

    // return(

    //     <div className="mainButton">

    //         <span className="common" onClick={() => {
    //             alert('common')
    //         }}>일반</span>
    //         <span className="calender" onClick={() => {
    //             alert('calender')
    //         }}>캘린더 관리</span>
    //         <span className="resource" onClick={() => {
    //             alert('resource')
    //         }}>설비</span>
    //         <input type="button" 
    //         className="update_button"
    //         value="설비 추가" onClick={() => {
    //             alert('update_button')
    //         }}></input>

    //         <div className="list_page_left">
    //             <input type="button" 
    //             value="+ 카테고리 추가"
    //             className="input_button"></input>
    //             <hr className="under_bar"/>
    //         </div>
    //         <div className="list_page_right">
    //             <input type="button" className=""></input>

    //         </div>
    //     </div>
    // )
// }