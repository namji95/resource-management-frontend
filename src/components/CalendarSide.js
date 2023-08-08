import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './sidebarDate.css';
import CalendarValue from './CalendarValue';



function CalendarSide() {
  const [dateValue, setDateValue] = useState(moment());
  
  const handleDateChange = (date) => {
    setDateValue(moment(date));
  };
  return (
    <div className='custom-calendar'>
    <Calendar onChange={handleDateChange} value={dateValue.toDate()} />
    <CalendarValue dateValue={dateValue} />
  </div>
  );
}

export default CalendarSide;