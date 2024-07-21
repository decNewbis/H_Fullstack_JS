import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCourse, saveCourse} from "../../store/slices/courseSlice";
import {addToFavorite, deleteFromFavorite} from "../../store/slices/profileSlice";

export const useCourseAction = (courseContext) => {
  const {
    id, title, author, link, description,
    editTitle, setTitle, editAuthor, setAuthor,
    editLink, setLink, editDescription, setDescription
  } = courseContext;

  const [isEdit, setIsEdit] = useState(false);
  const initialIsFavoriteState = Boolean(
    useSelector(state => state.profile.favoriteList.find(item => item.id === id))
  );
  const [isFavorite, setIsFavorite] = useState(initialIsFavoriteState);
  const dispatch = useDispatch();

  const editHandler = () => {
    setTitle(title);
    setAuthor(author);
    setLink(link);
    setDescription(description);
    setIsEdit(!isEdit);
  };

  const saveHandler = () => {
    const editedCourse = {
      id,
      title: editTitle,
      author: editAuthor,
      link: editLink,
      description: editDescription
    }
    dispatch(saveCourse(editedCourse));
    setIsEdit(!isEdit);
  };

  const cancelHandler = () => {
    setIsEdit(!isEdit);
  };

  const deleteHandler = () => {
    dispatch(deleteCourse(id));
  };

  const addToFavoriteHandler = () => {
    dispatch(addToFavorite({id, title, author, link, description}));
    setIsFavorite(!isFavorite);
  };

  const deleteFromFavoriteHandler = () => {
    dispatch(deleteFromFavorite(id));
    setIsFavorite(!isFavorite);
  };

  return {
    isEdit, isFavorite,
    editHandler, saveHandler,
    cancelHandler, deleteHandler,
    addToFavoriteHandler, deleteFromFavoriteHandler
  }
};