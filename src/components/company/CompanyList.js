import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './CompanyList.module.css';
import { Container } from "react-bootstrap";

import CompanyUpdateModal from './CompanyUpdateModal';

function CompanyList() {

    const copSeq = 1;
    let data = {};

    const [companyObj, setCompanyObj] = useState({
        copSeq: "",
        copRegNum: "",
        copName: "",
        copState: "",
    });


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/company')
            .then((result) => {
                console.log(result.data.data.companyList)
                // setCompanyObj(...result.data.data.companyList)
                setCompanyObj(result.data.data.companyList)

                data = result.data;
                setLoading(false);
            })

            .catch((error) => {
                console.log('요청실패');
                console.log(error);
                setLoading(false);
            });

    }, []);




    return (
       <>
       <div className={styles.page}>
        <Container>
            <div className={styles.content_head}>
                <div className={styles.title}>
                    <h3 ><span>회사</span></h3>
                    <div className={styles.buttonCon}>
                        <button type="button" className={styles.button}>회사 추가</button>
                        <button type="button" className={styles.button}>수정</button>
                        <button type="button" className={styles.button}>삭제</button>
                    </div>
                </div>
            </div>

            <div className={styles.content_body}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th scope="col"><input type='checkbox'></input></th>
                                <th scope="col">사업자등록번호</th>
                                <th scope="col">회사명</th>
                                <th scope="col">관리자 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyObj.map((company, index) => (
                                <tr key={index}>
                                    <th scope="row"><input type='checkbox'></input></th>
                                    <td>{company.copRegNum}</td>
                                    <td>{company.copName}</td>
                                    <td>{company.copState.toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Container>

        <div>
            <button class="btn btn-primary"
                        type="button"
                        onClick={() => {
                            axios.get(`http://localhost:8080/api/company/${copSeq}`)
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
        </div>
       </div>

       </>

    )
}

export default CompanyList;