import React, { useState } from 'react';
import CalHeader from './CalHeader';
import { addMonths, subMonths, format } from 'date-fns';
import CalDays from './CalDays';
import CalCells from './CalCells';
import styled from 'styled-components';

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
      <div className="Wrapper">
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
      </div>
    </Container>
  );
};
export default Calendar;
const Container = styled.div`
  background-image: url('https://profileimage-pickshare.s3.ap-northeast-2.amazonaws.com/feedBG.jpg');
  width: 20rem;
  display: flex;
  flex-direction: column;
  box-shadow: 30px 10px 10px #3c4a5645;
  border-left: #b1b0b0 solid 2px;
  border-right: #b1b0b0 solid 3px;
  border-radius: 10px;
`;
