import styles from "./circleButton.module.css";

interface CircleButtonProps {
    icon: string;
}

const CircleButton: React.FC<CircleButtonProps> = ({icon}) => {
  return <div className={styles.circleButton}>
    <i className={`fa-${icon} fa`}></i>
  </div>;
};

export default CircleButton;