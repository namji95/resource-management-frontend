import Form from 'react-bootstrap/Form';

import styles from './Company.module.css';


function company() {
    return (
        <>
            <div className={styles.page}>
            <h1>신청하기</h1>
            <br/>
        <h6>서비스 세팅을 위해 회사 정보를 입력해주세요.
            <br/>
            입력한 내용으로 최초 관리자 정보가 설정됩니다.
        </h6>

        <br />
        <span className={styles.inputTitle}>회사명</span>
        <Form.Control type="text" placeholder="" />
        <br />
        <span className={styles.inputTitle}>사업자등록번호</span>
        <Form.Control type="text" placeholder="" />
        <br />
        <span className={styles.inputTitle}>관리자 ID</span>
        <Form.Control type="text" placeholder="" />
        <br />
        {/* <span className={styles.inputTitle}>비밀번호</span>
        <Form.Control type="password" placeholder="" />
        <br />
        <span className={styles.inputTitle}>비밀번호 확인</span>
        <Form.Control type="password" placeholder="" />
        <br /> */}

        <br />
        <div>
            <button className={styles.bottomButton}>
                서비스 신청하기
            </button>
        </div>
            </div>

            
        </>
    )
}

export default company;




