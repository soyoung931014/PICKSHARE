import styled from 'styled-components';

function Footer() {
  return (
    <Wrapper>
      <Logo>PICKSHARE</Logo>
      <Div>
        <Title>ABOUT US</Title>
        <Content>
          <Alink
            href="https://github.com/soyoung931014/PICKSHARE"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'gray', fontWeight: 'bolder', fontSize: '1rem' }}
          >
            repository
          </Alink>
        </Content>
        <Content>
          <Alink
            href="https://github.com/soyoung931014/PICKSHARE/wiki"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'gray', fontWeight: 'bolder' }}
          >
            wiki
          </Alink>
        </Content>
      </Div>
      <Div>
        <Title>TEAM MEMBERS</Title>
        <Position>FullStack</Position>
        <Alink
          href="https://github.com/soyoung931014"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'gray', fontWeight: 'bolder', fontSize: '1rem' }}
        >
          박소영
        </Alink>

        <Alink
          href="https://github.com/boyoung589"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'gray', fontWeight: 'bolder', fontSize: '1rem' }}
        >
          양보영
        </Alink>
      </Div>
    </Wrapper>
  );
}

export default Footer;
const Wrapper = styled.div`
  margin-top: 1rem;
  box-shadow: 10 10px 0px #3c4a5645;
  width: 100vw;
`;

const Div = styled.div`
  flex: 1;
  padding-bottom: 20px;
`;

const Title = styled.p`
  margin-top: 12px;
  font-weight: 700;
  font-size: 23px;
  opacity: 0.5;
`;

const Alink = styled.a`
  text-decoration: none;
  margin-right: 1rem;
  opacity: 0.5;
  width: 1rem;
`;

const Position = styled.div`
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 18px;
  opacity: 0.5;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  font-weight: 600;
`;
const Logo = styled.div`
  font-weight: 900;
  width: 12rem;
  height: 2rem;
  background: linear-gradient(to right, #ee64c7, #8272eb, #d06be0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  :hover {
    cursor: pointer;
  }
`;
const Content = styled.div`
  margin-top: 4px;
`;
