"use client";
import styles from "./navMenu.module.css";
import Calendar from '../calendar/calendar';
import Today from '../today/today';
import { useEffect } from "react";


interface NavMenuProps {
  setPage: Function;
  currentPage: React.JSX.Element;
  goDatePage: Function;
  setTitle: Function;
}

const NavMenu: React.FC<NavMenuProps> = ({setPage, currentPage, goDatePage, setTitle}) => {

  return <div className={styles.navMenu}>
    <div onClick={()=>{setPage(<Today setTitle={setTitle} setPage={setPage}/>); setTitle("Today")}} className={styles.navItem}>
      <i className={`fa fa-list ${styles.icon} ${currentPage.type.name == "Today" ? styles.isPage : "" }`}></i>
    </div>
    <div onClick={()=>{setPage(<Calendar setDate={goDatePage}/>); setTitle("Calendar")}} className={styles.navItem}>
      <i className={`fa fa-calendar ${styles.icon} ${currentPage.type.name == "Calendar" ? styles.isPage : "" }`}></i>
    </div>
  </div>;
};

export default NavMenu;