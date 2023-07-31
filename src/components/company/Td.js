import React, { useState } from "react";
import axios from 'axios';
import styles from './CompanyList.module.css';

const Td = ({item, handleRemove, handleEdit}) => {
        
    // 회사 일련번호를 상위 handleRemove로 전달해서 테이블에서 삭제
    const onRemove = () => {
        
        // 백엔드
        console.log(item.copSeq);
        axios.put(`http://localhost:8080/api/company/del/${Number(item.copSeq)}`, {
          copRegNum: item.copSeq,
          copName: item.copName,
          copState: false
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
        handleRemove(item.copSeq)

    }

    const onEdit = () => {
        handleEdit(item);
    }

    return (
        <>
            <tr >
                <th scope="row"><input type='checkbox'></input></th>
                <td>{item.copSeq}</td>
                <td>{item.copRegNum}</td>
                <td>{item.copName}</td>
                {/* <td>{item.copState.toString()}</td> */}
                <td><button type="button" className={styles.button} onClick={onEdit}>수정</button></td>
                <td><button type="button" className={styles.button} onClick={onRemove}>삭제</button></td>
            </tr> 
        </>
    )
}

export default Td;