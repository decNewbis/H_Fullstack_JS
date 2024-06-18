import quoteIcon from "../../assets/png/reviews/quotes.png";
import {Author} from "../Author";
import {Course} from "../Course";

export function Review({contentProps}) {
  const {text, sectionClassName} = contentProps;
  return (
    <div className={`${sectionClassName}__container`}>
      <div>
        <img className={`${sectionClassName}__quote`} src={quoteIcon} alt="illustation of quote"/>
        <span className={`${sectionClassName}__text`}>{text}</span>
      </div>
      <div>
        <Author contentProps={contentProps} />
        <hr className={`${sectionClassName}__dividing-line`}/>
        <Course contentProps={contentProps} />
      </div>
    </div>
  );
}