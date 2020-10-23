import React from "react";

const DatePickerComponent = ({ date, setDate }) => {
  return (
    <div className="justify-start text-gray-700">
      <span className="py-2 pl-4 ">To be done before</span>
      <input
        name="toBeDoneAtDate"
        type="date"
        value={date}
        onChange={setDate}
        className="pl-8"
        required
      />
    </div>
  );
};


export default DatePickerComponent;
