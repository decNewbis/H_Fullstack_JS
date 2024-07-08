import {ERROR_MESSAGES, REG_EXPS} from "../../constants";

function isFullNameValid(value) {
  const words = value.split(' ');
  const isLengthMoreThenTwo = words.every((word) => word.length >= 2);
  return (words.length >= 2 && isLengthMoreThenTwo) ? '' : ERROR_MESSAGES.fullName;
}

function isPasswordValid(value) {
  const isValid = (
    REG_EXPS.minimum8Chars.test(value) &&
    REG_EXPS.withoutSpaces.test(value) &&
    REG_EXPS.containsSymbols.test(value)
  )
  return isValid ? '' : ERROR_MESSAGES.password;
}

function isEmailValid(value) {
  return (REG_EXPS.emailNamingRegExp.test(value)) ? '' : ERROR_MESSAGES.email;
}

export {isFullNameValid, isPasswordValid, isEmailValid};