/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { addUserInfo } from '../../../redux/actions/index';

function Login(props: any) {
  //console.log(props, 'props');
  const { userInfoToStore } = props;
  //axios.defaults.withCredentials = true;

  const inputEmail: any = useRef();
  const inputpassword: any = useRef();

  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [emailcheckMessage, setEmailCheckMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  //토큰저장
  const [token, setToken] = useState('');

  const handleUserInfo = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  //이메일 중복검사 필터
  const emailRegExp =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  //비밀번호 중복검사 필터
  const passwordRegExp = /^[a-zA-z0-9]{4,12}$/;

  //이메일 유효성검사
  const emailValidation = (e: any) => {
    handleUserInfo(e);
    if (emailRegExp.test(e.target.value) === false) {
      setEmailCheckMessage('올바른 이메일을 입력해주세요.');
    } else {
      setEmailCheckMessage('');
    }
  };
  //비밀번호 유효성검사
  const passwordValidation = (e: any) => {
    handleUserInfo(e);
    if (passwordRegExp.test(e.target.value) === false) {
      setPasswordMessage(
        '비밀번호는 영문 대소문자와 숫자 4-12자리로 입력해야합니다.'
      );
    } else {
      setPasswordMessage('');
    }
  };
  // 로그인
  const Login = async (e: any) => {
    e.preventDefault();
    console.log(userInfo);
    if (emailRegExp.test(userInfo.email) === false) {
      inputEmail.current.focus();
      return;
    }
    if (passwordRegExp.test(userInfo.password) === false) {
      inputpassword.current.focus();
      return;
    }
    if (userInfo) {
      try {
        await axios
          .post(`http://localhost:5000/user/login`, userInfo)
          .then((res) => {
            const { accessToken, loginMethod } = res.data.data;
            //console.log(accessToken, loginMethod);
            if (accessToken) {
              setToken(accessToken);
              void tokenVerification();
            } else {
              console.log('토큰이 없습니다.');
            }
          });
      } catch (error) {
        console.log('로그인 실패');
        alert(
          '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요'
        );
      }
    }
  };

  // 토큰 검증 후 유저 정보 불러오는 함수
  const tokenVerification = async () => {
    try {
      await axios
        .get(`http://localhost:5000/token`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { userInfo } = res.data.data;
          // console.log(userInfo);
          if (userInfo) {
            void goToStore(userInfo);
          } else {
            console.log('로그인 실패');
          }
        });
    } catch (error) {
      console.log('error');
    }
  };
  // 유저정보 store에 담기
  const goToStore = async (userInfo: any) => {
    await userInfoToStore(userInfo);
  };
  return (
    <div>
      <div>
        <h1> Log in to your account</h1>
        <form>
          <div>
            <input
              type="text"
              ref={inputEmail}
              placeholder="이메일"
              name="email"
              onChange={emailValidation}
            />
          </div>
          <div>{emailcheckMessage}</div>
          <div>
            <input
              type="current-password"
              ref={inputpassword}
              placeholder="비밀번호"
              name="password"
              onChange={passwordValidation}
            />
          </div>
          <div>{passwordMessage}</div>
          <div>
            <button onClick={Login}>Login</button>
          </div>
          <div>
            <button>카카오</button>
          </div>
        </form>
      </div>
    </div>
  );
}

//redux로 상태관리
const mapStateToProps = (state: object) => {
  //console.log(state);
  return {
    user: state,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    userInfoToStore: (userInfo: object) => {
      dispatch(addUserInfo(userInfo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
