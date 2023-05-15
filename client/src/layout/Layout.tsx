import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Nav from '../component/Nav/Nav';
import Footer from '../component/Footer/Footer';
import { feedBG } from '../img/Img';

const Layout = () => {
  return (
    <Container>
      <Header>
        <Nav />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <FooterDiv>
        <Footer />
      </FooterDiv>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-image: url(${feedBG});
  background-size: cover;
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
const FooterDiv = styled.div`
  background: #f5f5f5;
  overflow: auto;
`;
