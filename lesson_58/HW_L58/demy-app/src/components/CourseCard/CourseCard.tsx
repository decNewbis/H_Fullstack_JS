import {FC} from "react";
import {Link} from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import ButtonMui from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {useForm} from "../../pages/CoursesPage/useForm";
import styles from "../../pages/CoursesPage/_coursespage.module.scss";
import {Input} from "../Input";
import {Textarea} from "../Textarea";
import {useCourseAction} from "./useCourseAction";

interface CourseCardProps {
  id: string;
  title: string;
  author: string;
  link: string;
  description: string;
  isAccessibleEditing?: Boolean;
}

export const CourseCard:FC<CourseCardProps> = (
  {
    id,
    title,
    author,
    link,
    description,
    isAccessibleEditing=false
  }) => {
  const {
    title: editTitle, setTitle,
    author: editAuthor, setAuthor,
    link: editLink, setLink,
    description: editDescription, setDescription,
    onChangeHandler
  } = useForm();

  const courseContext = {
    id, title, author, link, description,
    editTitle, setTitle, editAuthor, setAuthor,
    editLink, setLink, editDescription, setDescription
  }

  const {
    isEdit, isFavorite,
    editHandler, saveHandler,
    cancelHandler, deleteHandler,
    addToFavoriteHandler, deleteFromFavoriteHandler
  } = useCourseAction(courseContext);

  return (
    <Grid item xs={6} md={4} >
      <Card sx={{ maxWidth: 360, minWidth: 310 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            { isEdit
              ? <Input className={styles.input} value={editTitle}
                             onChange={(event) => onChangeHandler(event, setTitle)}
                             name="title" placeholder="Title" />
              : title }
          </Typography>
          <Typography paragraph sx={{ mb: 1.5 }} color="text.secondary">
            { isEdit
              ? <Input className={styles.input} value={editAuthor}
                      onChange={(event) => onChangeHandler(event, setAuthor)}
                      name="author" placeholder="Author" />
              : author }
          </Typography>
          <Typography paragraph>
            { isEdit
              ? <Textarea value={editDescription} rows={5} cols={30}
                             onChange={(event) => onChangeHandler(event, setDescription)}
                             name="description" placeholder="Description" />
              : description }
          </Typography>
        </CardContent>
        <CardActions>
          { isAccessibleEditing
            ? <ButtonGroup aria-label="edit bar">
              { !isEdit ? <EditIcon onClick={editHandler} /> : null }
              { !isEdit ? <DeleteForeverIcon onClick={deleteHandler} /> : null }
              { isEdit ? <SaveIcon onClick={saveHandler} /> : null}
              { isEdit ? <CancelIcon onClick={cancelHandler} /> : null}
            </ButtonGroup>
            : null }
          <IconButton onClick={!isFavorite ? addToFavoriteHandler : deleteFromFavoriteHandler}
                      aria-label="add to favorites">
            { !isEdit
              ? <FavoriteIcon
                              color={isFavorite ? "secondary" : "disabled"} />
              : null }
          </IconButton>
          {
            isEdit
              ? <Input className={styles.input} value={editLink}
                       onChange={(event) => onChangeHandler(event, setLink)}
                       name="link" placeholder="Link to video" />
              : <ButtonMui size="small">
                  <Link to={link} target="_blank" rel="noopener noreferrer">watch the video</Link>
                </ButtonMui>
          }
        </CardActions>
      </Card>
    </Grid>
  );
};