"use client";
import styles from "./navMenu.module.css";
import Calendar from '../calendar/calendar';
import Today from '../today/today';
import { useState } from "react";

interface NavMenuProps {
  setPage: Function;
  currentPage: React.JSX.Element;
  goDatePage: Function;
  setTitle: Function;
}

const NavMenu: React.FC<NavMenuProps> = ({setPage, currentPage, goDatePage, setTitle}) => {
  const [pageSwitcher, setPageSwitcher] = useState(true);

  return <div className={styles.navMenu}>
    <div onClick={()=>{setPage(<Today setTitle={setTitle} setPage={setPage}/>); setPageSwitcher(true)}} className={styles.navItem}>
      <i className={`fa fa-list ${styles.icon} ${pageSwitcher ? styles.isPage : "" }`}></i>
    </div>
    <div onClick={()=>{setPage(<Calendar setDate={goDatePage} setTitle={setTitle} />); setPageSwitcher(false); }} className={styles.navItem}>
      <i className={`fa fa-calendar ${styles.icon} ${!pageSwitcher ? styles.isPage : "" }`}></i>
    </div>
  </div>;
};

export default NavMenu;