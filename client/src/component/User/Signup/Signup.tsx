/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import background from '../../../img/feedBG.jpg';
import pickshareLogo from '../../../img/pickshare.png';
import homeIndex from '../../../img/homeIndex.png';
import signupIndex from '../../../img/signupIndex.png';
import signinIndex from '../../../img/signinIndex.png';
import signupApi from '../../../api/signup';
import ErrorLoadingPage from '../../../pages/ErrorLoadingPage';

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
  //border: solid 2px black;
  width: 8rem;
  height: 5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  position: relative;
  top: -10px;
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
  //border: dotted 3px blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30vw;
  height: 50vh;
  box-sizing: border-box;
`;
const InputBox = styled.div<{ button?: any }>`
  // border: solid 2px aqua;
  height: 3.4rem;
  margin-top: ${(props) => (props.button ? '0' : '0')};
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
const Input = styled.input<{ Password?: any }>`
  height: 3rem;
  width: ${(props) => (props.Password ? '72%' : '52%')};
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
  //border: solid 2px black;
  width: 72%;
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
  margin-top: 0.8rem;
`;

const TwinCheckButton = styled.button`
  width: 18%;
  height: 3rem;
  margin-left: 2%;
  border-radius: 5px;
  box-sizing: border-box;
  border: 0;
  box-shadow: 0 5px 14px #3c4a5645;
  text-decoration: none;
  font-size: large;
  background: linear-gradient(to right, #a396f8, #d06be0, #fd40c8);
  cursor: pointer;
  font-weight: bold;
  color: white;
`;
const ButtonKakao = styled.button`
  //border: solid 2px green;
  width: 72%;
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

const Box = styled.div`
  //border: red solid 2px;
  margin: 3px 0;
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

function Signup() {
  const { Kakao } = window as any;
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);
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

  //useEffect(() => {}, [emailcheck]);

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
  const emailCheck = async (e: any) => {
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
        await signupApi.emailcheck(email).then((res) => {
          console.log(res, 'res');
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
        console.log(error);
      }
    }
  };

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
        await signupApi.nicknamecheck(nickname).then((res) => {
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
        await signupApi.signup(userInfo).then((res) => {
          console.log(res);
          setLoading(!loading);
          setTimeout(() => {
            alert('회원가입이 완료되었습니다. 로그인을 시도해주세요');
            navigate('/login', { replace: true });
          }, 3000);
        });
      } catch (error) {
        alert('회원가입 실패! 다시 회원가입해주세요');
        console.log(error);
      }
    }
  };

  const handleKakaoSignup = (e: any) => {
    e.preventDefault();
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=be17a9e882217a14ba581b03ea87c38f&redirect_uri=http://localhost:3000/loading&response_type=code&state=kakao`;
    //navigate(window.location.href);
  };
  return (
    <>
      {loading ? (
        <ErrorLoadingPage text="loading" />
      ) : (
        <Wrapper>
          <Book>
            <Left>
              <Img src={pickshareLogo} />
            </Left>
            <Right>
              <LoginBox>
                <Title>Create a new Account</Title>
                <Form>
                  <InputBox>
                    <Box>
                      <Input
                        placeholder="이메일"
                        ref={inputEmail}
                        name="email"
                        value={signupInfo.email}
                        onChange={handleEmailValidation}
                      />
                      <TwinCheckButton onClick={emailCheck}>
                        중복검사
                      </TwinCheckButton>
                    </Box>
                  </InputBox>
                  <BoxMessage>
                    <Message>{emailcheckMessage}</Message>
                  </BoxMessage>
                  <InputBox>
                    <Box>
                      <Input
                        placeholder="닉네임"
                        ref={inputNickname}
                        name="nickname"
                        onChange={handleNicknameValidation}
                      />
                      <TwinCheckButton onClick={nicknameCheck}>
                        중복검사
                      </TwinCheckButton>
                    </Box>
                  </InputBox>
                  <BoxMessage>
                    <Message>{nicknamecheckMessage}</Message>
                  </BoxMessage>
                  <InputBox>
                    <Box>
                      <Input
                        Password
                        placeholder="비밀번호"
                        ref={inputPassword}
                        name="password"
                        type="new-password"
                        onChange={passwordValidation}
                      />
                    </Box>
                  </InputBox>
                  <InputBox>
                    <Box>
                      <Input
                        Password
                        placeholder="비밀번호확인"
                        ref={inputPasswordCheck}
                        name="passwordcheck"
                        type="new-password"
                        value={signupInfo.passwordcheck}
                        onChange={passwordCheck}
                      />
                    </Box>
                  </InputBox>
                  <BoxMessage>
                    <Message>{passwordMessage}</Message>
                  </BoxMessage>
                  <InputBox button>
                    <Box>
                      <Button onClick={signupcheck}>회원가입</Button>
                    </Box>
                  </InputBox>
                  <InputBox button>
                    <Box>
                      <ButtonKakao onClick={handleKakaoSignup}>
                        kakao
                      </ButtonKakao>
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
      )}
    </>
  );
}

export default Signup;
