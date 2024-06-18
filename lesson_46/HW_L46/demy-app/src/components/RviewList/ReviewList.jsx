import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {reviewsDb} from "./reviewsDb";
import {Review} from "../Review";
import 'swiper/css/navigation';
import "./_reviews.scss";
import 'swiper/css';


export function ReviewList() {
  const sectionClassName = 'reviews';
  return (
    <section className={sectionClassName}>
      <div className={`${sectionClassName}__wrapper`}>
        <h2 className={`${sectionClassName}__title`}>How learners like you are achieving their goals</h2>
        <Swiper slidesPerView={3}
                loop={true}
                centeredSlides={true}
                spaceBetween={200}
                pagination={{
                  type: 'fraction',
                }}
                navigation={true}
                modules={[Navigation]}
                className={`${sectionClassName}__swiper`}>
          {reviewsDb.map(({text, author, courseName, key}) => {
            const contentProps = {text, author, courseName, sectionClassName}
            return (
              <SwiperSlide key={key}>
                <Review contentProps={contentProps} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}