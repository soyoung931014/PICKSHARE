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
import { Link } from 'react-router-dom';
import { deleteUserInfo } from '../../redux/actions';
const Wrapper = styled.section`
  //border: solid green 2px;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  background: white;
  border-bottom: solid 0.8px #bbbbbb;
  margin-bottom: 1rem;
  box-shadow: 0 0px 10px #acafb345;
`;

const Logo = styled.section`
  //border: solid red 2px;
  margin-left: 1rem;
  font-weight: bolder;
  width: 100%;
  height: 2rem;
  background: linear-gradient(to right, #ee64c7, #8272eb, #d06be0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;

  :hover {
    cursor: pointer;
  }
`;
const NavList = styled.section`
  //border: solid blue 2px;
  width: 160%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Div = styled.div<{ Home?: any }>`
  //border: solid blue 2px;
  margin: 1rem;
  font-size: 1rem;
  padding: 0.5rem;
  :hover {
    cursor: pointer;
    background: #fee9f7;
    border-radius: 10px;
  }
`;

const Nav = (props: any) => {
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        <Logo onClick={() => navigate('/mainfeed')}>PICHSHARE</Logo>
        {isLogin === true ? (
          <>
            <NavList>
              <Div Home>
                <Link
                  to="/mainfeed"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: '1.7rem',
                  }}
                >
                  <BiHome />
                </Link>
              </Div>
              <Div>
                <Link
                  to={`/feed/${userInfo.nickname}`}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  {userInfo.nickname}님의 피드
                </Link>
              </Div>
              <Div>
                <Link
                  to="/mypage"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  mypage
                </Link>
              </Div>
              <Div>
                <Link
                  onClick={() => props.userInfoToStore()}
                  to="/mainfeed"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  로그아웃
                </Link>
              </Div>
            </NavList>
          </>
        ) : (
          <>
            <NavList>
              <Div Home>
                <Link
                  to="/mainfeed"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: '1.7rem',
                  }}
                >
                  <BiHome />
                </Link>
              </Div>
              <Div>
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  로그인
                </Link>
              </Div>
              <Div>
                <Link
                  to="/signup"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  회원가입
                </Link>
              </Div>
            </NavList>
          </>
        )}
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
