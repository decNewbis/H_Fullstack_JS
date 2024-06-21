import {useEffect, useState} from "react";
import {Button} from "../Button";
import {Input} from "../Input";
import {REG_EXPS} from "../../constants";
import "./_sign-up.scss";



export function SignUp({onClick}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
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
      fullName: isFullNameValid(fullName),
      email: isEmailValid(email),
      password: isPasswordValid(password)
    };
    const allValid = Object.values(submitEnable).every(Boolean);
    setFormErrors(error);
    setIsButtonDisabled(!allValid);
  }, [submitEnable]);

  function handleSubmit(event) {
    event.preventDefault();
    onClick();
  }

  function onChangeFullName(event) {
    const value = event.target.value;
    if (value.length < 25) {
      setFullName(value);
    }
    setSubmitEnable({...submitEnable, fullName: isFullNameValid(value) === ''});
  }

  function onChangePassword(event) {
    const value = event.target.value;
    if (value.length < 15) {
      setPassword(value);
    }

    setSubmitEnable({...submitEnable, password: isPasswordValid(value) === ''});
  }

  function onChangeEmail(event) {
    const value = event.target.value;
    if (value.length < 25) {
      setEmail(value);
    }
    setSubmitEnable({...submitEnable, email: isEmailValid(value) === ''});
  }

  function isFullNameValid(value) {
    const words = value.split(' ');
    const isLengthMoreThenTwo = words.every((word) => word.length >= 2);
    if (words.length >= 2 && isLengthMoreThenTwo) {
      return '';
    }
    return 'The full name must contain at least 2 words and 2 characters in each word'
  }

  function isPasswordValid(value) {
    if(
      REG_EXPS.minimum8Chars.test(value) &&
      REG_EXPS.withoutSpaces.test(value) &&
      REG_EXPS.containsSymbols.test(value)
    ){
      return '';
    }
    return 'Password must contain at least one number, one letter, and one special character';
  }

  function isEmailValid(value) {
    if (REG_EXPS.emailNamingRegExp.test(value)) {
      return '';
    }
    return 'Email is invalid';
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <span className="close" onClick={onClick}>&times;</span>
        <h2 className="modal__title">Sign up and start learning</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <Input value={fullName}
                 onChange={onChangeFullName}
                 className="modal__input"
                 type="text" name="fullName"
                 placeholder="Full name
                 " />
          {formErrors.fullName && <p>{formErrors.fullName}</p>}
          <Input value={email}
                 onChange={onChangeEmail}
                 className="modal__input"
                 type="email" name="email"
                 placeholder="Email"
          />
          {formErrors.email && <p>{formErrors.email}</p>}
          <Input value={password}
                 onChange={onChangePassword}
                 className="modal__input"
                 type="password" name="password"
                 placeholder="Password"
          />
          {formErrors.password && <p>{formErrors.password}</p>}
          <div className="modal__indicator-bar">
            <span className="modal__indicator"></span>
            <span className="modal__indicator"></span>
            <span className="modal__indicator"></span>
            <span className="modal__indicator"></span>
          </div>
          <Input className="modal__checkbox" type="checkbox" name="checkbox">
            Send me special offers, personalized recommendations, and learning tips.
          </Input>
          <Button type="button" theme="modal__submit" disabled={isButtonDisabled}>Sign up</Button>
        </form>
        <div className="modal__helpers">
          <span className="modal__text">
            By signing up, you agree to our{' '}
            <a href="#">Terms of Use</a>
            {' '}and{' '}
            <a href="#">Privacy Policy</a>
            .
          </span>
          <span className="modal__options">
            Already have an account?{' '}
            <a href="#">Log in</a>
          </span>
        </div>
      </div>
    </div>
  );
}