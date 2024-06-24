import {Button} from "../Button";
import {Input} from "../Input";
import {useForm} from "./useForm";
import "./_sign-up.scss";

export function SignUp({onClick}) {

  const {
    fullName, email, password,
    isButtonDisabled, formErrors,
    onChangeFullName, onChangePassword, onChangeEmail,
    handleFocusOut
  } = useForm();

  function handleSubmit(event) {
    event.preventDefault();
    console.log('send form...');
    onClick();
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <span className="close" onClick={onClick}>&times;</span>
        <h2 className="modal__title">Sign up and start learning</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <Input value={fullName}
                 onChange={onChangeFullName}
                 onBlur={handleFocusOut}
                 className="modal__input"
                 type="text" name="fullName"
                 placeholder="Full name
                 " />
          {formErrors.fullName && <p>{formErrors.fullName}</p>}
          <Input value={email}
                 onChange={onChangeEmail}
                 onBlur={handleFocusOut}
                 className="modal__input"
                 type="email" name="email"
                 placeholder="Email"
          />
          {formErrors.email && <p>{formErrors.email}</p>}
          <Input value={password}
                 onChange={onChangePassword}
                 onBlur={handleFocusOut}
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