"use client";
import { useEffect } from "react";
import CircleButton from "../buttons/circleButton/circleButton";
import EntryList from "../entryList/entryList";
import Header from "../header/header";

interface TodayProps {
  setPage: Function;
  setTitle: Function;
}

const Today: React.FC<TodayProps> = ({setPage, setTitle}) => {

  useEffect(()=>{
    setTitle("Today");
  },[])


  return <div className="pt-4">
    <EntryList setTitle={setTitle} setPage={setPage} date={new Date()}/>
  </div>
};

export default Today;