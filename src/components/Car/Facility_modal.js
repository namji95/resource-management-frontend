import React from 'react'
import '../../css/Car.css';

export default function View2() {
    return (
        <div className="update_page">
            <header>
                    차량 추가
            </header>
            <div className="essential">
                ● 필수 항목
            </div>
            <div className="categorys">
                카테고리
            <select className="category">
                <option>차량</option>
                <option>모바일 기기</option>
                <option>회의실</option>
                <option>교육장</option>
            </select><br/>
            </div>
            <div className="carNames">
                ● 차량명
                <input className="carName" placeholder="차량명"></input>
            </div>
            <div className="carBoardings">
                탑승 인원
                <input className="carBoarding" placeholder="인원"></input>
                명
            </div>
            <div className="explanations">
                설명
                <input 
                type="text" 
                className="explanation" 
                placeholder="차량 추가에 대한 설명"></input>
            </div>
            <hr className="firstLine"/>
            <div className="companys">
                사용 회사
                <input 
                type="button" 
                value="회사 선택" 
                className="company"></input>
            </div>
            <hr className="secondLine"/>
            <div className="sNcBtn">
                <input 
                type="button" 
                value="취소"
                className="cancel"></input>
                <input 
                type="button" 
                value="저장"
                className="save"></input>
            </div>
        </div>
    )
}