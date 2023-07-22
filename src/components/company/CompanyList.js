import React, { useState } from 'react';
import axios from 'axios';

function CompanyList() {
    const copSeq = 1;
  let data = {};

    
    
    return(
        <>
        <button 
          class="btn btn-primary" 
          type="button"
          onClick={() => {
            axios.get(`http://localhost:9000/api/company/${copSeq}`)
            .then((result) => {
                data = result.data;
                console.log(data)
                alert("조회 완료")
            })
            .catch((error) => {
                console.log('요청실패');
                console.log(error);
            })
        }}>단일조회</button>

<button 
          class="btn btn-primary" 
          type="button"
          onClick={() => {
            axios.get('http://localhost:9000/api/company')
            .then((result) => {
                data = result.data;
                console.log(data)
                alert("조회 완료")
            })
            .catch((error) => {
                console.log('요청실패');
                console.log(error);
            })
        }}>전체조회</button>

        
        </>

    )
}

export default CompanyList;