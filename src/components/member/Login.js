import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import LoginFail from './LoginFail';
import styles from "../../css/Login.module.css";

// redux-toolkit
import { useDispatch } from "react-redux";
import { saveToken, saveInfo } from "../store/CounterSlice";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [checkFail, setCheckFail] = useState("");

  // redux-toolkit dispatch
  const dispatch = useDispatch();
  const focusRef = useRef(null); // 로그인 실패시 사용할 Ref
  const loginInputRef = useRef(null); // 로그인 input 클릭시 사용할 Ref
  const passwordInputRef = useRef(null); // 패스워드 input 클릭시 사용할 Ref

  // result data
  let data = {};

  // 로그인 function
  const handleLogin = async () => {
    // axios.post('https://deeb-112-221-198-150.ngrok-free.app/member', {
    await axios
      .post("http://localhost:9000/api/user/login", {
        userId: id,
        userPwd: password,
      })
      .then((result) => {
        data = result.data;

        console.log(data);

        if (data.statusCode === 401) {
          setCheckFail("아이디나 비밀번호를 다시 확인해주세요.");
        } else if (data.statusCode === 200) {
          localStorage.setItem("accessToken", data.tokenDTO.authorization);
          if (localStorage.getItem("accessToken").includes("Bearer")) {
                localStorage.setItem("userInfo", JSON.stringify(data.userDTO));
                dispatch(saveToken(localStorage.getItem("accessToken"))); // redux-toolkit 에 토큰 저장
                dispatch(saveInfo({
                    name : data.userDTO.userName,
                    email : data.userDTO.userEmail,
                }));
            }
        }
      })
      .catch((error) => {
        console.log(error);
        setCheckFail("서버오류! 관리자에게 문의해주세요.");
      });
  };

  // input tag focus 시 border 색상 변경 및 checkFail 초기화
  const failRef = () => {
    setCheckFail('');
  }

  // 로그인 input 클릭
  const loginInputClick = () => {
    loginInputRef.current.style.borderColor = '#007bff';
    passwordInputRef.current.style.borderColor = '#ccc';
  }

  // 패스워드 input 클릭
  const passwordInputClick = () => {
    passwordInputRef.current.style.borderColor = '#007bff';
    loginInputRef.current.style.borderColor = '#ccc';
  }

  return (
    <React.Fragment>
      <>
        <div className={styles.page}>
          <div className={styles.imgContainer}>
            <img src="https://kimsky.s3.ap-northeast-2.amazonaws.com//wehago_logo.png" />
          </div>
          <div className={styles.title}>로그인</div>

          <div className={styles.contentWrap} style={{ width: "450px" }}>
            <div className={styles.inputTitle}>아이디</div>
            { checkFail === '' ? 
            <div className={styles.inputWrap}>
              <input
                ref={loginInputRef}
                type="text"
                className={styles.input}
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                onClick={loginInputClick}
              />
            </div>
            :
            <div className={styles.inputWrap}>
              <input
                ref={focusRef}
                type="text"
                className={styles.input}
                style={{borderColor : 'red'}}
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                onClick={failRef}
              />
            </div>
            }
            <div className={styles.inputTitle}>비밀번호</div>
            { checkFail === '' ? 
            <div className={styles.inputWrap}>
              <input
                ref={passwordInputRef}
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onClick={passwordInputClick}
              />
            </div>
            :
            <div className={styles.inputWrap}>
              <input
                ref={focusRef}
                type="password"
                className={styles.input}
                style={{borderColor : 'red'}}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onClick={failRef}
              />
            </div>
            }
            <div className={styles.loginCheck}>{checkFail}</div>
          </div>

          <button className={styles.bottomButton} onClick={handleLogin}>
            로그인
          </button>

          <Link to="/signup" style={{textDecoration : 'none'}}>회원가입</Link>

          <br />
        </div>
      </>
    </React.Fragment>
  );
}

export default Login;
