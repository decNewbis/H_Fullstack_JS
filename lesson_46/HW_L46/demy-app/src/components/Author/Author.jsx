import {getNameInitials} from "./functions";

export function Author({contentProps}) {
  const {author, sectionClassName} = contentProps;
  return (
    <div className={`${sectionClassName}__author`}>
      <span className={`${sectionClassName}__author-initials`}>{getNameInitials(author)}</span>
      <span className={`${sectionClassName}__author-name`}>{author}</span>
    </div>
  );
}