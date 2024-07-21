import {useNavigate, Link} from "react-router-dom";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {useForm} from "./useForm";
import {LINKS} from "../../constants";
import styles from "./_sign-up.module.scss";

export function SignUp() {

  const navigate = useNavigate();
  const {
    fullName, email, password,
    isButtonDisabled, formErrors,
    onChangeFullName, onChangePassword, onChangeEmail,
    handleFocusOut
  } = useForm();

  function handleSubmit(event) {
    event.preventDefault();
    console.log('send form...');
    navigate(LINKS.homepage);
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
                 type="text" name="fullName"
                 placeholder="Full name
                 " />
          {formErrors.fullName && <p>{formErrors.fullName}</p>}
          <Input value={email}
                 onChange={onChangeEmail}
                 onBlur={handleFocusOut}
                 className={styles.input}
                 type="email" name="email"
                 placeholder="Email"
          />
          {formErrors.email && <p>{formErrors.email}</p>}
          <Input value={password}
                 onChange={onChangePassword}
                 onBlur={handleFocusOut}
                 className={styles.input}
                 type="password" name="password"
                 placeholder="Password"
          />
          {formErrors.password && <p>{formErrors.password}</p>}
          <div className={styles.indicatorBar}>
            <span className={styles.indicator}></span>
            <span className={styles.indicator}></span>
            <span className={styles.indicator}></span>
            <span className={styles.indicator}></span>
          </div>
          <Input type="checkbox" name="checkbox">
            Send me special offers, personalized recommendations, and learning tips.
          </Input>
          <Button type="button" theme={styles.submit} disabled={isButtonDisabled}>Sign up</Button>
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
}