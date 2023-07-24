import { Container, Form, Button } from "react-bootstrap";
import styles from './EmployeeList.module.css';

function EmployeeList() {
    return (
        <Container>
            <div className="page">
                <div>
                    <div className={styles.content_head}>
                        <div className={styles.title}>
                            <h3 >
                                <span>구성원</span>
                            </h3>
                            <div style={{height: 20}}>
                                <button type="button" className={styles.button}>구성원 추가</button>
                            </div>
                        </div>
                        <div className={styles.searchCon}>
                            <div>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                // className="me-2"
                                className={styles.search}
                                aria-label="Search"
                                height="20px"
                            />
                            </div>
                            <div>
                                <Button variant="outline-primary" className={styles.formControlButton}>Search</Button>
                            </div>

                            
                        </div>

                        {/* <div className="good">
                                <input type="text" placeholder="직원 검색" aria-label="직원검색" aria-describedby="button-addon2"></input>
                                <button type="button" id="button-addon2">검색</button>
                        </div> */}
                        {/* <div className="good">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="직원 검색" aria-label="직원검색" aria-describedby="button-addon2"></input>
                                <input type="text" class="good" placeholder="직원 검색" aria-label="직원검색" aria-describedby="button-addon2"></input>
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">검색</button>
                            </div> */}

                        {/* </div> */}
                       
                    
                    </div>
                <div className={styles.content_body}>
                    <table class="table table-hover">
                    <thead class="table-light">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">사번</th>
                        <th scope="col">이름</th>
                        <th scope="col">자원 관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        {/* <td colspan="2">Larry the Bird</td> */}
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </table>

                            </div>
                        </div>
            </div>
        




        </Container>

    )
}

export default EmployeeList;