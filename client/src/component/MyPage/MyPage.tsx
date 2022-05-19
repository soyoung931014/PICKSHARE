/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { addUserInfo } from '../../redux/actions/index';
// import userApi from '../../../api/user';
import styled from 'styled-components';
import background from '../../img/diaryBackground.png';
import homeIndex from '../../img/homeIndex.png';
import signupIndex from '../../img/signupIndex.png';
import signinIndex from '../../img/signinIndex.png';
import edit from '../../img/edit.jpg';
import nothing from '../../img/profileImg.png';
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
  justify-content: center;
  align-items: center;
  width: 32vw;
  height: 85vh;
  padding-left: 1em;
  background-color: white;
  border: dotted 2px green;
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
  border: solid green 2px;
  box-sizing: border-box;
  width: 15vw;
  height: 28vh;

  border-radius: 100%;
`;
const UpdateProfileBox = styled.div`
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
const Form = styled.form<{ Left?: any }>`
  border: dotted 2px red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.Left ? 'center' : null)};
  width: 30vw;
  height: ${(props) => (props.Left ? '60vh' : '50vh')};
  box-sizing: border-box;
`;
const InputBox = styled.div<{ button?: any }>`
  border: solid 2px aqua;
  //width: 10rem;
  height: 3.3rem;
  margin-top: ${(props) => (props.button ? '2rem' : '0')};
  box-sizing: border-box;
`;
const Message = styled.div<{ UpdateProfile?: any }>`
  border: solid 2px green;
  height: 1.7rem;
  padding-top: 3px;
  box-sizing: border-box;
  font-size: 15px;
  text-align: left;
  opacity: 0.5;
  margin-top: ${(props) => (props.UpdateProfile ? '1rem' : '0')};
  margin-bottom: ${(props) => (props.UpdateProfile ? '0.2rem' : '0')};
  position: relative;
  right: 15px;
`;
const Input = styled.input<{ Check?: any }>`
  height: 3rem;
  width: ${(props) => (props.Check ? '65%' : '77%')};
  //width: 20rem;
  border-radius: 30px;
  box-sizing: border-box;
  box-shadow: 0 3px 5px #3c4a5645;
  text-decoration: none;
  font-size: large;
  outline: none;
  padding: 0 1em;
  border: 0;
  opacity: 0.6;
  font-weight: bolder;
`;
const Button = styled.button<{ MyPageButton?: any }>`
  border: solid 2px green;
  width: 20rem;
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
  margin-top: ${(props) => (props.MyPageButton ? '1rem' : '0')};
`;

const CheckButton = styled.button`
  background: linear-gradient(to right, #a396f8, #d06be0, #fd40c8);
  //width: 4rem;
  box-shadow: 0 5px 14px #3c4a5645;
  box-sizing: border-box;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px dotted black;
  width: 20rem;
  height: 50%;
  /* height: 2rem;
  border-top: solid purple 1px;
  opacity: 0.3;
  font-size: 0.9rem;
  margin-top: 0.7rem;
  padding: 0.7rem 0rem; */
  //border: solid 2px green;
`;

const Box = styled.div`
  border: red solid 2px;
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
const Profile = styled.div`
  //border: solid 2px #ffc7c7;
  width: 19vw;
  height: 28vh;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;
const Edit = styled.img`
  //border: solid green 2px;
  width: 6rem;
  height: 5rem;
  position: relative;
  bottom: 5.5rem;
  left: 3rem;
  border-radius: 100%;
  margin: 0;
  padding: 0;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

function MyPage(props: any | boolean) {
  const navigate = useNavigate();
  const inputNickname: any = useRef();
  const statusmessage: any = useRef();

  const { userInfoToStore } = props;
  //console.log(userInfoToStore);
  const { isLogin, accessToken } = props.user;
  const { email, loginMethod, nickname, statusMessage, userImage } =
    props.user.userInfo;
  const [updateProfile, setUpdateProfile] = useState(false);
  const [withdraw, setWithdraw] = useState(false);

  // 👉 프로필 수정 파트
  const [nicknamecheckMessage, setNicknameCheckMessage] = useState('');
  const [nicknameValidate, setNicknameValidate] = useState(false);
  const [nicknameState, setNicknameState] = useState(false);

  // 수정할 유저정보
  const [updateUserInfo, setUpdateUserInfo] = useState({
    email,
    nickname,
    statusMessage,
    userImage,
  });

  const updateInfo = (e: any) => {
    setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value });
  };

  const hadleNicknameValidation = (e: any) => {
    updateInfo(e);

    if (e.target.value.length === 1 || e.target.value.length > 20) {
      setNicknameCheckMessage('닉네임은 2~20자 이내입니다.');
      setNicknameValidate(false); // 닉네임유효성 결과 통과
      /* console.log(nicknameValidate);
      console.log(nicknameState); //중복 검사 여부 */
    } else {
      setNicknameCheckMessage('');
      setNicknameValidate(true);
      //setNicknameState(true);
      /*  console.log(nicknameValidate);
      console.log(nicknameState); */
    }
  };
  const [nicknamecheck, setNicknameCheck] = useState(nickname);
  //닉네임 중복검사
  const nicknameCheck = async (e: any) => {
    console.log(nicknameState); //중복 검사 여부
    e.preventDefault();
    const { nickname } = updateUserInfo;
    //  console.log(nickname);
    if (nicknameValidate === true && inputNickname.current.value !== '') {
      try {
        await axios
          .get(`http://localhost:5000/user/nicknamecheck/${nickname}`)
          .then((res) => {
            if (res.data === false) {
              console.log(res.data, '중복 검사 통과');
              //닉네임 사용여부를 boolean값으로 가져옴 false일경우 사용 가능 닉넴
              setNicknameCheckMessage('사용할 수 있는 닉네임입니다.');
              setNicknameCheck(nickname); // 나중에 수정완료 버튼을 누를 시  e.target.value과 nicknamecheck의 정보가 일치하는지를 확인
              setNicknameState(true);
            } else {
              setNicknameCheckMessage('이미 사용중인 닉네임입니다');
            }
          });
      } catch (error) {
        console.log('error');
      }
    } else {
      alert('닉네임 조건을 충족시켜주세요');
    }
  };

  // 수정완료
  const updateFinish = async (e: any) => {
    e.preventDefault();
    const { email, nickname, statusMessage, userImage } = updateUserInfo;
    // console.log(email, nickname, statusMessage, nicknamecheck, '🙋‍♀️');
    if (inputNickname.current.value === '') {
      updateUserInfo.nickname = inputNickname.current.placeholder;
      console.log(nickname, 'nickname');
    }
    if (nickname !== nicknamecheck && inputNickname.current.value !== '') {
      console.log(nickname, nicknamecheck);
      alert('중복검사를 시행해주세요');
      return;
    } else {
      try {
        await axios
          .patch('http://localhost:5000/mypage/update', updateUserInfo, {
            headers: { authorization: `Bearer ${accessToken}` },
          })
          .then((res) => {
            const {
              id,
              email,
              loginMethod,
              nickname,
              statusMessage,
              userImage,
            } = res.data.data;

            void userInfoToStore(
              { id, email, loginMethod, nickname, statusMessage, userImage },
              accessToken
            );
            alert('수정이 완료되었습니다.');
            setUpdateProfile(!updateProfile);
            setUpdateProfile(true);
            setNicknameCheckMessage('');
          });
      } catch (error) {
        console.log('error');
      }
    }
  };

  // 👉 탈퇴하기
  const inputPassword: any = useRef();
  const inputPasswordCheck: any = useRef();
  const [passwordValue, setPasswordValue] = useState({
    password: '',
    passwordCheck: '',
  });

  const handlePassword = (e: any) => {
    setPasswordValue({ ...passwordValue, [e.target.name]: e.target.value });
    // console.log(passwordValue);
  };

  const withdrawl = async (e: any) => {
    e.preventDefault();
    const { password, passwordCheck } = passwordValue;
    if (password !== passwordCheck || password === '') {
      alert('비밀번호를 확인해주세요');
      return;
    } else {
      try {
        if (
          !window.confirm(
            '정말 탈퇴하시겠습니까? 탈퇴한 계정의 데이터는 복구가 불가합니다.'
          )
        ) {
          return;
        } else {
          await axios
            .delete('http://localhost:5000/mypage/withdrawl', {
              data: { password: passwordCheck },
              headers: { authorization: `Bearer ${accessToken}` },
            })
            .then((res) => {
              if (res.data.statusCode === 200) {
                console.log('탈퇴성공');
                navigate('/login', { replace: true });
              } else {
                console.log('탈퇴실패');
                alert('탈퇴에 실패했습니다. 비밀번호를 확인해주세요');
              }
            });
        }
      } catch (error) {
        console.log('server error');
      }
    }
  };

  return (
    <>
      {!isLogin ? (
        <> alert('로그인을 해주세요')</>
      ) : (
        <Wrapper>
          <Book>
            <Left>
              {updateProfile === true && withdraw === false ? (
                <>
                  <Form Left>
                    <Div>
                      <Profile>
                        {userImage === 'nothing' ? (
                          <>
                            <Img src={nothing} />
                          </>
                        ) : (
                          <>
                            <Img src={userImage} />
                          </>
                        )}
                      </Profile>
                      <Edit src={edit} />
                    </Div>
                    <Input
                      type="text"
                      ref={statusmessage}
                      name="statusMessage"
                      placeholder={statusMessage}
                      onChange={updateInfo}
                    />
                  </Form>
                </>
              ) : (
                <>
                  <Form Left>
                    <Div>
                      <Profile>
                        {userImage === 'nothing' ? (
                          <>
                            <Img src={nothing} />
                          </>
                        ) : (
                          <>
                            <Img src={userImage} />
                          </>
                        )}
                      </Profile>
                    </Div>
                    {statusMessage}
                  </Form>
                </>
              )}
            </Left>
            <Right>
              <UpdateProfileBox>
                {updateProfile === true && withdraw === false ? (
                  <>
                    <Title>프로필 수정</Title>
                    <Form>
                      <BoxMessage>
                        <Message UpdateProfile>이메일</Message>
                      </BoxMessage>
                      <InputBox>
                        <Box>
                          <Input
                            ref={inputNickname}
                            value={email}
                            disabled
                            style={{ color: '#04A1A1', fontWeight: 'bolder' }}
                          />
                        </Box>
                      </InputBox>
                      <BoxMessage>
                        <Message UpdateProfile>닉네임</Message>
                      </BoxMessage>
                      <InputBox>
                        <Box>
                          <Input
                            Check
                            type="text"
                            ref={inputNickname}
                            name="nickname"
                            placeholder={nickname}
                            onChange={hadleNicknameValidation}
                          />
                          <CheckButton onClick={nicknameCheck}>
                            중복검사
                          </CheckButton>
                        </Box>
                        <div>{nicknamecheckMessage}</div>
                      </InputBox>
                      <InputBox button>
                        <Box>
                          <Button
                            onClick={() => {
                              setUpdateProfile(!updateProfile);
                              setNicknameCheckMessage('');
                              setNicknameCheck('');
                            }}
                          >
                            취소
                          </Button>
                          <Button onClick={updateFinish}>수정완료</Button>
                        </Box>
                      </InputBox>
                    </Form>
                  </>
                ) : updateProfile === false && withdraw === true ? (
                  <>
                    <Title>회원탈퇴 </Title>
                    <Form>
                      <BoxMessage>
                        <Message UpdateProfile>비밀번호</Message>
                      </BoxMessage>
                      <InputBox>
                        <Box>
                          <Input
                            ref={inputPassword}
                            name="password"
                            type="text"
                            onChange={handlePassword}
                          />
                        </Box>
                      </InputBox>
                      <BoxMessage>
                        <Message UpdateProfile>비밀번호 확인</Message>
                      </BoxMessage>
                      <InputBox>
                        <Box>
                          <Input
                            ref={inputPasswordCheck}
                            type="text"
                            name="passwordCheck"
                            onChange={handlePassword}
                          />
                        </Box>
                      </InputBox>
                      <InputBox button>
                        <Box>
                          <Button onClick={withdrawl}>탈퇴하기</Button>
                          <Button
                            MyPageButton
                            onClick={() => {
                              setWithdraw(!withdraw);
                              console.log(updateProfile);
                            }}
                          >
                            되돌아가기
                          </Button>
                        </Box>
                      </InputBox>
                    </Form>
                  </>
                ) : (
                  <>
                    <Title>마이페이지</Title>
                    <Form>
                      <Box>
                        <Button
                          MyPageButton
                          onClick={() => {
                            setUpdateProfile(!updateProfile);
                          }}
                        >
                          프로필수정
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          MyPageButton
                          onClick={() => {
                            setWithdraw(!withdraw);
                          }}
                        >
                          탈퇴하기
                        </Button>
                      </Box>
                    </Form>
                  </>
                )}
              </UpdateProfileBox>
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

//redux로 상태관리
const mapStateToProps = (state: any) => {
  return {
    user: state.userInfo,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    userInfoToStore: (userInfo: object, token: string) => {
      dispatch(addUserInfo(userInfo, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
//610 새로고침시 로그인이 풀리는 문제 때문에 랜딩페이지(/)를 메인피드(/mainfeed)로 바꿈