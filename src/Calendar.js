import React, { useState } from 'react';
import './Calendar.css';

let date = new Date();

const Calendar = () => {
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());

  // 이전 달 마지막 날짜 ex) Sun Oct 31 2021 00:00:00
  const prevMonth = new Date(year, month, 0);
  // 현재 달 마지막 날짜 ex) Tue Nov 30 2021 00:00:00
  const currentMonth = new Date(year, month + 1, 0);

  // 이전 달의 마지막 날짜와 요일
  const prevMonthDate = prevMonth.getDate();
  const prevMonthDay = prevMonth.getDay();

  // 현재 달 마지막 날짜와 요일
  const currentMonthDate = currentMonth.getDate();
  const currentMonthDay = currentMonth.getDay();

  const prevDates = [];
  const currentDates = [...Array(currentMonthDate + 1).keys()].slice(1);
  const nextDates = [];

  if (prevMonthDay !== 6) {
    for (let i = 0; i < prevMonthDay + 1; i++) {
      prevDates.unshift(prevMonthDate - i);
    }
  }

  for (let i = 1; i < 7 - currentMonthDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(currentDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(currentMonthDate);

  // month === 0 => 1월, month === 1 => 12월
  const goPrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else setMonth(month - 1);
  };
  const goToday = () => {
    date = new Date();

    setYear(date.getFullYear());
    setMonth(date.getMonth());
  };
  const goNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else setMonth(month + 1);
  };

  const handle = (e) => {
    console.log(year, month + 1, e.target.dataset.value);
  };

  return (
    <div className="calendar">
      <div className="header">
        <div className="year-month">
          <span>
            {year}년 {month + 1}월
          </span>
        </div>
        <div className="nav">
          <button className="nav-btn go-prev" onClick={goPrevMonth}>
            &lt;
          </button>
          <button className="nav-btn go-today" onClick={goToday}>
            Today
          </button>
          <button className="nav-btn go-next" onClick={goNextMonth}>
            &gt;
          </button>
        </div>
      </div>
      <div className="main">
        <div className="days">
          <div className="day">일</div>
          <div className="day">월</div>
          <div className="day">화</div>
          <div className="day">수</div>
          <div className="day">목</div>
          <div className="day">금</div>
          <div className="day">토</div>
        </div>
        <div className="dates" onClick={handle}>
          {dates.map((date, i) => {
            const condition =
              i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';

            return (
              <div className="date" data-value={date} key={i}>
                <span className={condition}>{date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
