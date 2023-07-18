import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import LoginFail from './LoginFail';
import styles from '../../css/Login.module.css';


function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    let data = {};
    const [checkFail, setCheckFail] = useState(true);
    const navigate = useNavigate();

    const test = () => {navigate('/input')}

    return (
        <React.Fragment>
            <>
            <div className={styles.page}>
            <div className={styles.imgContainer}>
                    <img src='https://kimsky.s3.ap-northeast-2.amazonaws.com//wehago_logo.png' />
            </div>
            <div className={styles.title}>로그인</div>

            <div className={styles.contentWrap}>
                <div className={styles.inputTitle}>아이디</div>
                    <div className={styles.inputWrap}>
                        <input 
                            type='text'
                            className={styles.input}
                            value={id}
                            onChange={(e) => {
                                setId(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputTitle}>비밀번호</div>
                    <div className={styles.inputWrap}>
                        <input 
                            type='password'
                            className={styles.input}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>

            </div>

            <button className={styles.bottomButton} onClick={() => {
                // axios.post('https://deeb-112-221-198-150.ngrok-free.app/member', {
                axios.post('http://localhost:9000/member', {

                    userId: id,
                    password: password
                })
                .then((result) => {
                    data = result.data;
                    console.log(data)
                    if(data.ok === 'fail') {
                        setCheckFail(false);
                    } else if(data.ok === 'ok'){
                        setCheckFail(true);
                       
                    }
                })
                .catch((error) => {
                    console.log('요청실패');
                    console.log(error);
                })
            }}>로그인</button>

            <Link to="/signup">회원가입</Link>

            {/* <Link to="/input"></Link> */}
            
            <br />

            {
                // checkFail ? test : <LoginFail />
            }

            </div>
            
            </>
        </React.Fragment>

       
    );

}

export default Login;