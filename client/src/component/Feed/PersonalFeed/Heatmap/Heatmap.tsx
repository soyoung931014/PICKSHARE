/*eslint-disable*/
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap.css';
import styled from 'styled-components';

const now = new Date();
const year =  now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const HeatmapWrapper = styled.div``

export default function Heatmap(totalByDay: []) {
    return(
        <HeatmapWrapper>
            <CalendarHeatmap 
                startDate={new Date(`${year - 1}-${month}-${date}`)}
                endDate={now}
                values={totalByDay || []}
                classForValue={(value) => {
                    if(!value) {
                        return 'color-empty';
                    }
                    return value.count < 5 ?
                        `color-github-${value.count}` :
                        'color-github-4';
                }}
                tooltipDataAttrs={(value: { date: Date; count: number; }) => {
                    if (value.date && value.count) {
                      return {
                        'data-tip': `${value.date}, ${value.count} shared`,
                      };
                    }
                    return {
                      'data-tip': 'No shared',
                    };
                  }}
                  showWeekdayLabels={true}
                //   onClick={(value) => {
                //     searchDayHandler(value);
                //   }}
            />
        </HeatmapWrapper>
    )
}