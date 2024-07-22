import {FC} from "react";
import {Link} from 'react-router-dom';
import playIcon from "../../assets/png/reviews/play.png";
import styles from "../RviewList/_reviews.module.scss"

interface ContentProps {
  courseName: string;
}

interface CourseProps {
  contentProps: ContentProps;
}

export const Course:FC<CourseProps> = ({contentProps}) => {
  const {courseName} = contentProps;
  return (
    <Link to="#" className={styles.course}>
      <img className={styles.play} src={playIcon} alt="illustration of play-icon"/>
      <span className={styles['course-name']}>{courseName}</span>
    </Link>
  );
};