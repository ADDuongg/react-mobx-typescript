import React, { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStore } from "../layout/master";
import slide1 from '../assets/Silder1.png';
import slide2 from '../assets/Silder2.png';
import slide3 from '../assets/Silder3.png';
import { Link } from "react-router-dom";
interface Slide {
    img: string;
    title: string;
    content: string;
  }
  
  interface CustomSlideProps {
    slide: Slide;
  }
  
  const CustomSlide: React.FC<CustomSlideProps> = ({ slide }) => {
    return (
      <div
        className="h-[26rem] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${slide.img})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      >
        <div className="flex flex-col items-start justify-center h-full text-black lg:ps-36 ps-5 w-2/4 mr-auto gap-4">
          <p className="text-2xl  text-red-600">{slide.title}</p>
          <p className="lg:text-8xl md:text-5xl text-xl font-bold">{slide.content}</p>
          <Link to={'/shop'} className="rounded-xl bg-red-600 text-white px-10 py-3 hover:opacity-85">EXPLORE NOW</Link>
        </div>
      </div>
    );
  }
function SimpleSlider() {
    const { productStore } = useStore()
    const slideData = [
        {
            img: slide1,
            title: 'For your comfort',
            content: 'Portable device'

        },
        {
            img: slide2,
            title: 'For your comfort',
            content: 'Portable device'
        },
        {
            img: slide3,
            title: 'For your comfort',
            content: 'Portable device'
        },
    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="slider-container w-full">
            <Slider {...settings}>
                {slideData.map((slide, index) => (
                    <CustomSlide key={index} slide={slide} />
                ))}
            </Slider>
        </div>
    );
}

export default SimpleSlider;
