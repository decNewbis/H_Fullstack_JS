import Grid from "@mui/material/Grid";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {addCourse} from "../../store/slices/courseSlice";
import styles from './_coursespage.module.scss';
import {Input} from "../../components/Input";
import {Textarea} from "../../components/Textarea";
import {Button} from "../../components/Button";
import {CourseCard} from "../../components/CourseCard";
import {useForm} from "./useForm";

export function CoursesPage() {
  const dispatch = useDispatch();
  const courseList = useSelector(state => state.courses.courseList);
  const {
    title, setTitle,
    author, setAuthor,
    link, setLink,
    description, setDescription,
    onChangeHandler
  } = useForm();

  const addCourseHandler = () => {
    const newCourse = {
      id: uuidv4(),
      title,
      author,
      link,
      description
    }
    dispatch(addCourse(newCourse));
    setTitle('');
    setAuthor('');
    setLink('');
    setDescription('');
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper_addition}>
        <div className={styles.container_addition}>
          <h1 className={styles.title}>Courses</h1>
          <Input className={styles.input} value={title}
                 onChange={(event) => onChangeHandler(event, setTitle)}
                 name="title" placeholder="Title" />
          <Input className={styles.input} value={author}
                 onChange={(event) => onChangeHandler(event, setAuthor)}
                 name="author" placeholder="Author" />
          <Input className={styles.input} value={link}
                 onChange={(event) => onChangeHandler(event, setLink)}
                 name="link" placeholder="Link to video" />
          <Textarea className={styles.input} value={description}
                 onChange={(event) => onChangeHandler(event, setDescription)}
                 name="description" placeholder="Description" />
          <Button onClick={addCourseHandler} type="button" theme={styles.button}>Add new course</Button>
        </div>
      </div>
      <div className={styles.wrapper_grid}>
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
                isAccessibleEditing={true}
              />
            ))
          }
        </Grid>
      </div>
    </section>
  );
}