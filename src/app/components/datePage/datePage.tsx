"use client";
import CircleButton from "../buttons/circleButton/circleButton";
import EntryList from "../entryList/entryList";
import Header from "../header/header";

interface DatePageProps {
    date: Date;
    setPage: Function;
}

const DatePage: React.FC<DatePageProps> = ({date, setPage}) => {
  return <div>
    <div>
        <EntryList date={date} setPage={setPage}/>
    </div>
  </div>;
};

export default DatePage;