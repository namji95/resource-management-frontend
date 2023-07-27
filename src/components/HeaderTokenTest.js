import axios from "axios";
import React, { useEffect } from "react";

import { useSelector } from 'react-redux';

export default function HeaderTokenTest() {

    const token = useSelector((state) => state.info.token);

    const dataToSend = {

    }

    const test = () => {

        console.log(token);

        axios.post('http://localhost:9000/api/header/test', {}, // url, body, header
         {
            headers : {
                Authorization : token,
            }
        }).then(Response => {
            console.log("123")
        }).catch(Error => {
            console.log("456")
        })
    }

    return (
        <div>
            <button onClick={test}></button>
        </div>
    );
}