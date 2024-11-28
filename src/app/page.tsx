"use client";
import { useEffect, useState } from "react";
import MainContent from "./components/mainContent/mainContent";
import NavMenu from "./components/navMenu/navMenu";
import Today from "./components/today/today";
import DatePage from "./components/datePage/datePage";
import Header from "./components/header/header";
import { useRouter } from "next/navigation";

export default function Home() {

  const [currentPage, setCurrentPage] = useState<JSX.Element>();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  function selectDate(date: Date){
    setCurrentPage(<DatePage date={date} setPage={setCurrentPage}/>)
  }

 
  const isLoggedIn = async () => {
    const userId = await localStorage.getItem('userId');
    return userId !== null;
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLoggedIn();
      if (!loggedIn) {
        router.push("/pages/login");
      } else {
        setCurrentPage(<Today setPage={setCurrentPage} />);
        setIsLoaded(true);
      }
    };

    checkLoginStatus();
  }, []);

  if(isLoaded){ return (
    <div className="h-screen flex flex-col">
      <Header title=""/>
      <MainContent content={currentPage}/>
      <NavMenu currentPage={currentPage!} setPage={setCurrentPage} goDatePage={selectDate}/>
    </div>
  )}else return(
    <div>
    </div>
  )
}
