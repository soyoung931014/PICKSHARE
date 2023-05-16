import { format } from 'date-fns';
import { FcNext, FcPrevious } from 'react-icons/fc';
import styled from 'styled-components';
export interface CalHeaderProps {
  currentMonth: number | Date;
  preMonth: () => void;
  nextMonth: () => void;
}
const CalHeader = ({ currentMonth, preMonth, nextMonth }: CalHeaderProps) => {
  return (
    <Container>
      <div>
        <span>
          {format(currentMonth, 'yyyy')}년{` `}
          <span>{format(currentMonth, 'M')}월 </span>
        </span>
      </div>
      <Icon>
        <FcPrevious onClick={preMonth} />
        <FcNext onClick={nextMonth} />
      </Icon>
    </Container>
  );
};

export default CalHeader;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  font-size: 1.3rem;
  opacity: 0.8;
  font-weight: 600;
  align-items: center;
`;
const Icon = styled.div`
  :hover {
    cursor: pointer;
  }
`;
