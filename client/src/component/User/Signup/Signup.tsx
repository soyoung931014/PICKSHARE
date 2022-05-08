/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
//import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;
const SignupBox = styled.form`
  width: 40rem;
  height: 100rem;
  border: 2px solid red;
  padding: 30px;
  margin-left: 10rem;
`;

function Signup() {
  //axios.defaults.withCredentials = true;
  //const navigate = useNavigate();

  const inputEmail: any = useRef();
  const inputNickname: any = useRef();
  const inputPassword: any = useRef();
  const inputPasswordCheck: any = useRef();
  //가입할 회원정보
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordcheck: '',
  });

  //이메일,닉네임 중복검사(signupInfo.email과 정보 맞는지 확인하기위해)
  const [emailcheck, setEmailCheck] = useState('');
  const [nicknamecheck, setNicknameCheck] = useState('');
  //이메일, 닉네임, 비밀번호 유효성 확인 메세지
  const [emailcheckMessage, setEmailCheckMessage] = useState('');
  const [nicknamecheckMessage, setNicknameCheckMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  // 닉네임 중복검사 실행가능 여부
  const [nicknamevalidation, setNicknameValidation] = useState(false);

  //이메일 중복검사 필터
  const emailRegExp =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  //비밀번호 중복검사 필터
  const passwordRegExp = /^[a-zA-z0-9]{4,12}$/;

  useEffect(() => {}, [emailcheck]);
  /* useEffect(() => {}, [nicknamecheck]); */

  const handleChangeState = (e: any) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleEmailValidation = (e: any) => {
    handleChangeState(e);
    // console.log(signupInfo);
    if (emailRegExp.test(e.target.value) === false) {
      setEmailCheckMessage('알맞은 형식의 이메일을 입력해주세요.');
    } else {
      setEmailCheckMessage('중복 검사를 할 수 있습니다.');
    }
  };

  //이메일 중복검사
  async function emailCheck(e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    e.preventDefault();
    const { email } = signupInfo;
    // console.log(email);
    if (email === '') {
      setEmailCheckMessage('이메일을 적어주세요');
      inputEmail.current.focus();
      return;
    }
    if (emailRegExp.test(email) === true) {
      try {
        await axios
          .get(`http://localhost:5000/user/emailcheck/${email}`)
          .then((res) => {
            if (res.data === false) {
              console.log(res.data);
              setEmailCheckMessage('사용할 수 있는 이메일입니다.');
              setEmailCheck(email);
              /* console.log(emailcheck);
              console.log(signupInfo); */
            } else {
              setEmailCheckMessage('이미 사용중인 이메일입니다.');
              /* console.log(emailcheck);
              console.log(signupInfo); */
            }
          });
      } catch (error) {
        console.log('error');
      }
    }
  }

  // 닉네임 유효성검사
  const handleNicknameValidation = (e: any) => {
    handleChangeState(e);

    if (e.target.value.length >= 2 && e.target.value.length < 21) {
      setNicknameCheckMessage('중복 검사를 할 수 있습니다.');
      setNicknameValidation(true);
    }
    if (e.target.value.length < 2 || e.target.value.length > 20) {
      setNicknameCheckMessage('닉네임은 2~20자 이내입니다.');
      setNicknameValidation(false);
    }
  };

  //닉네임 중복검사
  const nicknameCheck = async (e: any) => {
    const { nickname } = signupInfo;

    e.preventDefault();
    if (nickname === '') {
      setNicknameCheckMessage('닉네임은 필수입니다.');
      inputNickname.current.focus();
      return;
    }
    if (nicknamevalidation === true) {
      try {
        await axios
          .get(`http://localhost:5000/user/nicknamecheck/${nickname}`)
          .then((res) => {
            console.log('res');
            //닉네임을 userInfo value값에 넣어놓기
            if (res.data === false) {
              console.log(res.data);
              setNicknameCheckMessage('사용할 수 있는 닉네임입니다.');
              setNicknameCheck(nickname); // 나중에 회원가입 버튼을 누를 시  signupInfo.nickname과 nicknamecheck의 정보가 일치하는지를 확인
              console.log(nicknamecheck);
              console.log(signupInfo);
            } else {
              setNicknameCheckMessage('이미 사용중인 닉네임입니다');
              console.log(nicknamecheck);
              console.log(signupInfo);
            }
          });
      } catch (error) {
        console.log('error');
      }
    }
  };
  // 비밀번호 유효성 검사
  const passwordValidation = (e: any) => {
    handleChangeState(e);
    const { passwordcheck } = signupInfo;

    if (passwordRegExp.test(e.target.value) === false) {
      setPasswordMessage(
        '비밀번호는 영문 대소문자와 숫자 4-12자리로 입력해야합니다.'
      );
    } else if (passwordcheck !== '' && passwordcheck !== e.target.value) {
      setPasswordMessage('비밀번호가 일치하지 않습니다.');
    } else if (passwordcheck === e.target.value) {
      setPasswordMessage('비밀번호가 일치합니다.');
    } else if (passwordRegExp.test(e.target.value) === true) {
      setPasswordMessage('사용할 수 있는 비밀번호입니다.');
    }
  };
  const passwordCheck = (e: any) => {
    handleChangeState(e);
    const { password } = signupInfo;
    if (password === '' && e.target.value === '') {
      setPasswordMessage('');
    } else if (e.target.value === '') {
      setPasswordMessage('비밀번호 확인을 입력해주세요');
    } else if (password !== e.target.value) {
      setPasswordMessage('비밀번호가 일치하지 않습니다.');
    } else if (passwordRegExp.test(e.target.value) === false) {
      setPasswordMessage(
        '비밀번호는 영문 대소문자와 숫자 4-12자리로 입력해야합니다.'
      );
    } else {
      setPasswordMessage('비밀번호가 일치합니다.');
    }
  };

  // 회원가입완료
  const signupcheck = async (e: any) => {
    e.preventDefault();
    console.log(signupInfo);
    const { email, nickname, password, passwordcheck } = signupInfo;
    if (
      email === '' ||
      nickname === '' ||
      password === '' ||
      passwordcheck === ''
    ) {
      alert('회원정보를 모두 입력해주세요');
      return;
    }
    if (email !== emailcheck) {
      alert('이메일 중복검사를 다시 확인해주세요');
      inputEmail.current.focus();
      return;
    }
    if (nickname !== nicknamecheck) {
      alert('닉네임 중복검사를 다시 확인해주세요');
      inputNickname.current.focus();
      return;
    }
    if (!passwordRegExp.test(password) || password !== passwordcheck) {
      alert('비밀번호를 다시확인해주세요');
      return;
    }
    const userInfo = { email, nickname, password };
    if (userInfo) {
      try {
        await axios
          .post(`http://localhost:5000/user/signup`, userInfo)
          .then((res) => console.log(res));
        alert('회원가입이 완료되었습니다. 로그인을 시도해주세요');
        //🙋‍♀️ 로그인 화면으로 넘어가기
        //navigate('/login');
      } catch (error) {
        console.log('error');
      }
    }
  };

  return (
    <Container>
      <SignupBox>
        <div>
          <input
            placeholder="이메일"
            ref={inputEmail}
            name="email"
            value={signupInfo.email}
            onChange={handleEmailValidation}
          />
          <button onClick={emailCheck}>중복검사</button>
          <div>{emailcheckMessage}</div>
        </div>
        <div>
          <input
            placeholder="닉네임"
            ref={inputNickname}
            name="nickname"
            /* value={signupInfo.nickname} */
            onChange={handleNicknameValidation}
          />
          <button onClick={nicknameCheck}>중복검사</button>
          <div>{nicknamecheckMessage}</div>
        </div>
        <div>
          <input
            placeholder="비밀번호"
            ref={inputPassword}
            name="password"
            type="new-password"
            /* value={signupInfo.password} */
            onChange={passwordValidation}
          />
        </div>

        <div>
          <input
            placeholder="비밀번호확인"
            ref={inputPasswordCheck}
            name="passwordcheck"
            type="new-password"
            value={signupInfo.passwordcheck}
            onChange={passwordCheck}
          />
        </div>
        <div>{passwordMessage}</div>
        <div>
          <button onClick={signupcheck}>회원가입</button>
        </div>
        <div>
          <button>카카오</button>
        </div>
      </SignupBox>
    </Container>
  );
}

export default Signup;
