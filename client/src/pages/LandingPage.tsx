/*eslint-disable*/
import Footer from '../component/Footer/Footer';
import Landing from '../component/Landing/Landing';
import Nav from '../component/Nav/Nav';
import styled from 'styled-components';

// const Div = styled.div`
//   position: fixed;
//   // top: 5px;
//   left: 10px;
// `;
const LandingPage = () => {
  return (
    <>
      <Nav />
      <Landing />
    </>
  );
};

export default LandingPage;
