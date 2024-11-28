"use client";
import styles from "./navMenu.module.css";
import Calendar from '../calendar/calendar';
import Today from '../today/today';


interface NavMenuProps {
  setPage: Function;
  currentPage: React.JSX.Element;
  goDatePage: Function;
}

const NavMenu: React.FC<NavMenuProps> = ({setPage, currentPage, goDatePage}) => {

  return <div className={styles.navMenu}>
    <div onClick={()=>{setPage(<Today setPage={setPage}/>)}} className={styles.navItem}>
      <i className={`fa fa-list ${styles.icon} ${currentPage.type.name == "Today" ? styles.active : "" }`}></i>
    </div>
    <div onClick={()=>{setPage(<Calendar setDate={goDatePage}/>)}} className={styles.navItem}>
      <i className={`fa fa-calendar ${styles.icon} ${currentPage.type.name == "Calendar" ? styles.active : "" }`}></i>
    </div>
  </div>;
};

export default NavMenu;