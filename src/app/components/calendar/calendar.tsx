"use client";
import React from 'react';
import { Datepicker, FlowbiteDatepickerPopupTheme, FlowbiteDatepickerTheme } from "flowbite-react";
import Header from '../header/header';

interface CalendarProps {
  setDate: Function;
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
        "title": "h-6 text-center text-sm font-medium leading-6 text-cyan-600"
      },
      "items": {
        "base": "grid w-64 grid-cols-7 w-full",
        "item": {
          "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-white",
          "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
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

const Calendar: React.FC<CalendarProps> = ({setDate}) => {

  function onSelectDate(date: Date | null){
    if(date){
      setDate(date);
    }
  }

  return <div>
      <Datepicker defaultValue={new Date()}  onChange={(date) =>{onSelectDate(date)}} theme={calendarTheme} showClearButton={false} showTodayButton={false} inline={true}></Datepicker>
    </div>
};

export default Calendar;