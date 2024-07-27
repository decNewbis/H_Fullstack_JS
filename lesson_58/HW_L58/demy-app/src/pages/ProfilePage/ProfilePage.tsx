import {FC} from "react";
import {CourseCard} from "../../components/CourseCard";
import Grid from "@mui/material/Grid";
import {useSelector} from "react-redux";
import styles from "./_profilepdage.module.scss";
import {RootState} from "../../store";

export const ProfilePage: FC = () => {
  const {firstName, lastName, favoriteList} = useSelector((state: RootState) => state.profile);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Profile: {firstName} {lastName}</h1>
        <h2 className={styles.sub_title}>Favorite courses:</h2>
        <Grid container spacing={2} alignItems="start" justifyContent="center">
          {
            favoriteList?.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                author={course.author}
                link={course.link}
                description={course.description}
              />
            ))
          }
        </Grid>
      </div>
    </section>
  );
};