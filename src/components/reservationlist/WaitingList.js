import React from "react";
import './WatingList.css'

export default function WatingList() {

    return (
        <React.Fragment>
            <div className="wating_list_container">
                <label className="wating_list">대기 목록</label>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">분류</th>
                        <th scope="col">자원명</th>
                        <th scope="col">예약시간</th>
                        <th scope="col">상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">차량</th>
                            <td>차량</td>
                            <td>2023-07-10 14:00 ~ 2023-07-10 17:00</td>
                            <td>
                                <label>이걸 어떻게 클릭을 다르게 나타내지..?</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}