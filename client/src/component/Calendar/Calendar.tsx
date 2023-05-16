import React, { useState } from 'react';
import CalHeader from './CalHeader';
import { addMonths, subMonths } from 'date-fns';
import CalDays from './CalDays';
import CalCells from './CalCells';
import styled from 'styled-components';
import { feedBG } from '../../img/Img';

export interface CalendarProps {
  selectedDate: Date | number;
  setSelectedDate: (day: React.SetStateAction<Date>) => void;
  calOpen: boolean;
  setCalOpen: (calOpen: boolean) => void;
}
const Calendar = ({
  selectedDate,
  setSelectedDate,
  calOpen,
  setCalOpen,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const preMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const select = (day: React.SetStateAction<Date>) => {
    setSelectedDate(day);
    setCalOpen(!calOpen);
  };
  return (
    <Container>
      <CalHeader
        currentMonth={currentMonth}
        preMonth={preMonth}
        nextMonth={nextMonth}
      />
      <CalDays />
      <CalCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        select={select}
      />
    </Container>
  );
};
export default Calendar;
const Container = styled.div`
  background-image: url(${feedBG});
  width: 20rem;
  display: flex;
  flex-direction: column;
  box-shadow: 30px 10px 10px #3c4a5645;
  border-left: #b1b0b0 solid 2px;
  border-right: #b1b0b0 solid 3px;
  border-radius: 10px;
  z-index: 1;
`;
