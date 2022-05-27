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
import { deleteUserInfo } from '../../redux/actions';
const AWS = require('aws-sdk/dist/aws-sdk-react-native');

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
const Div = styled.div<{ Text?: any }>`
  //border: solid blue 2px;
  margin: 0.7rem;
  font-size: 1rem;
  padding: 0.6rem;
  :hover {
    cursor: pointer;
    background: #fee9f7;
    border-radius: 10px;
  }
  padding-top: ${(props) => (props.Text ? '1rem' : null)};
  padding-bottom: ${(props) => (props.Text ? '1rem' : null)};
`;

const Img = styled.img`
  height: 3.5vh;
  width: 1.8vw;
  //border: solid red 2px;
  border-radius: 50%;
  padding: 2px;
  margin-right: 0.5rem;
`;
const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = (props: any) => {
  const { isLogin, accessToken, userInfo, userImage } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const navigate = useNavigate();
  console.log(userInfo.userImage, 'userImage');

  AWS.config.update({
    region: 'us-east-1', // congito IdentityPoolId 리전을 문자열로 입력하기. 아래 확인 (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:156ae187-f9d1-49d9-86f7-ad7f49675cbd', // cognito 인증 풀에서 받아온 키를 문자열로 입력하기. (Ex. "ap-northeast-2...")
    }),
  });

  return (
    <>
      <Wrapper>
        <Logo onClick={() => navigate('/mainfeed')}>PICHSHARE</Logo>
        {isLogin === true ? (
          <>
            <NavList>
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
                    <Img src={userInfo.userImage} />
                  </div>
                  <NavLink
                    to={`/feed/${userInfo.nickname}`}
                    style={{
                      textDecoration: 'none',
                      color: '#3d3c3c',
                    }}
                  >
                    {userInfo.nickname}님의 피드
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
                  mypage
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
            <NavList>
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
