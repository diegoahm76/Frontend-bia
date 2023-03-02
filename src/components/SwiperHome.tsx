import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/bundle';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SwiperHome: React.FC = () => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            style={{ borderRadius: '15px' }}
            src="https://www.parquesnacionales.gov.co/portal/wp-content/uploads/2013/08/s132.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ borderRadius: '15px' }}
            src="https://www.parquesnacionales.gov.co/portal/wp-content/uploads/2013/08/s132.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ borderRadius: '15px' }}
            src="https://www.parquesnacionales.gov.co/portal/wp-content/uploads/2013/08/s132.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ borderRadius: '15px' }}
            src="https://www.parquesnacionales.gov.co/portal/wp-content/uploads/2013/08/s132.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ borderRadius: '15px' }}
            src="https://www.parquesnacionales.gov.co/portal/wp-content/uploads/2013/08/s132.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ borderRadius: '15px' }}
            src="https://www.parquesnacionales.gov.co/portal/wp-content/uploads/2013/08/s132.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ borderRadius: '15px' }}
            src="https://www.parquesnacionales.gov.co/portal/wp-content/uploads/2013/08/s132.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ borderRadius: '15px' }}
            src="https://www.parquesnacionales.gov.co/portal/wp-content/uploads/2013/08/s132.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ borderRadius: '15px' }}
            src="https://www.parquesnacionales.gov.co/portal/wp-content/uploads/2013/08/s132.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
