import React, { useEffect, useState } from 'react';

function CalendarValue({ dateValue }) {
  const [formattedDate, setFormattedDate] = useState("날짜를 선택해주세요.");

  useEffect(() => {
    if (dateValue) {
      setFormattedDate(dateValue.format("YYYY년 MM월 DD일"));
      
    } else {
      setFormattedDate("날짜를 선택해주세요.");
    }
  }, [dateValue]);

  useEffect(() => {
    console.log('formattedDate 변경:', formattedDate);
  }, [formattedDate]);

  return (
    <div>
      <div>
        {formattedDate}
      </div>
    </div>
  );
}

export default CalendarValue;