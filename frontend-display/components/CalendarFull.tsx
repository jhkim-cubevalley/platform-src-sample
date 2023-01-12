import React, { useState } from "react";
import Calendar from "react-calendar";

const CalendarFull = () => {
  const [value, setValue] = useState<Date>(new Date());

  return (
    <div>
      <Calendar value={value} />
    </div>
  );
};

export default CalendarFull;
