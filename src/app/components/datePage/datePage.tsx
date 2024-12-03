"use client";
import { useEffect } from "react";
import CircleButton from "../buttons/circleButton/circleButton";
import EntryList from "../entryList/entryList";
import Header from "../header/header";

interface DatePageProps {
    date: Date;
    setPage: Function;
    setTitle: Function;
}

const DatePage: React.FC<DatePageProps> = ({date, setPage, setTitle}) => {

  useEffect(()=>{
    setTitle(date.toDateString())
  }, [])

  return <div className="flex flex-col items-center pt-4">
    <div className="w-full">
        <EntryList setTitle={setTitle} date={date} setPage={setPage}/>
    </div>
  </div>;
};

export default DatePage;