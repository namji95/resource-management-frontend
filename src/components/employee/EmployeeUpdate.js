import React, { useState } from 'react';
import axios from 'axios';

import styles from './css/EmployeeUpdate.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const EmployeeUpdate = ({selectedData, handleCancel, handleEditSubmit}) => {

  const [edited, setEdited] = useState(selectedData);
  const [empSeq, setEmpSeq] = useState();

  const onCancel = () => {
    handleCancel();
  }

  const onEditChange = (e) => {
    setEdited({
      ...edited, 
      [e.target.name]: e.target.value
    })
  }

  const onSubmitEdit = (e) => {
    e.preventDefault();
    handleEditSubmit(edited);

    // 백엔드
    console.log(edited.empSeq);
    // setEmpSeq({...selectedData.empSeq})
    setEmpSeq()
    console.log('내가찍어보고싶은거')
    console.log(empSeq);


    axios.post(`http://localhost:8080/api/employee/${Number(edited.empSeq)}`, {
        empName: edited.empName,
        empPosition: edited.empPosition,
        copSeq: edited.copSeq,
        userSeq: edited.userSeq,
        authLevel: edited.authLevel,
    }).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    })

  }


  return (
    <div>
      <div className={styles.cpFormContainer}>
        <fieldset className={styles.cpFieldsetContainer}>
          <Container className={styles.modalHead}>
            <div><h2>사원 정보</h2></div>
            <div><button className={styles.buttonSub} onClick={onCancel}>X</button></div>
          </Container>
          <br/>

          <form onSubmit={onSubmitEdit}>
            <div className={styles.editContainer}>
              <div className={styles.labelInput}><span className={styles.labelItem}>일련번호: {edited.empSeq}</span></div>
              <div className={styles.labelInput}><span className={styles.labelItem}>사원명: </span>
                <input 
                  className={styles.inputItem}
                  type='text'
                  name='empName'
                  value={edited.empName}
                  onChange={onEditChange}
                />
              </div>
              <div className={styles.labelInput}><span className={styles.labelItem}>직책: </span>
                <input 
                  className={styles.inputItem}
                  type='text'
                  name='empPosition'
                  value={edited.empPosition}
                  onChange={onEditChange}
                /> 
              </div>  
              <div className={styles.labelInput}><span className={styles.labelItem}>인증레벨</span>
                        <input
                            className={styles.inputItem}
                            type="text"
                            name="authLevel"
                            placeholder=""
                            value={edited.authLevel}
                            onChange={onEditChange}
                        />
                        </div>
                        <div className={styles.labelInput}><span className={styles.labelItem}>(임시)회사일련번호</span>
                        <input
                            className={styles.inputItem}
                            type="text"
                            name="copSeq"
                            placeholder="4"
                            value={edited.copSeq}
                            onChange={onEditChange}
                        />
                        </div>
                        <div className={styles.labelInput}><span className={styles.labelItem}>(임시)회원일련번호</span>
                        <input
                            className={styles.inputItem}
                            type="text"
                            name="userSeq"
                            placeholder="3"
                            value={edited.userSeq}
                            onChange={onEditChange}
                        />
                        </div>
                    </div>
                <div className={styles.footBtn}>
              <div><button type='reset' className={styles.buttonCancel} onClick={onCancel}>취소</button></div>
              <div><button type='submit' className={styles.buttonSave}>저장</button></div>
            </div>


          </form>
        </fieldset>
      </div>
    </div>
  );

}



//   let data = {};
//   const copSeq = 1;


//   const [companyObj, setCompanyObj] = useState(defaultCompanyObj);

//   const onChangeCompany = (e) => {
//       let newName = e.target.name;
//       let newValue = e.target.value;
//       const newObj = {
//           ...companyObj,
//           [newName] : newValue
//       }
//       setCompanyObj(newObj);
//   }

// const onReset = () => {
//   setCompanyObj(defaultCompanyObj);
// }

// const closeModal = () => {
//     props.setModal(!props.modal);
// }

// const FacilitySaveModal = (event) => {
//     event.preventDefault();


export default EmployeeUpdate;