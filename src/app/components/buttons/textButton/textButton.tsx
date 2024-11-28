import styles from "./textButton.module.css";

interface TextButtonProps {
    text: string;
}

const TextButton: React.FC<TextButtonProps> = ({text}) => {
  return <div className={styles.textButton}>
    {text}
  </div>;
};

export default TextButton;