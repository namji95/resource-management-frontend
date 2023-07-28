import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from '../../css/Signup.module.css';
import { style } from '@mui/system';
import { useNavigate } from 'react-router-dom';



function Signup() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [idValid, setIdValid] = useState(false);
    const [passValid, setPassValid] = useState(false);
    const [passConfirmValid, setPassConfirmValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const [idCheck, setIdCheck] = useState('');

    // let data = {};

    const navigate = useNavigate();

    const handleIdCheck = (e) => {
        setId(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const signUpHandler = () => {
        axios.post('http://localhost:8080/api/user/signup', {
            userId : id,
            userPwd : password,
            userName : name,
            userEmail : email,
        }).then((response) => {
            console.log(response)
            navigate("/")
        }).catch((error) => {
            console.log(error)
        })
    }
    
    useEffect(() => {

        if(emailValid && passConfirmValid && idValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [emailValid, passConfirmValid, idValid])

    useEffect(() => {
    }, [passwordConfirm, password])

    useEffect(() => {

        if (id.length > 6) {

            axios.post('http://localhost:8080/api/user/duplicate', {}, {
                params : {
                    userId : id,
                }
            }).then((response) => {
                if(response.data == 0) {
                    setIdCheck('OK');
                } else {
                    setIdCheck('NO');
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            setIdCheck('NO');
        }

        if (idCheck === 'OK') {
            setIdValid(true);
        } else {
            setIdValid(false);
        }

    }, [id, idCheck])

    useEffect(() => {

        const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if(passwordRegex.test(password)) {
            setPassValid(true);
        } else {
            setPassValid(false);
        }

        if (password.length > 7 && passwordConfirm.length > 7) {
            if (password === passwordConfirm) {
                setPassConfirmValid(true)
            } else {
                setPassConfirmValid(false)
            }
        } else {
            setPassConfirmValid(false);
        }

        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        if(emailRegex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }

    }, [password, passwordConfirm , email])

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
                            placeholder='영어로 7자 이상'
                            className={styles.input}
                            value={id}
                            onChange={handleIdCheck}
                        />
                    </div>
                    { idCheck === 'OK' && id.length > 0 ? <p className={styles.successMessageWrap}>사용 가능한 아이디입니다.</p> 
                    : idCheck === 'NO' && id.length > 0 ? <p className={styles.errorMessageWrap}>사용 불가능한 아이디입니다.</p> 
                    : id.length === 0 ? <p> </p> : <p> </p>  }

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
                    <div>
                        {
                            // !passValid && password.length > 0 && password.length < 8 && (
                            //     <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                            // )
                            password.length === 0 ? <p></p> :
                            password.length > 1 && password.length < 25 && passValid ?
                            (<p className={styles.successMessageWrap}>조건에 맞는 비밀번호입니다.</p>) : 
                            (<p className={styles.errorMessageWrap}>영문, 숫자, 특수문자 포함 8~25자 이상 입력해주세요.</p>)
                        }
                    </div>

                    <div className={styles.inputTitle}>비밀번호 확인</div>
                    <div className={styles.inputWrap}>
                        <input 
                            type='password'
                            className={styles.input}
                            onChange={handlePasswordConfirm} 
                        />
                    </div>
                    <div>
                        {
                            passConfirmValid ? (<p className={styles.successMessageWrap}>비밀번호와 일치합니다.</p>) : 
                            !passConfirmValid && passwordConfirm.length > 0 ? <p className={styles.errorMessageWrap}>비밀번호와 일치하지 않습니다.</p> : 
                            <p></p>
                        }
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
                <button disabled={notAllow} className={styles.bottomButton} onClick={signUpHandler}>
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
 