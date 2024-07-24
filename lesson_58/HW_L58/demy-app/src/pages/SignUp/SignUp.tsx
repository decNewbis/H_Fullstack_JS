import {FC, FormEvent} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {useForm} from "./useForm";
import {ButtonType, InputType, Links} from "../../constants";
import styles from "./_sign-up.module.scss";

type HandleSubmit = FormEvent<HTMLFormElement>

export const SignUp: FC = () => {

  const navigate = useNavigate();
  const {
    fullName, email, password,
    isButtonDisabled, formErrors,
    onChangeFullName, onChangePassword, onChangeEmail,
    handleFocusOut
  } = useForm();

  function handleSubmit(event: HandleSubmit) {
    event.preventDefault();
    console.log('send form...');
    navigate(Links.HOMEPAGE);
  }

  return (
    <div className={styles['sign-up']}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sign up and start learning</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input value={fullName}
                 onChange={onChangeFullName}
                 onBlur={handleFocusOut}
                 className={styles.input}
                 type={InputType.TEXT} name="fullName"
                 placeholder="Full name
                 " />
          {formErrors.fullName && <p>{formErrors.fullName}</p>}
          <Input value={email}
                 onChange={onChangeEmail}
                 onBlur={handleFocusOut}
                 className={styles.input}
                 type={InputType.EMAIL} name="email"
                 placeholder="Email"
          />
          {formErrors.email && <p>{formErrors.email}</p>}
          <Input value={password}
                 onChange={onChangePassword}
                 onBlur={handleFocusOut}
                 className={styles.input}
                 type={InputType.PASSWORD} name="password"
                 placeholder="Password"
          />
          {formErrors.password && <p>{formErrors.password}</p>}
          <div className={styles.indicatorBar}>
            <span className={styles.indicator}></span>
            <span className={styles.indicator}></span>
            <span className={styles.indicator}></span>
            <span className={styles.indicator}></span>
          </div>
          <Input type={InputType.CHECKBOX} name="checkbox" value=''>
            Send me special offers, personalized recommendations, and learning tips.
          </Input>
          <Button type={ButtonType.BUTTON} theme={styles.submit} disabled={isButtonDisabled}>Sign up</Button>
        </form>
        <div className={styles.helpers}>
          <span className={styles.text}>
            By signing up, you agree to our{' '}
            <Link to="#">Terms of Use</Link>
            {' '}and{' '}
            <Link to="#">Privacy Policy</Link>
            .
          </span>
          <span className={styles.options}>
            Already have an account?{' '}
            <Link to='#'>Log in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};