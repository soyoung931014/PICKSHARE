/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { connect, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiHome } from 'react-icons/bi';

import defaultprofileImg from '../../img/profileImg.png';
import { deleteUserInfo } from '../../redux/actions';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
//const AWS = require('aws-sdk/dist/aws-sdk-react-native');

const Wrapper = styled.section`
  // border: solid green 2px;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: white;
  border-bottom: solid 0.8px #bbbbbb;
  margin-bottom: 1rem;
  box-shadow: 0 0px 10px #acafb345;
`;

const Logo = styled.section`
  //border: solid red 2px;
  margin-left: 1.7rem;
  font-weight: 900;
  width: 70%;
  height: 2rem;
  background: linear-gradient(to right, #ee64c7, #8272eb, #d06be0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  :hover {
    cursor: pointer;
  }
`;

const MenuFabar = styled.a`
  //border: solid 2px green;
  display: none;
  @media screen and (max-width: 977px) {
    display: block;
    width: 100%;
    text-align: end;
    margin: 0.7rem;
    font-size: 1rem;
    padding: 0.6rem;
    margin-right: 1.7rem;
    :hover {
      cursor: pointer;
    }
  }
`;
const NavList = styled.section<{ Menu?: any; InitialNav?: any }>`
  // border: solid blue 2px;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  //margin-right: 1.5rem;
  @media screen and (max-width: 977px) {
    width: ${(props) => (props.InitialNav ? '11vw' : '25vw')};
    height: ${(props) => (props.InitialNav ? '29vh' : '45vh')};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fffceb;
    border-radius: 5%;
    margin-top: ${(props) => (props.InitialNav ? '34vh' : '44.4vh')};
    position: absolute;
    top: -240px;
    padding-right: 5%;
    transform: ${({ Menu }) => {
      return Menu ? 'translatex(25%)' : 'translateX(100%)';
    }};
    //  transition: transform 1s ease-in-out;
  }
  @media screen and (max-width: 710px) {
    width: ${(props) => (props.InitialNav ? '14vw' : '29vw')};
  }
  @media screen and (max-width: 607px) {
    width: ${(props) => (props.InitialNav ? '14vw' : '25vw')};
  }
  @media screen and (max-width: 523px) {
    width: ${(props) => (props.InitialNav ? '14vw' : '40vw')};
  }
`;
const Div = styled.div<{ Text?: any }>`
  //border: solid blue 2px;
  margin: 0.7rem;
  font-size: 1rem;
  font-weight: bolder;
  padding: 0.6rem;
  padding-top: ${(props) => (props.Text ? '1rem' : null)};
  padding-bottom: ${(props) => (props.Text ? '1rem' : null)};
  :hover {
    cursor: pointer;
    background: #fee9f7;
    border-radius: 10px;
  }
`;

const Img = styled.img`
  border: solid gray 1px;
  height: 3.5vh;
  width: 2vw;
  border-radius: 50%;
  margin-right: 0.5rem;
  @media screen and (max-width: 977px) {
    width: 3.2vw;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = (props: any) => {
  const { isLogin, userInfo } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);

  // AWS.config.update({
  //   region: `${process.env.REACT_APP_AWS_REGION}`, // congito IdentityPoolId 리전을 문자열로 입력하기. 아래 확인 (Ex. "ap-northeast-2")
  //   credentials: new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId: `${process.env.REACT_APP_AWS_IMG_ID}`, // cognito 인증 풀에서 받아온 키를 문자열로 입력하기. (Ex. "ap-northeast-2...")
  //   }),
  // });

  return (
    <>
      <Wrapper>
        <Logo onClick={() => navigate('/mainfeed')}>PICKSHARE</Logo>

        {isLogin === true ? (
          <>
            <NavList Menu={menu}>
              <Div>
                <NavLink
                  to="/mainfeed"
                  style={{
                    textDecoration: 'none',
                    color: '#3d3c3c',
                    fontSize: '1.7rem',
                  }}
                >
                  <BiHome />
                </NavLink>
              </Div>
              <Div>
                <Info>
                  <div>
                    {userInfo.userImage === 'nothing' ? (
                      <Img src={defaultprofileImg} />
                    ) : (
                      <Img src={userInfo.userImage} />
                    )}
                  </div>
                  <NavLink
                    to={`/feed/${userInfo.nickname}`}
                    style={{
                      textDecoration: 'none',
                      color: '#3d3c3c',
                    }}
                  >
                    피드
                  </NavLink>
                </Info>
              </Div>
              <Div Text>
                <NavLink
                  to="/mypage"
                  style={{
                    textDecoration: 'none',
                    color: '#3d3c3c',
                  }}
                >
                  회원정보
                </NavLink>
              </Div>
              <Div Text>
                <NavLink
                  onClick={() => props.userInfoToStore()}
                  to="/mainfeed"
                  style={{
                    textDecoration: 'none',
                    color: '#3d3c3c',
                  }}
                >
                  로그아웃
                </NavLink>
              </Div>
            </NavList>
          </>
        ) : (
          <>
            <NavList Menu={menu} InitialNav>
              <Div>
                <NavLink
                  to="/mainfeed"
                  style={{
                    textDecoration: 'none',
                    color: '#3d3c3c',
                    fontSize: '1.7rem',
                  }}
                >
                  <BiHome />
                </NavLink>
              </Div>
              <Div Text>
                <NavLink
                  to="/login"
                  style={{ textDecoration: 'none', color: '#3d3c3c' }}
                >
                  로그인
                </NavLink>
              </Div>
              <Div Text>
                <NavLink
                  to="/signup"
                  style={{ textDecoration: 'none', color: '#3d3c3c' }}
                >
                  회원가입
                </NavLink>
              </Div>
            </NavList>
          </>
        )}
        <MenuFabar href="#" onClick={() => setMenu(!menu)}>
          <FaBars
            style={{
              fontWeight: 'bolder',
              fontSize: '3.7vh',
              color: '#3d3c3c',
            }}
          />
        </MenuFabar>
      </Wrapper>
    </>
  );
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    userInfoToStore: () => {
      dispatch(deleteUserInfo());
    },
  };
};
export default connect(null, mapDispatchToProps)(Nav);
