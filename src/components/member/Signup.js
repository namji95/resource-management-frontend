import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from '../../css/Signup.module.css';
import { style } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Signup() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedOption, setSelectedOption] = useState('남');
    const [address, setAddress] = useState('');

    const [idValid, setIdValid] = useState(false);
    const [passValid, setPassValid] = useState(false);
    const [passConfirmValid, setPassConfirmValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [idCheck, setIdCheck] = useState('');
    const [phoneErrorValid, setPhoneErrorValid] = useState(null);
    const [phoneValid, setPhoneValid] = useState(false);
    const [showPostcode, setShowPostCode] = useState(false);
    const [addressValid, setAddressValid] = useState(false);

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

    const handlePhone = (e) => {
        const { value } = e.target;
        setPhone(value);

        const pattern = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
        setPhoneErrorValid(pattern.test(value) ? "" : "올바른 전화번호 형식이 아닙니다.")
    }

    const handleAddress = (data) => {
        setAddress(`[${data.zonecode}] ${data.address}`);
        setShowPostCode(false);
    }

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const handleOpenPostcode = () => {
        setShowPostCode(true);
    }

    async function signUpHandler() {
        try {
          const response = await axios.post('http://localhost:8080/api/user/signup', {
            userId: id,
            userPwd: password,
            userName: name,
            userEmail: email,
            userPhone: phone,
            userGender: selectedOption,
            userAddress: address,
          });
      
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } catch (error) {
          toast.error('회원가입 실패 -- backend error 로직 아직 안됨', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
        
        // await를 사용하여 알림이 표시된 후에 navigate()를 실행
        await new Promise((resolve) => // resolve promise가 성공적으로 완료되었을때
        {
            console.log(resolve);
            setTimeout(resolve, 3000)
        });
        navigate("/");
      }
    
    useEffect(() => {

        if(emailValid && passConfirmValid && idValid && phoneValid && addressValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [emailValid, passConfirmValid, idValid, phoneValid, addressValid])

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

        if (phoneErrorValid === "") {
            setPhoneValid(true);
        } else {
            setPhoneValid(false);
        }

        if (address !== '') {
            setAddressValid(true);
        } else {
            setAddressValid(false);
        }

    }, [password, passwordConfirm , email, phone, address])

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

                    <div className={styles.inputTitle}>전화번호</div>
                    <div className={styles.inputWrap}>
                        <input type="tel"
                                id='phone'
                                name='phone'
                                className={styles.input}
                                onChange={handlePhone}
                                pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}" 
                                placeholder="010-1234-5678" 
                                required 
                        />
                    </div>
                    {phoneErrorValid && <div className={styles.errorMessageWrap}>{phoneErrorValid}</div>}


                    <div className={styles.inputTitle}>성별</div>
                    <div className={styles.inputWrap} style={{borderColor : 'white', padding : '0.3em'}}>
                        <label>
                            <input
                                type='radio'
                                name='options'
                                value='남'
                                checked={selectedOption === '남'}
                                onChange={handleOptionChange}
                            />
                            <span style={{ marginLeft : '8px', fontSize : '0.9em'}}>남</span>
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>
                            <input
                                type='radio'
                                name='options'
                                value='여'
                                checked={selectedOption === '여'}
                                onChange={handleOptionChange}
                            />
                            <span style={{ marginLeft : '8px', fontSize : '0.9em'}}>여</span>
                        </label>
                    </div>

                    <div className={styles.inputTitle}>우편번호 검색</div>
                    <div className={styles.inputWrap}>
                    <button onClick={handleOpenPostcode} style={{margin : '0px', padding : '5px', float : 'left', fontSize : '12px'}}>주소 검색</button>
                        {showPostcode && (
                            <div>
                                <DaumPostcode
                                onComplete={handleAddress}
                                style={{ width: "100%", height: "500px" }}
                                />
                            </div>
                        )}
                        <div style={{fontSize : '12px', margin: 'auto'}}>{address}</div>
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

            <div>
                <ToastContainer style={{width: '350px', fontSize: '14px'}}/>
            </div>

        </React.Fragment>
    );
};

export default Signup;
 