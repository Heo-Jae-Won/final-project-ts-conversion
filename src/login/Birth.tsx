import { Grid } from "@material-ui/core";
import { getMonth, getYear } from "date-fns";
import { useBirthStore } from "module/module.birth";
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * 생년월일을 지정하는 화면
 * LoginRegister.jsx를 구성하는 하위 component.
 */
const Birth = () => {
  const changeBirth = useBirthStore((state) => state.changeBirth);
  const birth = useBirthStore((state) => state.birth);

  return (
    <div>
      <Grid item xs={12}>
        <ReactDatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(Number(value))}
              ></select>

              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          )}
          selected={new Date(birth)}
          maxDate={new Date()}
          onChange={(date) => changeBirth(String(date))}
        />
      </Grid>
    </div>
  );
};

export default Birth;
