import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import b from '../../../public/b.jpg'
// import b2 from '../../../public/b2.jpg'
// import b3 from '../../../public/b3.jpg'
const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <div>
            <Slider {...settings}>
                {/* <div
                    className="object-cover"
                    style={{ backgroundImage: `url(${b})` }}
                >
                </div> */}


                <div className="bg-cover bg-center object-cover">
                    <img className="w-full h-auto"
                        src={b}
                        alt="Banner 1"
                    />
                </div>
                <div className="bg-cover bg-center object-cover">
                    <img className="w-full h-auto"
                        src={b}
                        alt="Banner 1"
                    />
                </div>
                <div className="bg-cover bg-center object-cover">
                    <img className="w-full h-auto"
                        src={b}
                        alt="Banner 1"
                    />
                </div>

            </Slider >
        </div >
    );
};

export default Banner;
