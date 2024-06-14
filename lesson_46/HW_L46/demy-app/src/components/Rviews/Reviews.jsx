import 'swiper/css/navigation';
import "./_reviews.scss";
import 'swiper/css';

import quoteIcon from "../../assets/png/reviews/quotes.png";
import playIcon from "../../assets/png/reviews/play.png"

import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';

import {reviewsDb} from "./reviewsDb";

function getNameInitials(value) {
  return value.split(' ').map((word) => word[0].toUpperCase()).join('');
}

export function Reviews() {
  return (
    <section className="reviews">
      <div className="reviews__wrapper">
        <h2 className="reviews__title">How learners like you are achieving their goals</h2>
        <Swiper slidesPerView={3}
                loop={true}
                centeredSlides={true}
                spaceBetween={200}
                pagination={{
                  type: 'fraction',
                }}
                navigation={true}
                modules={[Navigation]}
                className="reviews__swiper">
          {reviewsDb.map(({text, author, courseName, key}) => {
            return (
              <SwiperSlide key={key}>
                <div className="reviews__container">
                  <img className="reviews__quote" src={quoteIcon} alt="illustation of quote"/>
                  <span className="reviews__text">{text}</span>
                  <div className="reviews__author">
                    <span className="reviews__author-initials">{getNameInitials(author)}</span>
                    <span className="reviews__author-name">{author}</span>
                  </div>
                  <hr className="reviews__dividing-line"/>
                  <a href="#" className="reviews__course">
                    <img className="reviews__play" src={playIcon} alt="illustration of play-icon"/>
                    <span className="reviews__course-name">{courseName}</span>
                  </a>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}