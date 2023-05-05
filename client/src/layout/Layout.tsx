import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../component/Footer/Footer';
import Nav from '../component/Nav/Nav';
const Layout = () => {
  const [state, setState] = useState(false);
  const hi = window.location.pathname;

  return (
    <Container>
      {hi === '/signup' || hi === '/login' || hi === '/mypage' ? null : (
        <header>
          <Nav />
        </header>
      )}
      <Main>
        <Outlet />
      </Main>
      {window.location.pathname === '/signup' ||
      window.location.pathname === '/login' ||
      window.location.pathname === '/mypage' ? null : (
        <Footer />
      )}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-color: #ccc;
`;
const Main = styled.div``;
