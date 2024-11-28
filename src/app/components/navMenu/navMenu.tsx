"use client";
import React, { useEffect } from 'react';
import styles from "./navMenu.module.css";
import Calendar from '../calendar/calendar';
import Today from '../today/today';


interface NavMenuProps {
  setPage: Function;
  currentPage: React.JSX.Element;
}

const NavMenu: React.FC<NavMenuProps> = ({setPage, currentPage}) => {
  
  useEffect(() => {
  }, [])

  return <div className={styles.navMenu}>
    <div onClick={()=>{setPage(<Today/>)}} className={styles.navItem}>
      <i className={`fa fa-list ${styles.icon} ${currentPage.type.name == "Today" ? styles.active : "" }`}></i>
    </div>
    <div onClick={()=>{setPage(<Calendar/>)}} className={styles.navItem}>
      <i className={`fa fa-calendar ${styles.icon} ${currentPage.type.name == "Calendar" ? styles.active : "" }`}></i>
    </div>
  </div>;
};

export default NavMenu;