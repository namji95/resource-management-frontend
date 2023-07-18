import React from "react";
import './MyReservationList.css'

import ReservationList from "./ReservationList";
import WatingList from "./WaitingList";

export default function MyReservationList() {

    return (
        <React.Fragment>
                <div className="main_reservation_list">
                    <label className="my_reservation_list">나의 예약 목록</label>
                    <hr/>
                    <ReservationList />
                    <WatingList />
                </div>
        </React.Fragment>
    );
}