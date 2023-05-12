import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
  addDays,
} from 'date-fns';
import styled from 'styled-components';

export interface CalCellsProps {
  currentMonth: number | Date;
  selectedDate: number | Date;
  select: (day: React.SetStateAction<Date>) => void;
}

const CalCells = ({ currentMonth, selectedDate, select }: CalCellsProps) => {
  // 해당 달의 시작일
  const monthStart = startOfMonth(currentMonth);
  // 해당 달의 끝나는일
  const monthEnd = endOfMonth(monthStart);
  // 해당 달의 시작 주의 첫 일 303112345 => 30일
  const startWeekDay = startOfWeek(monthStart);
  // 해당 달의 끝나는 주의 마지막 일
  const endWeekDay = endOfWeek(monthEnd);

  const sameMonth = (
    copyStartWeekDay: Date | number,
    monthStart: Date | number
  ) => (isSameMonth(copyStartWeekDay, monthStart) ? true : false);

  const selectedDay = (curDay: string) => {
    const checkedDay = format(selectedDate, 'yyyy.MM.dd');
    if (sameMonth && checkedDay === curDay) return true;
    return false;
  };
  const rows = [];
  let days = [];
  let day = startWeekDay;
  let formatted = '';
  let curDay = '';
  while (day <= endWeekDay) {
    for (let i = 0; i < 7; i++) {
      formatted = format(day, 'd');
      curDay = format(day, 'yyyy.MM.dd');
      const copyDay = day;
      days.push(
        <DayWrapper
          key={curDay}
          onClick={sameMonth ? () => select(copyDay) : null}
          Visible={sameMonth(day, monthStart)}
          Selected={selectedDay(curDay)}
        >
          <div>{formatted}</div>
        </DayWrapper>
      );
      day = addDays(day, 1);
    }
    rows.push(<Wrapper>{days}</Wrapper>);
    days = [];
  }

  return <Container>{rows}</Container>;
};

export default CalCells;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-size: 1.2rem;
  opacity: 0.8;
  font-weight: 600;
`;
const DayWrapper = styled.div<{ Visible: boolean; Selected: boolean }>`
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 3px;
  border-radius: 100%;
  opacity: ${(props) => (props.Visible ? '1' : '0.2')};
  background: ${(props) => (props.Selected ? 'white' : 'null')};
  border: ${(props) => (props.Selected ? 'solid violet 2px' : 'null')};
  :hover {
    cursor: ${(props) => (props.Visible ? 'pointer' : 'null')};
    background: ${(props) => (props.Visible ? 'white' : 'null')};
  }
`;
