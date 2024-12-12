import React, { useEffect, useState } from "react";
import moment from "moment";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFormContext } from "../FormProvider";

interface DayProps {
  day: number;
  currMonth: boolean;
}

interface WeekProps {
  days: DayProps[];
}

interface MonthProps {
  weeks: WeekProps[];
}

interface CalendarWidgeProps {
  label: string;
  keyValue: string;
}

const CalendarWidget = ({ label, keyValue }: CalendarWidgeProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState<MonthProps>({ weeks: [] });
  const [currYear, setCurrYear] = useState<number>(
    Number(moment().format("YYYY"))
  );
  const [currMonth, setCurrMonth] = useState<number>(
    Number(moment().format("MM"))
  );
  const [currDay, setCurrDay] = useState<number>(Number(moment().format("D")));
  const [monthString, setMonthString] = useState<string>("");
  const [monthMenu, setMonthMenu] = useState<boolean>(false);
  const [yearMenu, setYearMenu] = useState<boolean>(false);
  const daysOfWeek: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const monthsOfYear: { month: string; index: number }[] = [
    { month: "Jan", index: 1 },
    { month: "Feb", index: 2 },
    { month: "Mar", index: 3 },
    { month: "Apr", index: 4 },
    { month: "May", index: 5 },
    { month: "Jun", index: 6 },
    { month: "Jul", index: 7 },
    { month: "Aug", index: 8 },
    { month: "Sep", index: 9 },
    { month: "Oct", index: 10 },
    { month: "Nov", index: 11 },
    { month: "Dec", index: 12 },
  ];

  const years: number[] = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031,
  ];

  useEffect(() => {
    // get month and year

    let nowMonth = currMonth.toString().padStart(2, "0");
    const prevMonth = (currMonth - 1).toString().padStart(2, "0");
    let nowYear = currYear.toString();
    let nowDay = moment().format("D");
    let daysInMonth = moment(nowYear + "-" + nowMonth, "YYYY-MM").daysInMonth();
    let firstDayOfMonth = moment(nowYear + "-" + nowMonth + "-" + "01").format(
      "d"
    );

    setMonthString(moment(nowYear + "-" + nowMonth, "YYYY-MM").format("MMMM"));

    let currDayInMonth = 1;
    let monthArray: MonthProps = { weeks: [] };
    let firstDay = false;
    let extraDay = 1;
    while (currDayInMonth < daysInMonth) {
      let weekArray: WeekProps = { days: [] };
      let currDayInWeek = 0;

      // find the first day of the month
      if (!firstDay) {
        while (currDayInWeek < 7) {
          if (Number(firstDayOfMonth) != currDayInWeek) {
            weekArray.days.push({ day: 99, currMonth: false });
          } else {
            weekArray.days.push({ day: currDayInMonth, currMonth: true });
            const daysInPrevMonth = moment(
              nowYear + "-" + prevMonth,
              "YYYY-MM"
            ).daysInMonth();
            for (let i = 0; i < currDayInWeek; i++) {
              weekArray.days[i] = {
                day: daysInPrevMonth - currDayInWeek + i + 1,
                currMonth: false,
              };
            }
            ++currDayInMonth;
            ++currDayInWeek;
            firstDay = true;
            break;
          }
          ++currDayInWeek;
        }
      }

      // populate rest of the calendar and fill next month's day
      while (currDayInWeek < 7) {
        if (currDayInMonth > daysInMonth) {
          weekArray.days.push({ day: extraDay, currMonth: false });
          ++extraDay;
        } else {
          weekArray.days.push({ day: currDayInMonth, currMonth: true });
        }
        ++currDayInMonth;
        ++currDayInWeek;
      }

      // push at the end of every week
      monthArray.weeks.push(weekArray);
    }

    //so that calendar shows at least 7 weeks (styling reasons)
    while (monthArray.weeks.length != 6) {
      let weekArray: WeekProps = { days: [] };
      for (let i = 0; i < 7; i++) {
        weekArray.days.push({
          day: extraDay,
          currMonth: false,
        });
        ++extraDay;
      }
      monthArray.weeks.push(weekArray);
    }

    // set Loading is false to avoid render issue
    setMonth(monthArray);
    setIsLoading(false);
  }, [currMonth, currYear]);

  const handleBackClick = () => {
    if (currMonth === 1) {
      setCurrMonth(12);
      setCurrYear((prevYear) => --prevYear);
    } else {
      setCurrMonth((prevMonth) => --prevMonth);
    }
  };

  const handleForwardClick = () => {
    if (currMonth === 12) {
      setCurrMonth(1);
      setCurrYear((prevYear) => ++prevYear);
    } else {
      setCurrMonth((prevMonth) => ++prevMonth);
    }
  };

  const { formData, setFormData } = useFormContext();

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <label
        className={`text-xs text-slate-400 transition-all duration-300 mb-4`}
      >
        {label}
      </label>
      <div className="flex flex-col gap-2 border-2 border-gray-300 rounded-lg w-[160px] bg-white p-2 font-code items-center justify-center">
        {!monthMenu && !yearMenu && (
          <>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex justify-between items-center w-full">
                <button
                  type="button"
                  className="hover:text-red-400 transition-all text-slate-400"
                  onClick={handleBackClick}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div
                  className="text-[8px] select-none cursor-pointer hover:text-red-400 transition-all"
                  onClick={() => setMonthMenu((prev) => !prev)}
                >
                  {monthString}
                </div>

                <button
                  type="button"
                  className="hover:text-red-400 transition-all text-slate-400"
                  onClick={handleForwardClick}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div
                className="text-[10px] select-none cursor-pointer hover:text-red-400 transition-all"
                onClick={() => setYearMenu((prev) => !prev)}
              >
                {currYear}
              </div>
            </div>

            <table className="table-fixed border w-full border-collapse h-full">
              <thead className="border">
                <tr>
                  {daysOfWeek.map((day, index) => (
                    <th className="text-center text-[8px]" key={index}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {month.weeks.map((week, index) => (
                  <tr className="border" key={index}>
                    {week.days.map((day, index) => (
                      <td
                        key={index}
                        className={`text-[8px] text-center border ${
                          day.currMonth
                            ? "text-black cursor-pointer"
                            : "text-gray-300 pointer-events-none"
                        } ${
                          day.day === currDay && day.currMonth
                            ? "bg-red-400 text-white"
                            : "hover:bg-gray-300"
                        } transition-all`}
                        onClick={() => {
                          setCurrDay(day.day);
                          setFormData((prev) => ({
                            ...prev,
                            [keyValue]: {
                              day: day.day,
                              month: currMonth,
                              year: currYear,
                            },
                          }));
                          // console.log(formData);
                        }}
                      >
                        {day.day}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {monthMenu && (
          <div className="flex gap-2 p-2 flex-wrap justify-center items-center">
            {monthsOfYear.map((month) => (
              <div
                className={`text-[8px] p-2 rounded-full cursor-pointer  transition-all ${
                  currMonth === month.index
                    ? "bg-red-400 text-white"
                    : "hover:bg-gray-400"
                }`}
                key={month.index}
                onClick={() => {
                  setCurrMonth(month.index);
                  setMonthMenu((prev) => !prev);
                }}
              >
                {month.month}
              </div>
            ))}
          </div>
        )}

        {yearMenu && (
          <div className="flex gap-2 flex-wrap justify-center items-center">
            {years.map((year, index) => (
              <div
                className={`text-[8px] p-2 rounded-full cursor-pointer  transition-all ${
                  currYear === year
                    ? "bg-red-400 text-white"
                    : "hover:bg-gray-300"
                }`}
                key={index}
                onClick={() => {
                  setCurrYear(year);
                  setYearMenu((prev) => !prev);
                  setMonthMenu((prev) => !prev);
                }}
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;
