import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  width: 10vw;
`;
const SubTags = styled.div`
  display: flex;
  justify-content: center;
  height: 3.2rem;
  box-shadow: 15px 10px 15px #3c4a5645;

  @media screen and (min-width: 892px) {
    display: none;
  }
`;
const SubTagHome = styled.div`
  width: 30vw;
  height: 3.2rem;
  padding-top: 15px;
  font-size: 1.5rem;
  text-align: center;
  background-color: #f5ffbb;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
const SubTagSignin = styled.div`
  width: 30vw;
  height: 3.2rem;
  padding-top: 15px;
  font-size: 1.5rem;
  text-align: center;
  background-color: #eae1ff;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
const SubTagSignup = styled.div`
  width: 30vw;
  height: 3.2rem;
  padding-top: 15px;
  font-size: 1.5rem;
  text-align: center;

  background-color: #ffc7c7;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
function SubIndex() {
  const navigate = useNavigate();
  return (
    <>
      <Div />
      <SubTags>
        <SubTagHome
          onClick={() => {
            navigate('/mainfeed', { replace: true });
          }}
        >
          home
        </SubTagHome>
        <SubTagSignin
          onClick={() => {
            navigate('/login', { replace: true });
          }}
        >
          signin
        </SubTagSignin>
        <SubTagSignup
          onClick={() => {
            navigate('/signup', { replace: true });
          }}
        >
          signup
        </SubTagSignup>
      </SubTags>
    </>
  );
}

export default SubIndex;
