import React from 'react'
import Slider from 'react-slick';
import styles from './SubBanner.module.css'


const SubBanner = () => {
    const settings = {
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear"
    };
    return (
        <section className={styles.subBanner}>
            <Slider {...settings}>
                <img src='https://res.cloudinary.com/assignment22/image/upload/v1668572147/Ass-reactjs/20221114_yGz6gyqFNNd0ZCn6LjXpvX7C_z5fo1r.jpg' />
                <img src='https://res.cloudinary.com/assignment22/image/upload/v1668572148/Ass-reactjs/20221114_QKQX0rIzMB4Jm2Ojb4VaETYv_qofcye.png' alt='1659522075021' />
            </Slider>
        </section>
    )
}

export default SubBanner