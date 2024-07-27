import {useEffect, useState, ChangeEvent} from "react";
import {isFullNameValid, isPasswordValid, isEmailValid} from "./validationForm";
import {ErrorMessages} from "../../constants";

type OnChangeType = ChangeEvent<HTMLInputElement>;

interface FormErrorsTypes {
  fullName: string | ErrorMessages;
  email: string | ErrorMessages;
  password: string | ErrorMessages;
}

interface UseFormResult {
  fullName: string;
  email: string;
  password: string;
  isButtonDisabled: boolean;
  isFocused: boolean;
  formErrors: FormErrorsTypes;
  onChangeFullName: (event: OnChangeType) => void;
  onChangePassword: (event: OnChangeType) => void;
  onChangeEmail: (event: OnChangeType) => void;
  handleFocusOut: () => void;
}

const useForm = (): UseFormResult => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrorsTypes>({
    fullName: '',
    email: '',
    password: ''
  });
  const [submitEnable, setSubmitEnable] = useState({
    fullName: false,
    email: false,
    password: false
  });

  useEffect(() => {
    const error: FormErrorsTypes = {
      fullName: (fullName !== '') ? isFullNameValid(fullName) : '',
      email: (email !== '') ? isEmailValid(email) : '',
      password: (password !== '') ? isPasswordValid(password) : ''
    };
    const allSubmitEnable = Object.values(submitEnable).every(Boolean);
    const errorNotExists = Object.values(error).every((element) => element === '');
    const allValid = allSubmitEnable && errorNotExists;
    !isFocused && setFormErrors(error);
    setIsButtonDisabled(!allValid);
  }, [submitEnable, isFocused]);

  const onChangeFullName = (event: OnChangeType) => {
    const value = event.target.value;
    if (value.length < 25) {
      setFullName(value);
    }
    setSubmitEnable({...submitEnable, fullName: isFullNameValid(value) === ''});
    setIsFocused(true);
  };

  const onChangePassword = (event: OnChangeType) => {
    const value = event.target.value;
    if (value.length < 15) {
      setPassword(value);
    }
    setSubmitEnable({...submitEnable, password: isPasswordValid(value) === ''});
    setIsFocused(true);
  };

  const onChangeEmail = (event: OnChangeType) => {
    const value = event.target.value;
    if (value.length < 25) {
      setEmail(value);
    }
    setSubmitEnable({...submitEnable, email: isEmailValid(value) === ''});
    setIsFocused(true);
  };

  const handleFocusOut = () => setIsFocused(false);

  return {
    fullName, email, password,
    isButtonDisabled, isFocused, formErrors,
    onChangeFullName, onChangePassword, onChangeEmail,
    handleFocusOut
  };
};

export {useForm};