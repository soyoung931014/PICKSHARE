import React from 'react';
import styled from 'styled-components';
import homeIndex from '../../img/homeIndex.png';
import { useNavigate } from 'react-router-dom';
import { signinIndex, signupIndex } from '../../img/Img';

const BookMark = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
`;
const TagHome = styled.img`
  width: 7rem;
  height: 4.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  @media screen and (max-width: 891px) {
    display: none;
  }
`;
const TagSignin = styled.img`
  width: 11rem;
  height: 4rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  @media screen and (max-width: 891px) {
    display: none;
  }
`;
const TagSignup = styled.img`
  width: 8rem;
  height: 5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  position: relative;
  top: -10px;
  @media screen and (max-width: 891px) {
    display: none;
  }
`;
function Index() {
  const navigate = useNavigate();
  return (
    <BookMark>
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
    </BookMark>
  );
}

export default Index;
