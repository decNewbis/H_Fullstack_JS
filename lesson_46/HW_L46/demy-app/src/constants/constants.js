const API_COMMENTS = "https://jsonplaceholder.typicode.com/comments";
const REG_EXPS = {
  minimum8Chars: /^.{8,15}$/,
  withoutSpaces: /^\S{8,15}$/,
  containsSymbols: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
  emailNamingRegExp: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
};
const ERROR_MESSAGES = {
  fullName: 'The full name must contain at least 2 words and 2 characters in each word',
  password: 'Password must contain at least one number, one letter, and one special character',
  email: 'Email is invalid'
}
const LINKS = {
  homepage: '/',
  registration: '/registration',
  courses: '/courses',
  profile: '/profile',
}
const KEYS = {
  keyNotificationLineLocalStorage: 'currentNotificationLineVisible'
}

export { API_COMMENTS, REG_EXPS, ERROR_MESSAGES, LINKS, KEYS};