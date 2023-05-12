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
      <FooterDiv>
        <Footer />
      </FooterDiv>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-image: url('https://profileimage-pickshare.s3.ap-northeast-2.amazonaws.com/feedBG.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
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
