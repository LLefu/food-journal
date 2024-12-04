"use client";
import React, { useEffect } from 'react';
import { Datepicker, WeekStart } from "flowbite-react";
import StomacheDays from '../stomacheDays/stomacheDays';
import WeekView from '../weekView/weekView';

interface CalendarProps {
  setDate: Function;
  setTitle: Function;
}

const calendarTheme = {
  "popup": {
    "root": {
      "base": " z-50 block pt-2",
      "inline": "relative top-0 z-auto",
      "inner": "p-4"
    },
  },
  "views": {
    "days": {
      "header": {
        "base": "mb-1 grid grid-cols-7",
        "title": "h-6 text-center text-sm font-medium leading-6 text-neutral-400 text-lg font-extrabold"
      },
      "items": {
        "base": "grid w-64 grid-cols-7 w-full",
        "item": {
          "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-white",
          "selected": "bg-neutral-400 text-white",
        }
      }
    },
    "months": {
      "items": {
        "base": "grid w-64 grid-cols-4 w-full",
        "item": {
          "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
        }
      }
    },
    "years": {
      "items": {
        "base": "grid w-64 grid-cols-4 w-full",
        "item": {
          "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-white",
        }
      }
    }
  }
}

const Calendar: React.FC<CalendarProps> = ({setDate, setTitle}) => {

  useEffect(()=>{
    setTitle("Calendar");
  }, [])

  function onSelectDate(date: Date | null){
    if(date){
      setDate(date);
    }
  }

  return <div>
      <Datepicker weekStart={WeekStart.Monday} defaultValue={new Date()}  onChange={(date) =>{onSelectDate(date)}} theme={calendarTheme} showClearButton={false} showTodayButton={false} inline={true}></Datepicker>
      <hr className='ms-2 me-2 rounded h-1'/>
      <WeekView setDate={setDate}/>
      <hr className='ms-2 me-2 rounded h-1'/>
      <StomacheDays setDate={setDate}/>
    </div>
};

export default Calendar;