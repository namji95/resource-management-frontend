import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";

import styles from './Company.module.css';
import Tr from './Tr';
import CompanyAdd from './CompanyAdd';
import CompanyModal from './CompanyModal';


const Company = () => {
    const [info, setInfo] = useState([]);
    const [selected, setSelected] = useState("");
    const [modalOn, setModalOn] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const toggle = () => {
        setAddModal(!addModal);
    }

    // ?? 고유값으로 사용될 값 ref를 사용하여 변수담기 ㅎㅎ fake.. id..
    const nextCopSeq = useRef(15);

    useEffect(() => {
        axios.get('http://localhost:8080/api/company')
            .then((result) => {
                console.log(result.data.data.companyList)
                setInfo(result.data.data.companyList)
                console.log("info찍어보기")
                console.log(info)
            })

            .catch((error) => {
                console.log('요청실패');
                console.log(error);
            });

    }, []);

    // 테이블에서 데이터 저장(추가/수정)
    // 저장된 데이터에 seq가 있는 경우 수정 없는 경우 추가
    const handleSave = (data) => {
        if(data.copSeq) {
            // 데이터 수정 
            setInfo(
                info.map(row => data.copSeq === row.copSeq ? {
                    copSeq: data.copSeq,
                    copRegNum: data.copRegNum,
                    copName: data.copName,
                    copState: data.copState,
                } : row)
            )
        } else {
            // 데이터 추가

            // 방법1. concat()메서드: 매개변수로 전달된 모든 문자열을 호출 문자열에 붙인 새로운 문자열 반환
            // setInfo(info => info.concat(
            //     {
            //         copSeq: data.copSeq,
            //         copRegNum: data.copRegNum,
            //         copName: data.copName,
            //         copState: data.copState,
            //     }
            // ))
            // nextCopSeq.current += 1;

            // 방법2
            // spread 연산자
            setInfo((prev) => {
                return [...prev, {
                    copSeq: nextCopSeq.current,
                    copRegNum: data.copRegNum,
                    copName: data.copName,
                    copState: data.copState,
                }]
            });
            nextCopSeq.current += 1;
        }
    }

    // 테이블에서 데이터 삭제
    // Td.js에서 회사 일련번호를 받아옴
    // array.filter를 이용해서 전달받은 회사 일련번호와 같은 경우 테이블에서 제거
    const handleRemove = (copSeq) => {
        setInfo(info => info.filter(item => item.copSeq !== copSeq));
    }

    // 데이터 편집
    // 수정 버튼 클릭 시 
    // 1. 모달 on(true)
    // 2. 클릭한 데이터 selectedData에 담기
    const handleEdit = (item) => {
        setModalOn(true);
        const selectedData = {
            copSeq: item.copSeq,
            copRegNum: item.copRegNum,
            copName: item.copName,
            copState: item.copState,
        }

        console.log(selectedData);
        setSelected(selectedData);
    }

    // 취소 버튼 클릭 시 모달 on(false)
    const handleCancel = () => {
        setModalOn(false);
        setAddModal(false);
    }

    // 데이터 작성 후 제출(저장)
    // handleSave로 보내고 handleSave는 copSeq값으로 구분하여 수정/추가 
    // 모달 on(false)
    const handleEditSubmit = (item) => {
        console.log(item);
        handleSave(item);
        setModalOn(false);
    }

    return (
        <>
        <div>
            <Container>
             <div className={styles.head}>
                 {/* <div className={styles.title}> */}
                     <h3 ><span>회사 관리</span></h3>
                     <button type="button" className={styles.headBtn} onClick={toggle}>추가</button>
                 {/* </div> */}
             </div>
 
             <div className={styles.content_body}>
             <table class="table table-hover">
                         <thead class="table-light">
                             <tr>
                                 <th scope="col"><input type='checkbox'></input></th>
                                 <th scope="col">일련번호</th>
                                 <th scope="col">사업자등록번호</th>
                                 <th scope="col">회사명</th>
                                 {/* <th scope="col">회사 상태</th> */}
                                 <th scope="col">수정</th>
                                 <th scope="col">삭제</th>
                             </tr>
                         </thead>
                         <Tr info={info} handleRemove={handleRemove} handleEdit={handleEdit}></Tr>
                     </table> 
                     {
                        addModal && <CompanyAdd toggle={toggle} onSaveData={handleSave} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit}/>
                     }
                        
                     {
                        modalOn && <CompanyModal selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit}/>
                     }   
             </div>
            </Container>
        </div>
        </>     
    );
}

export default Company;




