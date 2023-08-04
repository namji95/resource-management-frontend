import React, { useState } from "react";
import "./Submit.css";

function Submit(props) {
  
  const [category,setCategory] = useState("아이패드");
  const [inputs, setInputs] = useState({
    deviceName: "",
    manager: "",
    address : "",
    company : "",
    model : ""
  })
  const handleonChange = (e) => {
    setInputs({
      ...inputs, 
      [e.target.name]: e.target.value
    })
  };

  const handleChangeCategory = (e) =>{
    setCategory(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
       <fieldset className="fieldset-container">
        회사 기기 등록 페이지
      <div className="deviceName">
        기기명 : 
        <input className= "textbox1" type="text" name="deviceName" onChange={handleonChange} placeholder="" /><br/>
        </div>

      <div className="manager">
        기기 관리자 : 
        <input className= "textbox2" type="text" name="manager" onChange={handleonChange} /><br/>
        </div>
      <div className="address">
        장소 : 
        <input className= "textbox3" type="text" name="address" onChange={handleonChange} /><br/>
      </div>
      <div className="company">
        제조회사 : 
        <input className= "textbox4" type="text" name="company" onChange={handleonChange} /><br/>
      </div>
     <div className="model">
        모델 : 
        <input className= "textbox5" type="text" name="model" onChange={handleonChange} /><br/>
      </div>
        카테고리  
        <select value={category} onChange={handleChangeCategory}>
          <option value="아이패드">아이패드</option>
          <option value="아이폰">아이폰</option>
          <option value="노트북">노트북</option> 
          <option value="카메라">카메라</option>
        </select>
      
   
      <button type="submit">등록</button>
      </fieldset>
    </form>
  );
}

export default Submit;