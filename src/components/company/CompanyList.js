import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './CompanyList.module.css';
import { Container } from "react-bootstrap";


function CompanyList() {
    const copSeq = 1;
    let data = {};
    let output;



  let [cop, setCop] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:9000/api/company')
//     .then((result) => {
//         console.log(result.data);
//         data = result.data;
//         output = JSON.stringify(data)
//     })

//     .catch((error) => {
//         console.log('요청실패');
//         console.log(error);
//     });

//   },[]);
  

    
    
    return(
      
        <>

<Container>
            <div className={styles.page}>
                <div>
                    <div className={styles.content_head}>
                        <div className={styles.title}>
                            <h3 >
                                <span>회사</span>
                            </h3>
                            <div className={styles.buttonCon}>
                              <button type="button" className={styles.button}>회사 추가</button>
                              <button type="button" className={styles.button}>수정</button>
                              <button type="button" className={styles.button}>삭제</button>
                            </div>
                           
                            {/* <div style={{height: 20}}>
                                
                            </div> */}
                        </div>
                    </div>

                <div className={styles.content_body}>
                    <table class="table table-hover">
                    <thead class="table-light">
                        <tr>
                        <th scope="col"><input type='checkbox'></input></th>
                        <th scope="col">사업자등록번호</th>
                        <th scope="col">회사명</th>
                        <th scope="col">관리자 아이디</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row"><input type='checkbox'></input></th>
                        <td>123-456-789</td>
                        <td>더존</td>
                        <td>douzone</td>
                        </tr>
                        <tr>
                        <th scope="row"><input type='checkbox'></input></th>
                        <td>456-234-234</td>
                        <td>위하고</td>
                        <td>wehago</td>
                        </tr>
                        <tr>
                        <th scope="row"><input type='checkbox'></input></th>
                        {/* <td colspan="2">Larry the Bird</td> */}
                        <td>234-234-235</td>
                        <td>아이티뱅크</td>
                        <td>itbank</td>
                        </tr>
                    </tbody>
                    </table>

                            </div>
                        </div>
            </div>
        
        </Container>

        <div className={styles.page}>
          <div>
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
          </div>
        

        </div>
        
        </>

    )
}

export default CompanyList;