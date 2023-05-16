import React from 'react';
import styled from 'styled-components';

const CalDays = () => {
  const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = dayArr.map((day, idx) => {
    return <div key={idx}>{day}</div>;
  });
  return <Wrapper>{days}</Wrapper>;
};

export default CalDays;
const Wrapper = styled.div`
  box-shadow: 0px 0px 5px #3c4a5645;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 1.2rem;
  opacity: 0.8;
  font-weight: 600;
`;
