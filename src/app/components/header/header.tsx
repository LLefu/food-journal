import styles from "./header.module.css";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return <div className={styles.header}>
    <div><i className="fa fa-circle"></i></div>
    <p className="ps-2">{title}</p>
  </div>;
};

export default Header;