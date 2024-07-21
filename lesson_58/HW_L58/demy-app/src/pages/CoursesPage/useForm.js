import {useState} from "react";

export const useForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const onChangeHandler = (event, func) => {
    const value = event.target.value;
    if (value.length <= 200) {
      func(value);
    }
  };

  return {
    title, setTitle,
    author, setAuthor,
    link, setLink,
    description, setDescription,
    onChangeHandler
  }
};