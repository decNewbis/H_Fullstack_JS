import playIcon from "../../assets/png/reviews/play.png";

export function Course({contentProps}) {
  const {courseName, sectionClassName} = contentProps;
  return (
    <a href="#" className={`${sectionClassName}__course`}>
      <img className={`${sectionClassName}__play`} src={playIcon} alt="illustration of play-icon"/>
      <span className={`${sectionClassName}__course-name`}>{courseName}</span>
    </a>
  );
}