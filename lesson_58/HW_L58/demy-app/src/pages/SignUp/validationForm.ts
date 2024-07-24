import {ErrorMessages, REG_EXPS} from "../../constants";

function isFullNameValid(value: string): string | ErrorMessages {
  const words = value.split(' ');
  const isLengthMoreThenTwo = words.every((word) => word.length >= 2);
  return (words.length >= 2 && isLengthMoreThenTwo) ? '' : ErrorMessages.FULL_NAME;
}

function isPasswordValid(value: string): string | ErrorMessages {
  const isValid = (
    REG_EXPS.minimum8Chars.test(value) &&
    REG_EXPS.withoutSpaces.test(value) &&
    REG_EXPS.containsSymbols.test(value)
  )
  return isValid ? '' : ErrorMessages.PASSWORD;
}

function isEmailValid(value: string): string | ErrorMessages {
  return (REG_EXPS.emailNamingRegExp.test(value)) ? '' : ErrorMessages.EMAIL;
}

export {isFullNameValid, isPasswordValid, isEmailValid};