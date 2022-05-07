/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
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
  const inputEmail: any = useRef();
  const inputNickname: any = useRef();

  //가입할 회원정보
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    nickname: '',
    password: '',
  });

  //이메일,닉네임 중복검사(signupInfo.email과 정보 맞는지 확인하기위해)
  const [emailcheck, setEmailCheck] = useState('');
  const [nicknamecheck, setNicknameCheck] = useState('');
  //이메일, 닉네임 유효성 확인 메세지
  const [emailcheckMessage, setEmailCheckMessage] = useState('');
  const [nicknamecheckMessage, setNicknameCheckMessage] = useState('');
  // 닉네임 중복검사 실행가능 여부
  const [nicknamevalidation, setNicknameValidation] = useState(false);
  //이메일 중복검사 필터
  const emailRegExp =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

  useEffect(() => {}, [emailcheck]);
  /* useEffect(() => {}, [nicknamecheck]); */

  const handleChangeState = (e: any) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleEmailValidation = (e: any) => {
    handleChangeState(e);
    console.log(signupInfo);
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
    console.log(email);
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
  // 회원가입완료
  const signupcheck = (e: any) => {
    e.preventDefault();
    console.log(nicknamecheck);
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
          {emailcheckMessage}
        </div>
        <div>
          <input
            placeholder="닉네임"
            ref={inputNickname}
            name="nickname"
            value={signupInfo.nickname}
            onChange={handleNicknameValidation}
          />
          <button onClick={nicknameCheck}>중복검사</button>
          {nicknamecheckMessage}
        </div>
        <div>
          <input placeholder="비밀번호" />
        </div>
        <div>
          <input placeholder="비밀번호확인" />
        </div>
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
