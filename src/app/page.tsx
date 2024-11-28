"use client";
import { useEffect, useState } from "react";
import MainContent from "./components/mainContent/mainContent";
import NavMenu from "./components/navMenu/navMenu";
import Today from "./components/today/today";
import DatePage from "./components/datePage/datePage";

export default function Home() {

  const [currentPage, setCurrentPage] = useState<JSX.Element>();
  const [isLoaded, setIsLoaded] = useState(false);

  function selectDate(date: Date){
    setCurrentPage(<DatePage date={date} setPage={setCurrentPage}/>)
  }

  useEffect(() => {
    setCurrentPage(<Today setPage={setCurrentPage}/>)
    setIsLoaded(true);
  }, [])

  if(isLoaded){ return (
    <div className="h-screen flex flex-col">
      <MainContent content={currentPage}/>
      <NavMenu currentPage={currentPage!} setPage={setCurrentPage} goDatePage={selectDate}/>
    </div>
  )}else return(
    <div>
    </div>
  )
}
