import React from 'react';

interface CalendarProps {
}

const Calendar: React.FC<CalendarProps> = ({}) => {
  return <div>
      <div id="datepicker-inline" inline-datepicker data-date="02/25/2024"></div>
    </div>

};

export default Calendar;