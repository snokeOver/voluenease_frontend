// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

// import required modules
import { Autoplay, EffectCards } from "swiper/modules";
import useData from "../../../hooks/useData";

const LoginSlidder = () => {
  const { slidderImages } = useData();

  return (
    <>
      <Swiper
        effect={"cards"}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectCards]}
        className="mySwiper  w-[20rem]  lg:w-[35rem] h-40 md:h-56 xl:h-72"
      >
        {slidderImages.map((image) => (
          <SwiperSlide key={image._id}>
            <img
              src={image.image_url}
              alt={image.title}
              className="w-full h-auto rounded-bl-md rounded-tr-md rounded-br-[2rem] rounded-tl-[2rem] lg:rounded-br-[3.5rem] lg:rounded-tl-[3.5rem]  shadow-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default LoginSlidder;
