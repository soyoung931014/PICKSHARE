/* eslint-disable*/
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.section`
  width: 100%;
  height: 10vh;
  background-color: saddlebrown;
`;
const StyledNavLink = styled(NavLink)``;

const Nav = () => {
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  return (
    <>
      <NavContainer>
        Nav
        {isLogin === true ? (
          <StyledNavLink to={`/feed/${userInfo.nickname}`}>
            {userInfo.nickname}의 피드
          </StyledNavLink>
        ) : (
          <div>user의 피드</div>
        )}
        <StyledNavLink to='/mainfeed'>메인피드</StyledNavLink>
      </NavContainer>
    </>
  );
};

export default Nav;
