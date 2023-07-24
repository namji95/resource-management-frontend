import { Container, Form, Button } from "react-bootstrap";
import styles from './EmployeeUpdate.module.css';

function EmployeeUpdate() {
    return (
        <Container>
            <div className="page">
                <div>
                    <div className={styles.content_head}>
                        <div className={styles.title}>
                            <h3 >
                                <span>구성원 정보</span>
                            </h3>
                            <div style={{height: 20}}>
                                <button type="button" className={styles.button}>구성원 수정</button>
                 </div>
                        </div>
                    </div>
                <div className={styles.content_body}>
                    <table class="table table-sm">
                    {/* <thead class="table-light">
                        <tr>
                        <th scope="row">회사</th>
                        <th scope="row">사번</th>
                        <th scope="row">ID</th>
                        <th scope="row">자원 관리</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        <tr>
                        <th scope="col">회사</th>
                        <td>회사</td>
                        <td>Mark</td>
                        <td></td>
                        </tr>

                        <tr>
                        {/* <th scope="row">사번</th> */}
                        <td scope="col">사번</td>
                        <td>Jacob</td>
                        <td></td>
                        </tr>

                        <tr>
                        <th scope="col">ID</th>
                        <td>Jacob</td>
                        <td></td>
                        </tr>

                        <tr>
                        <th scope="col">자원관리</th>
                        {/* <td colspan="2">Larry the Bird</td> */}
                        <td>Larry</td>
                        <td></td>
                        </tr>
                    </tbody>
                    </table>

                            </div>
                        </div>
            </div>
        




        </Container>

    )
}

export default EmployeeUpdate;