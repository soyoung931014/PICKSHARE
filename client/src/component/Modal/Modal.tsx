import React, { useState } from 'react';
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
  height: 20rem;
  border: solid 2px #abccff;
  background-color: #ebf1f1;
  opacity: 0.8;

  border-radius: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Modal() {
  const [open, setOpen] = useState(false);
  const openModalHandler = () => {
    setOpen(!open);
  };
  return (
    <>
      {open === false ? (
        <ModalBackdrop>
          <ModalContainer>
            <div> 모달 </div>
          </ModalContainer>
        </ModalBackdrop>
      ) : null}
    </>
  );
}
