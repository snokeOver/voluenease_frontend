import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const LoginSlidder = () => {
  const [images, setImages] = useState([]);
  const baseURL = import.meta.env.VITE_BASE_URL;

  // useEffect(() => {
  //   const fetchImagesUrl = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}/api/spots/login`);
  //       if (response.data) {
  //         setImages(response.data);
  //       } else {
  //         console.log(response.data);
  //       }
  //     } catch (err) {
  //       console.log(err.response);
  //     }
  //   };
  //   fetchImagesUrl();
  // }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper rounded-bl-md rounded-r-[3.5rem] rounded-tl-[3.5rem] rounded-tr-md w-[20rem] md:w-[25rem] lg:w-[35rem] h-40 md:h-56 xl:h-72"
      >
        {/* {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={image.image_url}
              alt={image.title}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-30"></div>
          </SwiperSlide>
        ))} */}
      </Swiper>
    </>
  );
};

export default LoginSlidder;
