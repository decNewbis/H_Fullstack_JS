const API_COMMENTS: string = "https://jsonplaceholder.typicode.com/comments";

interface RegExps {
  minimum8Chars: RegExp;
  withoutSpaces: RegExp;
  containsSymbols: RegExp;
  emailNamingRegExp: RegExp;
}

const REG_EXPS: RegExps = {
  minimum8Chars: /^.{8,15}$/,
  withoutSpaces: /^\S{8,15}$/,
  containsSymbols: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
  emailNamingRegExp: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
};

const enum ErrorMessages {
  FULL_NAME = 'The full name must contain at least 2 words and 2 characters in each word',
  PASSWORD = 'Password must contain at least one number, one letter, and one special character',
  EMAIL = 'Email is invalid'
}

const enum Links {
  HOMEPAGE = '/',
  REGISTRATION = '/registration',
  COURSES = '/courses',
  PROFILE = '/profile',
}

const enum Keys {
  KEY_NOTIFICATION_LINE_LOCAL_STORAGE = 'currentNotificationLineVisible',
}

export { API_COMMENTS, REG_EXPS, ErrorMessages, Links, Keys};