import React from 'react';
import styled from 'styled-components';
import background from '../img/diaryBackground.png';
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Pickshare = styled.div`
  justify-content: center;
  text-align: center;
  font-size: 10rem;
  font-weight: bolder;
  background: linear-gradient(to right, #8272eb, #d06be0, #fd40c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
function ErrorPage() {
  return (
    <>
      <Wrapper>
        <Pickshare>404 Error</Pickshare>
      </Wrapper>
    </>
  );
}

export default ErrorPage;
