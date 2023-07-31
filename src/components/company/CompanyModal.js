import React, { useState } from 'react';
import axios from 'axios';

import styles from './CompanyUpdate.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const CompanyModal = ({selectedData, handleCancel, handleEditSubmit}) => {

  const [edited, setEdited] = useState(selectedData);
  const [copSeq, setCopSeq] = useState();

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
    console.log(edited.copSeq);
    setCopSeq({...selectedData.copSeq})
    console.log(copSeq);

    axios.put(`http://localhost:8080/api/company/${Number(edited.copSeq)}`, {
      copRegNum: edited.copRegNum,
      copName: edited.copName,
      copState: edited.copState
    }).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    })


  }

  // const handleEdit = (item) => {
  //   setModalOn(true);
  //   const selectedData = {
  //     copSeq: item.copSeq,
  //     copRegNum: item.copRegNum,
  //     copName: item.copName,
  //     copState: item.copState,
  //   }
  //   console.log(selectedData);
  //   setSelected(selectedData);
  // }

  return (
    <div>
      <div className={styles.cpFormContainer}>
        <fieldset className={styles.cpFieldsetContainer}>
          <Container className={styles.modalHead}>
            <div><h2>회사 정보</h2></div>
            <div><button className={styles.buttonSub} onClick={onCancel}>X</button></div>
          </Container>
          <br/>

          <form onSubmit={onSubmitEdit}>
            <div className={styles.editContainer}>
              <div className={styles.labelInput}><span className={styles.labelItem}>일련번호: {edited.copSeq}</span></div>
              <div className={styles.labelInput}><span className={styles.labelItem}>사업자등록번호: </span>
                <input 
                  className={styles.inputItem}
                  type='text'
                  name='copRegNum'
                  value={edited.copRegNum}
                  onChange={onEditChange}
                />
              </div>
              <div className={styles.labelInput}><span className={styles.labelItem}>회사명: </span>
                <input 
                  className={styles.inputItem}
                  type='text'
                  name='copName'
                  value={edited.copName}
                  onChange={onEditChange}
                /> 
              </div>  
              <div className={styles.labelInput}> <span className={styles.labelItem}>회사 상태: </span>
                <input 
                  className={styles.inputItem}
                  type='text'
                  name='copState'
                  value={edited.copState}
                  onChange={onEditChange}
                /> 
              </div>
            </div>

            <div className={styles.footBtn}>
              <div><button type='reset' className={styles.buttonCancel} onClick={onCancel}>취소</button></div>
              <div><button type='submit' className={styles.buttonSave}>수정</button></div>
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


export default CompanyModal;