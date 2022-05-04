import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const SignupBox = styled.div`
  width: 40rem;
  height: 100rem;
  border-color: aliceblue;
  background-color: teal;
`;
function Signup() {
  return (
    <Container>
      <SignupBox>
        <input />
      </SignupBox>
    </Container>
  );
}

export default Signup;
