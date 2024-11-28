import styles from "./header.module.css";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return <div className={styles.header}>
    {title}
  </div>;
};

export default Header;