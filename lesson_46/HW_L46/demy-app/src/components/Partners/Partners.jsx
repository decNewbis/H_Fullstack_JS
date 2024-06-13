import "./_partners.scss";
import "./_media-partners.scss";

import {images} from "./importImages";

const companiesLogo = [
  {srcLogo: "vw.png", name: "volkswagen"},
  {srcLogo: "samsung.png", name: "samsung"},
  {srcLogo: "cisco.png", name: "cisco"},
  {srcLogo: "at_t.png", name: "at&t"},
  {srcLogo: "p_g.png", name: "p&g"},
  {srcLogo: "hp.png", name: "hp"},
  {srcLogo: "citi.png", name: "citi"},
  {srcLogo: "ericsson.png", name: "ericsson"},
]

export function Partners() {

  return (
    <section className="partners">
      <div className="partners__wrapper">
        <h2 className="partners__content">
          Trusted by over 16,000 companies and millions of learners around the world
        </h2>
        <ul className="partners__list">
          {
            companiesLogo.map(({srcLogo, name}) => {
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