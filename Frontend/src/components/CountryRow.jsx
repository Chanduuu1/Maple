import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';

const CountryRow = ({ category }) => {
  return (
    <div className="mb-12">
      {/* Category Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {category.title}
        </h2>
        <p className="text-gray-600">{category.subtitle}</p>
      </div>

      {/* Swiper Carousel */}
      <div className="relative group">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={24}
          loop={true}  // ✨ MAKES IT CIRCULAR!
          navigation={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          modules={[Navigation, Autoplay]}
          className="country-row-swiper"
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {category.countries.map((country) => (
            <SwiperSlide key={country.id} className="!w-80">
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer h-full"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden group/card">
                  {/* Image */}
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{country.name}</h3>
                    <p className="text-sm text-gray-200 mb-2">{country.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Best time: {country.bestTime}</span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-emerald-500/0 group-hover/card:bg-emerald-500/10 transition-colors duration-300" />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Styles for Navigation */}
        <style jsx global>{`
          .country-row-swiper {
            padding: 10px 0 20px 0;
          }

          .country-row-swiper .swiper-button-next,
          .country-row-swiper .swiper-button-prev {
            color: white;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            width: 45px;
            height: 45px;
            border-radius: 50%;
            opacity: 0;
            transition: all 0.3s ease;
          }

          .country-row-swiper:hover .swiper-button-next,
          .country-row-swiper:hover .swiper-button-prev {
            opacity: 1;
          }

          .country-row-swiper .swiper-button-next:after,
          .country-row-swiper .swiper-button-prev:after {
            font-size: 18px;
            font-weight: bold;
          }

          .country-row-swiper .swiper-button-next:hover,
          .country-row-swiper .swiper-button-prev:hover {
            background: rgba(0, 0, 0, 0.7);
            transform: scale(1.1);
          }

          .country-row-swiper .swiper-button-prev {
            left: 10px;
          }

          .country-row-swiper .swiper-button-next {
            right: 10px;
          }

          /* Disable buttons when at edges (but with loop, this won't happen) */
          .country-row-swiper .swiper-button-disabled {
            opacity: 0 !important;
            cursor: default;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CountryRow;