/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import styled from 'styled-components';
import background from '../img/feedBG.jpg';
import camera from '../img/camera.jpg';

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
  //border: solid 2px red;
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
function ErrorLoadingPage(props: any) {
  return (
    <>
      <Wrapper>
        {props.text ? (
          <>
            (<Pickshare>{props.text}</Pickshare>
            <LoadingBox>
              <Img src={camera} />
            </LoadingBox>
            )
          </>
        ) : (
          <Pickshare>404Error</Pickshare>
        )}
      </Wrapper>
    </>
  );
}

export default ErrorLoadingPage;
