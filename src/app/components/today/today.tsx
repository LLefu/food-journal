"use client";
import CircleButton from "../buttons/circleButton/circleButton";
import EntryList from "../entryList/entryList";
import Header from "../header/header";

interface TodayProps {
  setPage: Function;
}

const Today: React.FC<TodayProps> = ({setPage}) => {
  return <div>
    <Header title="Today"/>
    <div>
        <EntryList setPage={setPage} date={new Date()}/>
    </div>
  </div>;
};

export default Today;