import React, { useEffect } from 'react';
import axios from "axios";

function TestModal() {

    const copSeq = 2;
    let data = {};

    useEffect(() => {
        axios.get(`http://localhost:8080/api/company/${copSeq}`)
        .then((result) => {
            data = result.data;
            console.log(data)
        })
        .catch((error) => {
            console.log('요청실패');
            console.log(error);
        });

    }, []);

    
    
    return (
        <>
        모달 컴포넌트 테스트
        {data[0]}
        
        </>
    )
}

export default TestModal;