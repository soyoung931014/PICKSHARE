import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
const Layout = () => {
  return (
    <Container>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-color: #ffff;
`;
const Main = styled.div``;
