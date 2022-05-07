/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const SignupBox = styled.form`
  width: 40rem;
  height: 100rem;
  border: 2px solid red;
  padding: 30px;
  margin-left: 10rem;
`;

interface emailcheck {
  email: string;
}

function Signup() {
  //이메일 중복검사
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);
  const [nickname, setNickname] = useState('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    password: '',
  });

  //이메일 중복검사
  async function emailCheck(e: any) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      e.preventDefault();
      console.log(email);
      await axios
        .get(`http://localhost:5000/user/emailcheck/${email}`)
        .then((res) => {
          console.log('hi');
          if (res) {
            return;
          } else {
            return 'ho';
          }
        });
    } catch (error) {
      console.log('error');
    }

    /* await axios.get(`http://localhost:5000/user/emailcheck/${email}`);
    return; */
  }

  const nicknameCheck = () => {
    console.log(nickname);
  };

  return (
    <Container>
      <SignupBox>
        <div>
          <input
            name={email}
            placeholder="이메일"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button onClick={emailCheck}>중복검사</button>
        </div>
        <div>
          <input
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
          />
          <button onClick={nicknameCheck}>중복검사</button>
        </div>
        <div>
          <input placeholder="비밀번호" />
        </div>
        <div>
          <input placeholder="비밀번호확인" />
        </div>
        <div>
          <button>회원가입</button>
        </div>
        <div>
          <button>카카오</button>
        </div>
      </SignupBox>
    </Container>
  );
}

export default Signup;
