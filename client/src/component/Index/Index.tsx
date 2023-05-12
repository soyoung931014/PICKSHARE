import React from 'react';
import styled from 'styled-components';
import homeIndex from '../../img/homeIndex.png';
import signupIndex from '../../img/signupIndex.png';
import signinIndex from '../../img/signinIndex.png';
import { useNavigate } from 'react-router-dom';

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
        src="https://profileimage-pickshare.s3.ap-northeast-2.amazonaws.com/signinIndex.png"
        onClick={() => {
          navigate('/login', { replace: true });
        }}
      ></TagSignin>
      <TagSignup
        src="https://profileimage-pickshare.s3.ap-northeast-2.amazonaws.com/signupIndex.png"
        onClick={() => {
          navigate('/signup', { replace: true });
        }}
      ></TagSignup>
    </BookMark>
  );
}

export default Index;
