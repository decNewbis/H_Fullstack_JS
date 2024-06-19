import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {Review} from "../Review";
import {useGetDataFromUrl} from "../../hooks";
import 'swiper/css/navigation';
import "./_reviews.scss";
import 'swiper/css';


export function ReviewList() {
  const sectionClassName = 'reviews';
  const urlData = "https://jsonplaceholder.typicode.com/comments";
  let [reviewsDb, error] = useGetDataFromUrl(urlData);

  if (error) {
    return (
      <h2>Smth wrong: {error}</h2>
    );
  }
  if (reviewsDb.length > 10) {
    reviewsDb = reviewsDb.slice(0, 10);
  }

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
          {reviewsDb.map(({body: text, email: author, name: courseName, id: key}) => {
            author = author.split('@')[0];
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