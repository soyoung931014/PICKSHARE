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
import userApi from '../../../api/user';
import styled from 'styled-components';
import background from '../../../img/diaryBackground.png';
import pickshareLogo from '../../../img/pickshare.png';
import homeIndex from '../../../img/homeIndex.png';
import signupIndex from '../../../img/signupIndex.png';
import signinIndex from '../../../img/signinIndex.png';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
`;

const Book = styled.div`
  //border: solid 2px red;
  height: 100vh;
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1em;
  position: relative;
  left: 8rem;
`;
const Left = styled.div`
  display: flex;
  align-items: flex-end;
  width: 32vw;
  height: 85vh;
  padding-left: 1em;
  background-color: white;
  //border: dotted 2px green;
  border-radius: 30px 20px 20px 30px;
  box-shadow: 10px 10px 30px #3c4a5645;
  border-right: #b1b0b0 solid 2px;
`;
const Right = styled.div`
  width: 32vw;
  height: 85vh;
  background-color: white;
  padding-left: 1em;
  //border: solid 2px black;
  border-radius: 20px 30px 30px 20px;
  box-shadow: 30px 10px 10px #3c4a5645;
  border-left: #b1b0b0 solid 2px;
`;
const Index = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  //border: solid 2px black;
`;
const TagHome = styled.img`
  width: 7rem;
  height: 4.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  //border: solid 2px black;
`;
const TagSignin = styled.img`
  width: 11rem;
  height: 4rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  //border: solid 2px black;
`;
const TagSignup = styled.img`
  width: 8rem;
  height: 5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  //border: solid 2px black;
`;

/// 세부사항

const Img = styled.img`
  width: 8em;
  height: 23em;
  position: relative;
  left: -15px;
  bottom: 10px;
`;
const LoginBox = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  //border: solid 2px red;
  box-sizing: border-box;
`;
const Title = styled.h1`
  //border: solid 2px teal;
  //background: linear-gradient(#e66465, #9198e5);
  //background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
`;
const Form = styled.form`
  //border: dotted 2px red;
  width: 30vw;
  height: 50vh;
  box-sizing: border-box;
  position: relative;
  top: 30px;
`;
const InputBox = styled.div<{ button?: any }>`
  // border: solid 2px aqua;
  height: 3.3rem;
  margin-top: ${(props) => (props.button ? '2.5rem' : '0')};
  box-sizing: border-box;
`;
const Message = styled.div`
  //border: solid 2px green;
  height: 1.7rem;
  box-sizing: border-box;
  font-size: 15px;
  text-align: left;
  padding-left: 6em;
  color: #ff0000bd;
`;
const Input = styled.input`
  width: 18rem;
  height: 3rem;
  border-radius: 30px;
  box-sizing: border-box;
  box-shadow: 0 4px 10px #3c4a5645;
  text-decoration: none;
  font-size: large;
  outline: none;
  padding: 0 1em;
  border: 0;
`;
const Button = styled.button`
  border: solid 2px green;
  width: 18rem;
  height: 3rem;
  border-radius: 30px;
  box-sizing: border-box;
  border: 0;
  box-shadow: 0 10px 25px #3c4a5645;
  text-decoration: none;
  font-size: large;
  background: linear-gradient(45deg, #fd40c8 10%, #a396f8 60%);
  cursor: pointer;
  font-size: large;
  font-weight: bold;
  color: #4e4d4d;
  //transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
const ButtonKakao = styled.button`
  border: solid 2px green;
  width: 18rem;
  height: 3rem;
  border-radius: 30px;
  box-sizing: border-box;
  border: 0;
  box-shadow: 0 10px 25px #3c4a5645;
  text-decoration: none;
  font-size: large;
  font-weight: bold;
  color: #4e4d4d;
  background-color: #fdf772;
  cursor: pointer;
  //transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
const Div = styled.div`
  height: 1.8rem;
  width: 20rem;
  border-top: solid purple 1px;
  opacity: 0.3;
  font-size: 0.9rem;
  margin-top: 10px;
  padding-top: 2px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

function Login(props: any) {
  //console.log(props, 'props');
  const { userInfoToStore } = props;
  //axios.defaults.withCredentials = true;

  const inputEmail: any = useRef();
  const inputpassword: any = useRef();

  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [emailcheckMessage, setEmailCheckMessage] =
    useState('이메일을 입력해주세요');
  const [passwordMessage, setPasswordMessage] =
    useState('비밀번호를 입력해주세요');

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
      setPasswordMessage('영문 대소문자와 숫자 4-12자리로 입력해야합니다.');
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
            console.log(accessToken, loginMethod);
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
    <Wrapper>
      <Book>
        <Left>
          <Img src={pickshareLogo} />
        </Left>
        <Right>
          <LoginBox>
            <Title>Log in to your account</Title>
            <Form>
              <InputBox>
                <Input
                  type="text"
                  ref={inputEmail}
                  name="email"
                  placeholder="이메일"
                  onChange={emailValidation}
                />
              </InputBox>
              <Message>{emailcheckMessage}</Message>
              <InputBox>
                <Input
                  type="current-password"
                  ref={inputpassword}
                  name="password"
                  placeholder="비밀번호"
                  onChange={passwordValidation}
                />
              </InputBox>
              <Message>{passwordMessage}</Message>
              <InputBox button>
                <Button onClick={Login}>SignIn</Button>
                <Box>
                  <Div>SNS 계정으로 편하게 시작하기</Div>
                </Box>
              </InputBox>
              <InputBox button>
                <ButtonKakao>kakao</ButtonKakao>
              </InputBox>
            </Form>
          </LoginBox>
        </Right>
        <Index>
          <TagHome src={homeIndex}></TagHome>
          <TagSignin src={signinIndex}></TagSignin>
          <TagSignup src={signupIndex}></TagSignup>
        </Index>
      </Book>
    </Wrapper>
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
