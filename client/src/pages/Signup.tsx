/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import background from '../img/feedBG.jpg';
import pickshareLogo from '../img/pickshare.png';
import signupApi from '../api/signup';
import ErrorLoadingPage from './ErrorLoadingPage';
import Index from '../component/Index/Index';
import SubIndex from '../component/Index/SubIndex';
import { emailRegExp, passwordRegExp } from '../common/validation';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
`;
const Book = styled.div`
  height: 100vh;
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1em;
  position: relative;
  left: 8rem;
  @media screen and (max-width: 891px) {
    width: 100vw;
    position: none;
    left: 0rem;
    padding-left: 0em;
  }
`;
const Left = styled.div`
  display: flex;
  align-items: flex-end;
  width: 32rem;
  height: 85vh;
  padding-left: 1em;
  background-color: white;
  border-radius: 30px 20px 20px 30px;
  box-shadow: 10px 10px 30px #3c4a5645;
  border-right: #b1b0b0 solid 2px;
  @media screen and (max-width: 1272px) {
    display: none;
  }
`;

const Right = styled.div`
  width: 32rem;
  height: 85vh;
  background-color: white;
  padding-left: 1em;
  border-radius: 20px 30px 30px 20px;
  box-shadow: 30px 10px 10px #3c4a5645;
  border-left: #b1b0b0 solid 2px;
  @media screen and (max-width: 1190px) {
    width: 32rem;
  }
  @media screen and (max-width: 891px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0px;
    padding-left: 0em;
  }
`;

/// ????????????

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
  box-sizing: border-box;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: 900;
  margin-top: 2.5rem;
  background: linear-gradient(to right, #a396f8, #d06be0, #fd40c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 359px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 323px) {
    font-size: 1.7rem;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45vw;
  height: 50vh;
  box-sizing: border-box;
  @media screen and (max-width: 891px) {
    width: 60vw;
  }
  @media screen and (max-width: 513px) {
    width: 100vw;
  }
`;
const InputBox = styled.div<{ button?: any }>`
  height: 3.4rem;
  margin-top: ${(props) => (props.button ? '0' : '0')};
  box-sizing: border-box;
`;
const Message = styled.div<{ PasswordCheck?: any }>`
  width: 100vw;
  height: 1.7rem;
  padding-top: 3px;
  box-sizing: border-box;
  font-size: 15px;
  text-align: flex-start;
  color: #ff8686;
  @media screen and (max-width: 1194px) {
    font-size: ${(props) => (props.PasswordCheck ? '14px' : '15px')};
  }
`;
const Input = styled.input<{ Password?: any }>`
  height: 3rem;
  width: ${(props) => (props.Password ? '17rem' : '12rem')};
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
  width: 17rem;
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
  width: 4.2rem;
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
  width: 17rem;
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
  margin: 3px 0;
  display: flex;
  justify-content: center;
  text-align: center;
`;
const BoxMessage = styled.div`
  display: flex;
  margin-left: 5.3rem;
  padding-right: 7rem;
  width: 50vw;
  margin-left: 12rem;
  padding-left: 100px;

  @media screen and (max-width: 1750px) {
    margin-left: 10rem;
  }

  @media screen and (max-width: 1670px) {
    margin-left: 8.4rem;
  }
  @media screen and (max-width: 1545px) {
    margin-left: 7rem;
  }
  @media screen and (max-width: 1400px) {
    margin-left: 6rem;
  }
  @media screen and (max-width: 1330px) {
    margin-left: 5rem;
  }
  @media screen and (max-width: 1240px) {
    margin-left: 3.5rem;
  }
  @media screen and (max-width: 1160px) {
    margin-left: 3rem;
  }
  @media screen and (max-width: 1091px) {
    margin-left: 2rem;
  }
  @media screen and (max-width: 959px) {
    margin-left: 0.5rem;
    width: 80vw;
  }
  @media screen and (max-width: 924px) {
    margin-left: 0;
    width: 80vw;
  }
  @media screen and (max-width: 891px) {
    margin-left: 2rem;
  }
  @media screen and (max-width: 800px) {
    margin-left: 1rem;
    width: 70vw;
  }

  @media screen and (max-width: 710px) {
    margin-left: 0rem;
    padding-left: 90px;
  }
  @media screen and (max-width: 620px) {
    padding-left: 60px;
  }
  @media screen and (max-width: 530px) {
    padding-left: 30px;
  }
  @media screen and (max-width: 515px) {
    padding-left: 8rem;
    width: 100vw;
  }
  @media screen and (max-width: 449px) {
    padding-left: 6rem;
  }
  @media screen and (max-width: 380px) {
    padding-left: 3rem;
  }
`;

function Signup() {
  const navigate = useNavigate();
  const inputEmail: any = useRef();
  const inputNickname: any = useRef();
  const inputPassword: any = useRef();
  const inputPasswordCheck: any = useRef();
  //????????? ????????????
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordcheck: '',
  });

  const [loading, setLoading] = useState(false);
  //?????????,????????? ????????????(signupInfo.email??? ?????? ????????? ??????????????????)
  const [emailcheck, setEmailCheck] = useState('');
  const [nicknamecheck, setNicknameCheck] = useState('');
  //?????????, ?????????, ???????????? ????????? ?????? ?????????
  const [emailcheckMessage, setEmailCheckMessage] = useState('');
  const [nicknamecheckMessage, setNicknameCheckMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  // ????????? ???????????? ???????????? ??????
  const [nicknamevalidation, setNicknameValidation] = useState(false);

  const handleChangeState = (e: any) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleEmailValidation = (e: any) => {
    handleChangeState(e);
    if (emailRegExp.test(e.target.value) === false) {
      setEmailCheckMessage('????????? ????????? ???????????? ??????????????????.');
    } else {
      setEmailCheckMessage('?????? ????????? ??? ??? ????????????.');
    }
  };

  //????????? ????????????
  const emailCheck = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    e.preventDefault();
    const { email } = signupInfo;
    if (email === '') {
      setEmailCheckMessage('???????????? ???????????????');
      inputEmail.current.focus();
      return;
    }
    if (emailRegExp.test(email) === true) {
      try {
        await signupApi.emailcheck(email).then((res) => {
          if (res.data === false) {
            setEmailCheckMessage('????????? ??? ?????? ??????????????????.');
            setEmailCheck(email);
          } else {
            setEmailCheckMessage('?????? ???????????? ??????????????????.');
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ????????? ???????????????
  const handleNicknameValidation = (e: any) => {
    handleChangeState(e);

    if (e.target.value.length >= 2 && e.target.value.length < 21) {
      setNicknameCheckMessage('?????? ????????? ??? ??? ????????????.');
      setNicknameValidation(true);
    }
    if (e.target.value.length < 2 || e.target.value.length > 20) {
      setNicknameCheckMessage('???????????? 2~20??? ???????????????.');
      setNicknameValidation(false);
    }
  };

  //????????? ????????????
  const nicknameCheck = async (e: any) => {
    const { nickname } = signupInfo;

    e.preventDefault();
    if (nickname === '') {
      setNicknameCheckMessage('???????????? ???????????????.');
      inputNickname.current.focus();
      return;
    }
    if (nicknamevalidation === true) {
      try {
        await signupApi.nicknamecheck(nickname).then((res) => {
          if (res.data === false) {
            setNicknameCheckMessage('????????? ??? ?????? ??????????????????.');
            setNicknameCheck(nickname); // ????????? ???????????? ????????? ?????? ???  signupInfo.nickname??? nicknamecheck??? ????????? ?????????????????? ??????
          } else {
            setNicknameCheckMessage('?????? ???????????? ??????????????????');
          }
        });
      } catch (error) {
        console.log('error');
      }
    }
  };
  // ???????????? ????????? ??????
  const passwordValidation = (e: any) => {
    handleChangeState(e);
    const { passwordcheck } = signupInfo;

    if (passwordRegExp.test(e.target.value) === false) {
      setPasswordMessage('?????? ??????????????? ?????? 4-12????????? ?????????????????????.');
    } else if (passwordcheck !== '' && passwordcheck !== e.target.value) {
      setPasswordMessage('??????????????? ???????????? ????????????.');
    } else if (passwordcheck === e.target.value) {
      setPasswordMessage('??????????????? ???????????????.');
    } else if (passwordRegExp.test(e.target.value) === true) {
      setPasswordMessage('????????? ??? ?????? ?????????????????????.');
    }
  };
  const passwordCheck = (e: any) => {
    handleChangeState(e);
    const { password } = signupInfo;
    if (password === '' && e.target.value === '') {
      setPasswordMessage('');
    } else if (e.target.value === '') {
      setPasswordMessage('???????????? ????????? ??????????????????');
    } else if (password !== e.target.value) {
      setPasswordMessage('??????????????? ???????????? ????????????.');
    } else if (passwordRegExp.test(e.target.value) === false) {
      setPasswordMessage(
        '??????????????? ?????? ??????????????? ?????? 4-12????????? ?????????????????????.'
      );
    } else {
      setPasswordMessage('??????????????? ???????????????.');
    }
  };

  // ??????????????????
  const signupcheck = async (e: any) => {
    e.preventDefault();
    const { email, nickname, password, passwordcheck } = signupInfo;
    if (
      email === '' ||
      nickname === '' ||
      password === '' ||
      passwordcheck === ''
    ) {
      alert('??????????????? ?????? ??????????????????');
      return;
    }
    if (email !== emailcheck) {
      alert('????????? ??????????????? ?????? ??????????????????');
      inputEmail.current.focus();
      return;
    }
    if (nickname !== nicknamecheck) {
      alert('????????? ??????????????? ?????? ??????????????????');
      inputNickname.current.focus();
      return;
    }
    if (!passwordRegExp.test(password) || password !== passwordcheck) {
      alert('??????????????? ????????????????????????');
      return;
    }
    const userInfo = { email, nickname, password };
    if (userInfo) {
      try {
        await signupApi.signup(userInfo).then((res) => {
          setLoading(!loading);
          setTimeout(() => {
            alert('??????????????? ?????????????????????. ???????????? ??????????????????');
            navigate('/login', { replace: true });
          }, 3000);
        });
      } catch (error) {
        alert('???????????? ??????! ?????? ????????????????????????');
        console.log(error);
      }
    }
  };

  const handleKakaoSignup = (e: any) => {
    e.preventDefault();
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CODE}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}&response_type=code&state=kakao`;
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
              <SubIndex />
              <LoginBox>
                <Title>Create a new Account</Title>
                <Form>
                  <InputBox>
                    <Box>
                      <Input
                        placeholder="?????????"
                        ref={inputEmail}
                        name="email"
                        value={signupInfo.email}
                        onChange={handleEmailValidation}
                      />
                      <TwinCheckButton onClick={emailCheck}>
                        ????????????
                      </TwinCheckButton>
                    </Box>
                  </InputBox>
                  <BoxMessage>
                    <Message>{emailcheckMessage}</Message>
                  </BoxMessage>
                  <InputBox>
                    <Box>
                      <Input
                        placeholder="?????????"
                        ref={inputNickname}
                        name="nickname"
                        onChange={handleNicknameValidation}
                      />
                      <TwinCheckButton onClick={nicknameCheck}>
                        ????????????
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
                        type="password"
                        placeholder="????????????"
                        ref={inputPassword}
                        name="password"
                        autoComplete="off"
                        onChange={passwordValidation}
                      />
                    </Box>
                  </InputBox>
                  <InputBox>
                    <Box>
                      <Input
                        Password
                        type="password"
                        placeholder="??????????????????"
                        ref={inputPasswordCheck}
                        name="passwordcheck"
                        value={signupInfo.passwordcheck}
                        autoComplete="off"
                        onChange={passwordCheck}
                      />
                    </Box>
                  </InputBox>
                  <BoxMessage>
                    <Message PasswordCheck>{passwordMessage}</Message>
                  </BoxMessage>
                  <InputBox button>
                    <Box>
                      <Button onClick={signupcheck}>????????????</Button>
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
            <Index />
          </Book>
        </Wrapper>
      )}
    </>
  );
}

export default Signup;
