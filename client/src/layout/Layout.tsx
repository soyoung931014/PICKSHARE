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
        <FooterDiv>
          <Footer />
        </FooterDiv>
      </Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Header = styled.div`
  height: 70px;
`;
const Main = styled.div`
  overflow: auto;
  height: 100vh;
`;
const FooterDiv = styled.div``;
