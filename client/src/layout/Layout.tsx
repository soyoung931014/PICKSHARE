import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Nav from '../component/Nav/Nav';
import Footer from '../component/Footer/Footer';

const Layout = () => {
  return (
    <Container>
      <Header>
        <Nav />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-color: #ffff;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  height: 70px;
`;
const Main = styled.div``;
