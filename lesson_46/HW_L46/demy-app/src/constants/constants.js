const API_COMMENTS = "https://jsonplaceholder.typicode.com/comments";
const REG_EXPS = {
  minimum8Chars: /^.{8,15}$/,
  withoutSpaces: /^\S{8,15}$/,
  containsSymbols: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
  emailNamingRegExp: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
};

export { API_COMMENTS, REG_EXPS};