import {FC} from "react";
import Grid from "@mui/material/Grid";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {addCourse} from "../../store/slices/courseSlice";
import {ButtonType} from "../../constants";
import styles from './_coursespage.module.scss';
import {Input} from "../../components/Input";
import {Textarea} from "../../components/Textarea";
import {Button} from "../../components/Button";
import {CourseCard} from "../../components/CourseCard";
import {useForm} from "./useForm";
import {RootState} from "../../store";

interface Course {
  id: string;
  title: string;
  author: string;
  link: string;
  description: string;
}

export const CoursesPage: FC = () => {
  const dispatch = useDispatch();
  const courseList = useSelector((state: RootState) => state.courses.courseList);
  const {
    title, setTitle,
    author, setAuthor,
    link, setLink,
    description, setDescription,
    onChangeHandler
  } = useForm();

  const addCourseHandler = () => {
    const newCourse: Course = {
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
          <Input data-testid="titleInput" className={styles.input} value={title}
                 onChange={(event) => onChangeHandler(event, setTitle)}
                 name="title" placeholder="Title" />
          <Input data-testid="authorInput" className={styles.input} value={author}
                 onChange={(event) => onChangeHandler(event, setAuthor)}
                 name="author" placeholder="Author" />
          <Input data-testid="linkInput" className={styles.input} value={link}
                 onChange={(event) => onChangeHandler(event, setLink)}
                 name="link" placeholder="Link to video" />
          <Textarea data-testid="descriptionInput" className={styles.input} value={description}
                 onChange={(event) => onChangeHandler(event, setDescription)}
                 name="description" placeholder="Description" />
          <Button data-testid="addNewCourseButton" onClick={addCourseHandler} type={ButtonType.BUTTON} theme={styles.button}>
            Add new course
          </Button>
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
};