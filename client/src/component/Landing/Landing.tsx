import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import landing from '../../img/landing.jpg';
import { TbPhoto } from 'react-icons/tb';
import { FaPaintBrush } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import theme from '../../styles/theme';

const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <Wrapper>
        <Section>
          <Subsection>
            <Line0>사진과 그림으로 일상을 공유하는 SNS</Line0>
            <Line1>오늘의 순간 포착</Line1>
            <Line2>PICKSHARE</Line2>
            <Line3>
              <Button
                onClick={() => {
                  navigate('/mainfeed');
                }}
              >
                둘러볼래요
              </Button>
              <Button
                onClick={() => {
                  navigate('/signup');
                }}
              >
                회원가입
              </Button>
            </Line3>
          </Subsection>
          <Subsection>
            <Img src={landing} />
          </Subsection>
        </Section>
        <Section>
          <Subsection2>
            <SubTitle>Service</SubTitle>
            <Subsection3>
              <Div>
                <Icon1 />
                <ServiceWrapper>
                  <ServiceTitle>사진</ServiceTitle>
                  <ServiceContent>기존의 SNS보다 더 많은 내용을</ServiceContent>
                  <ServiceContent>
                    사진과 함께 기록할 수 있습니다.
                  </ServiceContent>
                </ServiceWrapper>
              </Div>
              <Div>
                <Icon2 />
                <ServiceWrapper>
                  <ServiceTitle>그림</ServiceTitle>
                  <ServiceContent>사진이 아닌 그림으로도</ServiceContent>
                  <ServiceContent>기록할 수 있습니다.</ServiceContent>
                </ServiceWrapper>
              </Div>
              <Div>
                <Icon3 />
                <ServiceWrapper>
                  <ServiceTitle>공유</ServiceTitle>
                  <ServiceContent>주변인들과 공유하고,</ServiceContent>
                  <ServiceContent>
                    댓글을 통해 소통할 수 있습니다.
                  </ServiceContent>
                </ServiceWrapper>
              </Div>
            </Subsection3>
          </Subsection2>
        </Section>
      </Wrapper>
    </>
  );
};

export default Landing;

const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: 140%;
`;
const Section = styled.section`
  border-bottom: solid 0.8px #bbbbbb;
  width: 100%;
  height: 70vh;
  display: flex;
  padding: 1rem;
  @media ${() => theme.deviceSize.middle} {
    flex-direction: column;
    flex: 1 0 auto;
    height: 90vh;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  @media ${() => theme.deviceSize.middle} {
    margin-top: 1rem;
    flex-shrink: 0;
  }
`;
const Subsection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;
const Line0 = styled.div`
  font-weight: 600;
  font-size: 2.5rem;
  opacity: 0.4;
  margin-bottom: 1rem;
  @media screen and (max-width: 1265px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 1006px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 412px) {
    font-size: 1rem;
  }
  animation: slide 3s ease-in;
  @keyframes slide {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.4;
    }
  }
`;
const Line1 = styled.div`
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 0.4rem;
  opacity: 0.7;
  @media screen and (max-width: 412px) {
    font-size: 2rem;
  }
  animation: slide 4s ease-in;
  @keyframes slide {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.7;
    }
  }
`;
const Line2 = styled.div`
  font-weight: 800;
  font-size: 3.4rem;
  background: linear-gradient(to right, #a396f8, #d06be0, #fd40c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 412px) {
    font-size: 2.4rem;
  }
  animation: slide 5s ease-in;
  @keyframes slide {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Line3 = styled.div`
  font-weight: 700;
  font-size: 3rem;
`;
const Button = styled.button`
  width: 10rem;
  height: 2.5rem;
  margin-left: 1rem;
  color: #616060;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 3px 5px #5f6b7545;
  &:hover {
    cursor: pointer;
    background: #fee9f7;
    border-radius: 10px;
  }
  @media screen and (max-width: 412px) {
    width: 6rem;
  }
`;

const Icon1 = styled(TbPhoto)`
  border: solid #616060 4px;
  color: #a396f8;
  border-radius: 100%;
  padding: 15px;
  width: 7rem;
  height: 7rem;
`;
const Icon2 = styled(FaPaintBrush)`
  border: solid #616060 4px;
  color: #a396f8;
  border-radius: 100%;
  padding: 15px;
  width: 7rem;
  height: 7rem;
`;
const Icon3 = styled(IoIosPeople)`
  border: solid #616060 4px;
  color: #a396f8;
  border-radius: 100%;
  padding: 15px;
  width: 7rem;
  height: 7rem;
`;
const Subsection3 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media ${() => theme.deviceSize.middle} {
    flex-direction: column;
  }
`;
const Subsection2 = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${() => theme.deviceSize.middle} {
    flex-direction: column;
    margin-top: 8rem;
    justify-content: flex-start;
    position: relative;
    top: 70px;
  }
`;
const SubTitle = styled.div`
  margin-top: 3rem;
  font-size: 2.5rem;
  font-weight: 800;
  opacity: 0.6;
  @media ${() => theme.deviceSize.middle} {
    position: absolute;
    top: -220px;
  }
`;
const ServiceWrapper = styled.div`
  margin-top: 10px;
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;
const ServiceTitle = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 6px;
  opacity: 0.8;
  @media ${() => theme.deviceSize.middle} {
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;
const ServiceContent = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${() => theme.deviceSize.middle} {
    margin-top: 1.2rem;
  }
`;
