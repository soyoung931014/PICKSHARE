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
import profileImg from '../../img/profileImg.png';

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
const Input = styled.input`
  height: 3rem;
  width: 20rem;
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

function MyPage(props: any) {
  const statusmessage: any = useRef();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [withdraw, setWithdraw] = useState(false);

  // 수정된 유저정보
  const [updateUserInfo, setUpdateUserInfo] = useState('');

  return (
    <Wrapper>
      <Book>
        <Left>
          {updateProfile === true && withdraw === false ? (
            <>
              <Form Left>
                <Div>
                  <Profile>
                    <Img src={profileImg} />
                  </Profile>
                  <Edit src={edit} />
                </Div>
                <Input
                  type="text"
                  ref={statusmessage}
                  name="statusMessage"
                  placeholder="상태메세지"
                />
              </Form>
            </>
          ) : (
            <>
              <Form Left>
                <Div>
                  <Profile>
                    <Img src={profileImg} />
                  </Profile>
                </Div>
                <Input
                  type="text"
                  ref={statusmessage}
                  name="statusMessage"
                  placeholder="상태메세지"
                />
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
                      <Input />
                    </Box>
                  </InputBox>
                  <BoxMessage>
                    <Message UpdateProfile>닉네임</Message>
                  </BoxMessage>
                  <InputBox>
                    <Box>
                      <Input />
                    </Box>
                  </InputBox>
                  <InputBox button>
                    <Box>
                      <Button>취소</Button>
                      <Button>수정완료</Button>
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
                      <Input />
                    </Box>
                  </InputBox>
                  <BoxMessage>
                    <Message UpdateProfile>비밀번호 확인</Message>
                  </BoxMessage>
                  <InputBox>
                    <Box>
                      <Input />
                    </Box>
                  </InputBox>
                  <InputBox button>
                    <Box>
                      <Button>탈퇴하기</Button>
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
                        console.log(updateProfile);
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
    userInfoToStore: (userInfo: object, token: string) => {
      dispatch(addUserInfo(userInfo, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
