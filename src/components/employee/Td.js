import React from "react";
import axios from 'axios';
import styles from './css/EmployeeList.module.css';

const Td = ({item, handleRemove, handleEdit}) => {
        
    // 회사 일련번호를 상위 handleRemove로 전달해서 테이블에서 삭제
    const onRemove = () => {
        
        // 백엔드
        console.log(item.empSeq);
        axios.post(`http://localhost:8080/api/employee/del/${Number(item.empSeq)}`, {
        })
        .then((response) => {
            console.log(response.data)
            alert('삭제 완료')
        }
        ).catch((error) => {
            console.log(error)
            ('삭제 실패')
        })

        // 프론트엔드 테이블에서 삭제
        handleRemove(item.empSeq)

    }

    const onEdit = () => {
        handleEdit(item);
    }

    return (
        <>
            <tr >
                <th scope="row"><input type='checkbox'></input></th>
                <td>{item.empSeq}</td>
                <td>{item.empName}</td>
                <td>{item.empPosition}</td>
                <td>{item.authLevel}</td>
                <td><button type="button" className={styles.button} onClick={onEdit}>수정</button></td>
                <td><button type="button" className={styles.button} onClick={onRemove}>삭제</button></td>
            </tr> 
        </>
    )
}

export default Td;