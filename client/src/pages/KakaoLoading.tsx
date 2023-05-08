import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { addUserInfo } from '../redux/actions';
import { useDispatch } from 'react-redux';

import loginApi from '../api/login';

import styled from 'styled-components';
import background from '../img/feedBG.jpg';

import { IKakaoData } from '../types/user';

function kakaoLoading() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      void loginApi.kakao().then(({ data }: IKakaoData) => {
        const {
          accessToken,
          data: { nickname, ...rest },
        } = data;
        void dispatch(addUserInfo({ nickname, ...rest }, accessToken));
        if (nickname === '') {
          alert('닉네임을 설정해주세요');
          return navigate('/mypage', { replace: true });
        }
        navigate('/mainfeed', { replace: true });
      });
    }, 3000);
  }, []);

  return (
    <>
      <Wrapper>
        <Pickshare>Loading..</Pickshare>
        <LoadingBox>
          <Img src={process.env.PUBLIC_URL + 'favicon.ico'} />
        </LoadingBox>
      </Wrapper>
    </>
  );
}

export default kakaoLoading;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Pickshare = styled.div`
  justify-content: center;
  text-align: center;
  font-size: 5rem;
  font-weight: bolder;
  background: linear-gradient(to right, #8272eb, #d06be0, #fd40c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text 1s infinite linear alternate;
  @keyframes text {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Img = styled.img`
  width: 11%;
  height: 3.7vh;
  animation: camera 1.6s infinite linear alternate;
  @keyframes camera {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateX(30deg) translateX(22vw);
    }
  }
`;
const LoadingBox = styled.div`
  border: solid #ffff 2px;
  border-radius: 20px;
  width: 26%;
  height: 4.5vh;
`;
