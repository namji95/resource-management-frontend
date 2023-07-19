import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from '../../css/Signup.module.css';



function Signup() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [passValid, setPassValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    // let data = {};

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if(regex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if(regex.test(password)) {
            setPassValid(true);
        } else {
            setPassValid(false);
        }
    }
    


    useEffect(() => {
        if(emailValid && passValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, passValid])

    return (
        <React.Fragment>
            <div className={styles.page}>
                <div className='imgContainer'>
                    <img src='https://kimsky.s3.ap-northeast-2.amazonaws.com//wehago_logo.png' />
                </div>
                <div className={styles.title}>
                    회원가입
                </div>

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
                            placeholder='영문, 숫자, 특수문자 포함 8자 이상'
                            value={password}
                            onChange={handlePassword}    
                        />
                    </div>
                    <div className={styles.errorMessageWrap}>
                        {
                            !passValid && password.length > 0 && password.length < 8 && (
                                <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div className={styles.inputTitle}>비밀번호 확인</div>
                    <div className={styles.inputWrap}>
                        <input 
                            type='password'
                            className={styles.input} 
                        />
                    </div>
                    <div className={styles.inputTitle}>이름</div>
                    <div className={styles.inputWrap}>
                        <input 
                            type='text'
                            className={styles.input}
                            value={name} 
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputTitle}>이메일 주소</div>
                    <div className={styles.inputWrap}>
                        <input 
                            type='text'
                            className={styles.input}
                            placeholder='wehago@gmail.com'
                            value={email}
                            onChange={handleEmail} 
                        />
                    </div>
                    <div className={styles.errorMessageWrap}>
                        {
                            !emailValid && email.length > 0 && (
                                <div>이메일 형식을 확인해주세요.</div>
                            )
                        }
                    </div>            
               </div>


               <div>
                <button disabled={notAllow} className={styles.bottomButton}>
                    회원가입하기
                </button>
               </div>




            </div>






            {/* <container>
                <h2> 회원가입</h2>
                <br/>
                <div>
                    아이디<br/>
                    <input label="아이디" placeholder="아이디를 입력해주세요." value={memberId} onChange={(e) => {
                        setMemberId(e.target.value);
                        console.log(memberId);
                    }}></input>
                    <br/>비밀번호<br/>
                    <input label="비밀번호" placeholder="비밀번호를 입력해주세요." value={memberPw} onChange={(e) => {
                        setmemberPw(e.target.value);
                    }}>
                    </input>
                    <br/>이름<br/>
                    <input label="이름" placeholder="" value={memberName} onChange={(e) => {
                        setMemberName(e.target.value);
                    }}>
                    </input>
                    

                    
                </div>

                <button onClick={() => {
                // axios.post('https://deeb-112-221-198-150.ngrok-free.app/member', {
                axios.post('http://localhost:9000/api/signup', {
                    memberId: memberId,
                    memberPw: memberPw,
                    memberName: memberName,
                    memberRank: memberRank,
                    memberPosition: memberPosition,
                    memberEnterDate: memberEnterDate,
                    teamSeq: teamSeq
                })
                .then((result) => {
                    data = result.data;
                    console.log(data)
                    
                })
                .catch((error) => {
                    console.log('요청실패');
                    console.log(error);
                })
            }}>회원가입</button>
        
        
        </container> */}
        </React.Fragment>
    );
};

export default Signup;
 