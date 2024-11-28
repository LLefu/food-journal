"use client";
import { useEffect, useState } from "react";
import MainContent from "./components/mainContent/mainContent";
import NavMenu from "./components/navMenu/navMenu";
import Today from "./components/today/today";

export default function Home() {

  const [currentPage, setCurrentPage] = useState(<Today/>);

  return (
    <div className="h-screen flex flex-col">
      <MainContent content={currentPage}/>
      <NavMenu currentPage={currentPage} setPage={setCurrentPage}/>
    </div>
  );
}
