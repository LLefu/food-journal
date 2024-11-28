"use client";
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react';
import styles from "./mainContent.module.css";


interface MainContentProps {
    content: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({content}) => {
  return <div className={styles.mainContent}>
    {content}
  </div>;
};

export default MainContent;