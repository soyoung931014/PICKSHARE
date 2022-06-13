import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  width: 20rem;
  height: 30rem;
  border: solid 2px #abccff;
  background-color: #ebf1f1;
  opacity: 0.8;
  border-radius: 12%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const List = styled.button`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  font-size: 17px;
  &:hover {
    cursor: pointer;
  }
`;

export default function Modal() {
  //const [follower, setFollower] = useState(false);
  // const openModalHandler = () => {
  //   setOpen(!open);
  // };
  return (
    <>
      <ModalBackdrop>
        <ModalContainer>
          <List>팔로워</List>
          <List>팔로잉</List>
        </ModalContainer>
      </ModalBackdrop>
    </>
  );
}
