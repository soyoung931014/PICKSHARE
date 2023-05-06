/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import theme from '../../styles/theme';
import { BiHome } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import defaultprofileImg from '../../img/profileImg.png';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUserInfo } from '../../redux/actions';

import { RootState } from '../../redux';

const Wrapper = styled.section`
  height: 8vh;
  display: flex;
  justify-content: flex-end;
  padding-right: 0.8rem;
  align-items: center;
  background: white;
  border-bottom: solid 0.8px #bbbbbb;
  box-shadow: 0 0px 10px #acafb345;
`;

const Logo = styled.section`
  margin-left: 1rem;
  font-weight: 900;
  width: 70%;
  height: 2.6rem;
  background: linear-gradient(to right, #ee64c7, #8272eb, #d06be0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-top: 5px;
  :hover {
    cursor: pointer;
  }
`;

const MenuFabar = styled.a`
  display: none;
  @media ${({ theme: themeProps }) => theme.deviceSize.tablet} {
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
const NavList = styled.section<{
  Menu?: boolean;
  InitialNav?: boolean;
}>`
  display: ${(props) => (props.Menu ? 'block' : 'none')};
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  @media ${({ theme: themeProps }) => theme.deviceSize.tablet} {
    width: 120px;
    display: ${(props) => (props.Menu ? 'block' : 'none')};
    height: ${(props) => (props.InitialNav ? '192px' : '258px')};
    flex: 0 0 auto;
    position: absolute;
    top: 8.6%;
    z-index: 1;
    flex-direction: column;
    background-color: #fffceb;
  }
`;
const Div = styled.div<{ Text?: boolean }>`
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
  @media ${({ theme: themeProps }) => theme.deviceSize.tablet} {
    width: 3.2vw;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media ${({ theme: themeProps }) => theme.deviceSize.middle} {
    width: 5rem;
  }
`;

const FeedDiv = styled.div``;

// export interface navProps {
//   render: any;
//   setRender: (render: boolean) => void;
// }
// const Nav = ({ render, setRender }: navProps) => {
const Nav = (props: any) => {
  const { isLogin, userInfo } = useSelector(
    (selector: RootState) => selector.userInfo
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);

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
                  <NavLink
                    to={`/feed/${userInfo.nickname}`}
                    onClick={() => props.setRender(!props.render)}
                    style={{
                      textDecoration: 'none',
                      color: '#3d3c3c',
                    }}
                  >
                    <FeedDiv>
                      {userInfo.userImage === 'nothing' ? (
                        <Img src={defaultprofileImg} />
                      ) : (
                        <Img src={userInfo.userImage} />
                      )}
                    </FeedDiv>
                  </NavLink>
                  <FeedDiv>피드</FeedDiv>
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
                  onClick={() => dispatch(deleteUserInfo())}
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
              fontSize: '3.8vh',
              color: '#3d3c3c',
            }}
          />
        </MenuFabar>
      </Wrapper>
    </>
  );
};

export default Nav;
