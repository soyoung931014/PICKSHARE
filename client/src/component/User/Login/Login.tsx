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
import { useNavigate } from 'react-router-dom';

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
  //border: solid 2px red;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
`;
const Title = styled.div`
  //border: solid 2px teal;
  font-size: 2rem;
  font-weight: 900;
  margin-top: 2.5rem;
  background: linear-gradient(to right, #a396f8, #d06be0, #fd40c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Form = styled.form`
  //border: dotted 2px red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30vw;
  height: 50vh;
  box-sizing: border-box;
`;
const InputBox = styled.div<{ button?: any }>`
  //border: solid 2px aqua;
  //width: 10rem;
  height: 3.3rem;
  margin-top: ${(props) => (props.button ? '2rem' : '0')};
  box-sizing: border-box;
`;
const Message = styled.div`
  //border: solid 2px green;
  height: 1.7rem;
  padding-top: 3px;
  box-sizing: border-box;
  font-size: 15px;
  text-align: left;
  color: #ff8686;
`;
const Input = styled.input`
  height: 3rem;
  width: 18rem;
  border-radius: 30px;
  box-sizing: border-box;
  box-shadow: 0 3px 5px #3c4a5645;
  text-decoration: none;
  font-size: large;
  outline: none;
  padding: 0 1em;
  border: 0;
  opacity: 0.6;
`;
const Button = styled.button`
  //border: solid 2px green;
  width: 18rem;
  height: 3rem;
  border-radius: 30px;
  box-sizing: border-box;
  border: 0;
  box-shadow: 0 5px 14px #3c4a5645;
  text-decoration: none;
  font-size: large;
  background: linear-gradient(to right, #a396f8, #d06be0, #fd40c8);
  cursor: pointer;
  font-size: large;
  font-weight: bold;
  color: white;
`;
const ButtonKakao = styled.button`
  //border: solid 2px green;
  width: 18rem;
  height: 3rem;
  border-radius: 30px;
  box-sizing: border-box;
  border: 0;
  box-shadow: 0 5px 14px #3c4a5645;
  text-decoration: none;
  font-size: large;
  font-weight: bold;
  color: #4e4d4d;
  background-color: #fdf772;
  cursor: pointer;
  margin-top: 0.7rem;
`;
const Div = styled.div`
  height: 2rem;
  width: 20rem;
  border-top: solid purple 1px;
  opacity: 0.3;
  font-size: 0.9rem;
  margin-top: 0.7rem;
  padding: 0.7rem 0rem;
  //border: solid 2px green;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;
const BoxMessage = styled.div`
  display: flex;
  margin-left: 5.3rem;
  text-align: center;
  padding-right: 7rem;
`;

function Login(props: any) {
  const navigate = useNavigate();
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
            const { accessToken, loginMethod } = res.data.data; //refreshToken
            console.log(accessToken, loginMethod);
            if (accessToken) {
              setToken(accessToken); // token state에 보관
              void tokenVerification(accessToken);
              //void tokenVerification();
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
  const tokenVerification = async (token: string) => {
    try {
      await axios
        .get(`http://localhost:5000/token`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { userInfo } = res.data.data;
          console.log(userInfo);
          if (userInfo) {
            userInfoToStore(userInfo, token);
            navigate('/mypage', { replace: true });
          } else {
            console.log('로그인 실패');
          }
        });
    } catch (error) {
      console.log('error');
    }
  };
  const taghome = () => {
    console.log('hihi');
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
                <Box>
                  <Input
                    type="text"
                    ref={inputEmail}
                    name="email"
                    placeholder="이메일"
                    onChange={emailValidation}
                  />
                </Box>
              </InputBox>
              <BoxMessage>
                <Message>{emailcheckMessage}</Message>
              </BoxMessage>
              <InputBox>
                <Box>
                  <Input
                    type="current-password"
                    ref={inputpassword}
                    name="password"
                    placeholder="비밀번호"
                    onChange={passwordValidation}
                  />
                </Box>
              </InputBox>
              <BoxMessage>
                <Message>{passwordMessage}</Message>
              </BoxMessage>
              <InputBox button>
                <Box>
                  <Button onClick={Login}>SignIn</Button>
                </Box>
                <Box>
                  <Div>SNS 계정으로 편하게 시작하기</Div>
                </Box>
              </InputBox>
              <InputBox button>
                <Box>
                  <ButtonKakao>kakao</ButtonKakao>
                </Box>
              </InputBox>
            </Form>
          </LoginBox>
        </Right>
        <Index>
          <TagHome
            src={homeIndex}
            onClick={() => {
              navigate('/mainfeed', { replace: true });
            }}
          ></TagHome>
          <TagSignin
            src={signinIndex}
            onClick={() => {
              navigate('/login', { replace: true });
            }}
          ></TagSignin>
          <TagSignup
            src={signupIndex}
            onClick={() => {
              navigate('/signup', { replace: true });
            }}
          ></TagSignup>
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
    userInfoToStore: (userInfo: object, token: string) => {
      dispatch(addUserInfo(userInfo, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//382 새로고침시 로그인이 풀리는 문제 때문에 랜딩페이지(/)를 메인피드(/mainfeed)로 바꿈