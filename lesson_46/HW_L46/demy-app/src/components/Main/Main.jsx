import "./_main.scss";
import {Partners} from "../Partners";
import {Reviews} from "../Rviews";

export function Main() {
  return (
    <main className="main">
      <div className="main__wrapper main__background-image">
        <div className="main__content">
          <h1 className="main__title">
            Jump into learning for less
          </h1>
          <p className="main__paragraph">
            If you are new to Demy, we've got good news: For a limited time, courses start at just €14.99 for new
            learners. Shop now!
          </p>
        </div>
      </div>
      <Partners />
      <Reviews />
    </main>
  );
}