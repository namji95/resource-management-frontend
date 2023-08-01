import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './css/CompanyList.module.css';
import { Container, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { Button, Modal } from 'reactstrap';
import CompanyModal from './CompanyModal';
import TestModal from './TestModal';
import Loading from '../common/Loading';

function CompanyList() {
 // develop
    const copSeq = 1;
    let data = {};

    // modal
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }
    // const saveCopSeq = () => {
        
    // }
    

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
                setCompanyObj(result.data.data.companyList)
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
                        <button type="button" className={styles.button} onClick={toggle}>추가</button>
                        {/* <button type="button" className={styles.button}>수정</button>
                        <button type="button" className={styles.button}>삭제</button> */}
                        {/* 삭제 버튼 누르면 백엔드로 상태값 false로 바꾸게 요청하기, 그리고 다시 조회해서 테이블에 안보이게하기 */}
                    </div>
                </div>
            </div>

            <div className={styles.content_body}>
                {loading ? (
                    <Loading/>
                ) : (
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th scope="col"><input type='checkbox'></input></th>
                                <th scope="col">일련번호</th>
                                <th scope="col">사업자등록번호</th>
                                <th scope="col">회사명</th>
                                <th scope="col">관리자 여부</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyObj.map((company, index) => (
                                <tr key={company.copSeq}>
                                    <th scope="row"><input type='checkbox'></input></th>
                                    <td>{company.copSeq}</td>
                                    <td>{company.copRegNum}</td>
                                    <td>{company.copName}</td>
                                    <td>{company.copState.toString()}</td>
                                    <td><button type="button" className={styles.button} onClick={toggle}>수정</button></td>
                                    <td><button type="button" className={styles.button}>삭제</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal isOpen={modal} fade={true} toggle={toggle}>
                            <ModalHeader toggle={toggle}>회사정보</ModalHeader>
                            <ModalBody>
                                {/* <CompanyModal/> */}
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onClick={toggle}>확인</Button>
                                <Button color='secondary' onClick={toggle}>닫기</Button>
                            </ModalFooter>
                        </Modal>
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