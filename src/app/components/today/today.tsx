"use client";
import CircleButton from "../buttons/circleButton/circleButton";
import EntryList from "../entryList/entryList";
import Header from "../header/header";

interface TodayProps {
  setPage: Function;
}

const Today: React.FC<TodayProps> = ({setPage}) => {

  return <EntryList setPage={setPage} date={new Date()}/>
};

export default Today;