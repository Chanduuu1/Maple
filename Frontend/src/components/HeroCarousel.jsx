import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const HeroCarousel = ({ countries }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[500px] mb-16">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}  //  THIS MAKES IT CIRCULAR!
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Changed to realIndex for loop
        className="hero-swiper"
      >
        {countries.map((country, index) => (
          <SwiperSlide key={country.id} className="!w-[700px]">
            <motion.div
              initial={{ opacity: 0.6, scale: 0.9 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0.6,
                scale: activeIndex === index ? 1 : 0.9,
              }}
              transition={{ duration: 0.5 }}
              className="relative h-[450px] rounded-3xl overflow-hidden cursor-pointer group"
            >
              {/* Background Image */}
              <img
                src={country.image}
                alt={country.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: activeIndex === index ? 0 : 20,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-4">
                    {country.category}
                  </span>
                  <h2 className="text-5xl font-bold mb-3">{country.name}</h2>
                  <p className="text-xl text-gray-200 mb-2">{country.tagline}</p>
                  <p className="text-gray-300 max-w-lg">{country.description}</p>
                  
                  <button 
                    onClick={() => navigate(`/countries/${country.name.toLowerCase()}`)}
                  className="mt-6 px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    Explore {country.name}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style jsx global>{`
        .hero-swiper {
          padding: 20px 0 50px 0;
        }
        
        .hero-swiper .swiper-slide {
          transition: all 0.5s ease;
        }
        
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 20px;
        }
        
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;