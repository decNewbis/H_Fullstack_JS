import {useState, ChangeEvent} from "react";

type OnChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, func: (value: string) => void) => void;

interface UseFormResult {
  title: string;
  author: string;
  link: string;
  description: string;
  setTitle: (title: string) => void;
  setAuthor: (author: string) => void;
  setLink: (link: string) => void;
  setDescription: (description: string) => void;
  onChangeHandler: OnChangeHandler;
}

export const useForm = (): UseFormResult => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onChangeHandler: OnChangeHandler = (event, func) => {
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