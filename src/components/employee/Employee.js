import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { Container } from "react-bootstrap";
import styles from './css/Employee.module.css';

import Tr from './Tr';

import EmployeeAdd from './EmployeeAdd';
import EmployeeUpdate from './EmployeeUpdate';

import Loading from '../common/Loading';


const Employee = () => {
    const [info, setInfo] = useState([]);
    const [selected, setSelected] = useState("");

    const [loading, setLoading] = useState(true);

    const [updateModal, setUpdateModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    
    const toggle = () => {
        setAddModal(!addModal);
    }

    // ?? 고유값으로 사용될 값 ref를 사용하여 변수담기 ㅎㅎ fake.. id..
    const nextEmpSeq = useRef(9);

    useEffect(() => {
        axios.get('http://localhost:8080/api/employee')
            .then((result) => {
                console.log(result.data.data.employeeList)
                setInfo(result.data.data.employeeList)
                console.log("info찍어보기")
                console.log(info)
                setLoading(false);
            })

            .catch((error) => {
                console.log('요청실패');
                console.log(error);
                setLoading(false);
            });

    }, []);

    // 테이블에서 데이터 저장(추가/수정)
    // 저장된 데이터에 seq가 있는 경우 수정 없는 경우 추가
    const handleSave = (data) => {
        if(data.empSeq) {
            // 데이터 수정 
            setInfo(
                info.map(row => data.empSeq === row.empSeq ? {
                    empSeq: data.empSeq,
                    empName: data.empName,
                    empPosition: data.empPosition,
                    copSeq: data.copSeq,
                    userSeq: data.userSeq,
                    authLevel: data.authLevel,
                    empState: data.empState,
                } : row)
            )
        } else {
            // 데이터 추가
            // spread 연산자
            setInfo((prev) => {
                return [...prev, {
                    empSeq: nextEmpSeq.current,
                    empName: data.copRegNum,
                    empPosition: data.empPosition,
                    copSeq: data.copSeq,
                    userSeq: data.userSeq,
                    empState: data.empState,
                    authLevel: data.authLevel,
                }]
            });
            nextEmpSeq.current += 1;
        }
    }

    // 테이블에서 데이터 삭제
    // Td.js에서 회사 일련번호를 받아옴
    // array.filter를 이용해서 전달받은 회사 일련번호와 같은 경우 테이블에서 제거
    const handleRemove = (empSeq) => {
        setInfo(info => info.filter(item => item.empSeq !== empSeq));
    }

    // 데이터 편집
    // 수정 버튼 클릭 시 
    // 1. 모달 on(true)
    // 2. 클릭한 데이터 selectedData에 담기
    const handleEdit = (item) => {
        setUpdateModal(true);
        const selectedData = {
            empSeq: item.empSeq,
            empName: item.empName,
            copSeq: item.copSeq,
            userSeq: item.userSeq,
            empState: item.empState,
            authLevel: item.authLevel,
        }

        console.log(selectedData);
        setSelected(selectedData);
    }

    // 취소 버튼 클릭 시 모달 on(false)
    const handleCancel = () => {
        setUpdateModal(false);
        setAddModal(false);
    }

    // 데이터 작성 후 제출(저장)
    // handleSave로 보내고 handleSave는 copSeq값으로 구분하여 수정/추가 
    // 모달 on(false)
    const handleEditSubmit = (item) => {
        console.log(item);
        handleSave(item);
        setUpdateModal(false);
        setAddModal(false);
    }

    return (
        <>
         {loading ? 
            (<Loading/>) :
             (
                <div>
            <Container>
             <div className={styles.head}>
                 {/* <div className={styles.title}> */}
                     <h3 ><span>사원 관리</span></h3>
                     <button type="button" className={styles.headBtn} onClick={toggle}>추가</button>
                 {/* </div> */}
             </div>
 
             <div className={styles.content_body}>
             <table class="table table-hover">
                         <thead class="table-light">
                             <tr>
                                 <th scope="col"><input type='checkbox'></input></th>
                                 <th scope="col">일련번호</th>
                                 <th scope="col">사원명</th>
                                 <th scope="col">직책</th>
                                 <th scope="col">인증레벨</th>
                                 <th scope="col">수정</th>
                                 <th scope="col">삭제</th>
                             </tr>
                         </thead>
                         <Tr info={info} handleRemove={handleRemove} handleEdit={handleEdit}></Tr>
                     </table> 
                     {
                        addModal && <EmployeeAdd toggle={toggle} onSaveData={handleSave} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit}/>
                     }
                        
                     {
                        updateModal && <EmployeeUpdate selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit}/>
                     }
             </div>
            </Container>
        </div>

             )}
        
        </>     
    );
}

export default Employee;




