import {CourseCard} from "../../components/CourseCard";
import Grid from "@mui/material/Grid";
import {useSelector} from "react-redux";
import styles from "./_profilepdage.module.scss";


export function ProfilePage() {
  const firstName = useSelector(state => state.profile.firstName);
  const lastName = useSelector(state => state.profile.lastName);
  const courseList = useSelector(state => state.profile.favoriteList);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Profile: {firstName} {lastName}</h1>
        <h2 className={styles.sub_title}>Favorite courses:</h2>
        <Grid container spacing={2} alignItems="start" justifyContent="center">
          {
            courseList?.map((course) => (
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
}