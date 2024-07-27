import {useState} from "react";
import {RootState} from "../../store"
import {useDispatch, useSelector} from "react-redux";
import {deleteCourse, saveCourse} from "../../store/slices/courseSlice";
import {addToFavorite, deleteFromFavorite} from "../../store/slices/profileSlice";

interface CourseContextProps {
  id: string,
  title: string,
  author: string,
  link: string,
  description: string,
  editTitle:string,
  setTitle:(title: string) => void,
  editAuthor:string,
  setAuthor:(author: string) => void,
  editLink:string,
  setLink:(link: string) => void,
  editDescription:string,
  setDescription:(description: string) => void,
}

interface UseCourseActionResult {
  isEdit: boolean,
  isFavorite: boolean,
  editHandler: () => void,
  saveHandler: () => void,
  cancelHandler: () => void,
  deleteHandler: () => void,
  addToFavoriteHandler: () => void,
  deleteFromFavoriteHandler: () => void,
}

export const useCourseAction = (courseContext: CourseContextProps): UseCourseActionResult => {
  const {
    id, title, author, link, description,
    editTitle, setTitle, editAuthor, setAuthor,
    editLink, setLink, editDescription, setDescription
  } = courseContext;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const initialIsFavoriteState = Boolean(
    useSelector((state: RootState) => state.profile.favoriteList.find(item => item.id === id))
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(initialIsFavoriteState);
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