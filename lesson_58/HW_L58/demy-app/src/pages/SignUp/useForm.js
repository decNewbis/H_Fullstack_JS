import {useEffect, useState} from "react";
import {isFullNameValid, isPasswordValid, isEmailValid} from "./validationForm";

const useForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [formErrors, setFormErrors] = useState({
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
    const error = {
      fullName: fullName !== '' && isFullNameValid(fullName),
      email: email !== '' && isEmailValid(email),
      password: password !== '' && isPasswordValid(password)
    };
    const allSubmitEnable = Object.values(submitEnable).every(Boolean);
    const errorNotExists = Object.values(error).every((element) => element === '');
    const allValid = allSubmitEnable && errorNotExists;
    !isFocused && setFormErrors(error);
    setIsButtonDisabled(!allValid);
  }, [submitEnable, isFocused]);

  const onChangeFullName = (event) => {
    const value = event.target.value;
    if (value.length < 25) {
      setFullName(value);
    }
    setSubmitEnable({...submitEnable, fullName: isFullNameValid(value) === ''});
    setIsFocused(true);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    if (value.length < 15) {
      setPassword(value);
    }
    setSubmitEnable({...submitEnable, password: isPasswordValid(value) === ''});
    setIsFocused(true);
  };

  const onChangeEmail = (event) => {
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