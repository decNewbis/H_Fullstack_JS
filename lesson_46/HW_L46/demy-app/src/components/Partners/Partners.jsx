import "./_partners.scss";
import "./_media-partners.scss";

import {images} from "./importImages";

import {companiesLogoDb} from "./companiesLogoDb";

export function Partners() {

  return (
    <section className="partners">
      <div className="partners__wrapper">
        <h2 className="partners__content">
          Trusted by over 16,000 companies and millions of learners around the world
        </h2>
        <ul className="partners__list">
          {
            companiesLogoDb.map(({srcLogo, name}) => {
              return (
                <li key={name}>
                  <img className="partners__logo" src={images[srcLogo]} alt={name}/>
                </li>
              );
            })
          }
        </ul>
      </div>
    </section>
  );
}