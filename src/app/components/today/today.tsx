"use client";
import CircleButton from "../buttons/circleButton/circleButton";
import EntryList from "../entryList/entryList";
import Header from "../header/header";

interface TodayProps {
}

const Today: React.FC<TodayProps> = ({}) => {
  return <div>
    <Header title="Today"/>
    <div>
        <EntryList/>
    </div>
    <div className="w-full">
        <CircleButton icon="plus"/>
    </div>
  </div>;
};

export default Today;