"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import CustomButton from "./custom-button";
import { useRouter } from "next/navigation";

export default function BannerCarousel() {
  const router = useRouter(); // ✅ Hook now inside component

  const handleClick = () => {
    router.push("/donate"); // ✅ Works safely
  };

  const banners = [
    {
      title: "Need Trust Foundation",
      subtitle: "Empowering Communities, Transforming Lives",
      logo: "https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763358914/trust_qbvmui.png",
      image:
        "https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763367291/1_tqh0b4_dvsrfn.jpg",
    },
    {
      title: "Support Patients in Need",
      subtitle: "Your Donation Can Save Lives",
      logo: "https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763359201/donation_zo33wh.png",
      image:
        "https://res.cloudinary.com/dkbtx5r9v/image/upload/v1766034727/5_vzjqui.jpg",
    },
      {
      title: "Need Trust Foundation",
      subtitle: "Empowering Communities, Transforming Lives",
      logo: "https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763358914/trust_qbvmui.png",
      image:
        "https://res.cloudinary.com/dkbtx5r9v/image/upload/v1766034818/3_ukr9ea.jpg",
    },
    {
      title: "Support Patients in Need",
      subtitle: "Your Donation Can Save Lives",
      logo: "https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763359201/donation_zo33wh.png",
      image:
        "https://res.cloudinary.com/dkbtx5r9v/image/upload/v1766035219/4_f0ukkz.jpg",
    },
    

  ];

  return (
    <div className="relative w-full h-[90vh] overflow-hidden" id="home">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-white",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="h-full w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent md:from-black/80 md:via-black/40 md:to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="text-white space-y-4 sm:space-y-6 max-w-2xl">
                      <div className="mb-4">
                        <img
                          src={banner.logo || "/placeholder.svg"}
                          alt="Logo"
                          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                        />
                      </div>

                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-2xl">
                        {banner.title}
                      </h1>

                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-100 drop-shadow-lg max-w-xl">
                        {banner.subtitle}
                      </p>

                      {/* ✅ Fixed button */}
                      <div className="pt-4">
                        <CustomButton onClick={handleClick}>
                          Donate Now
                        </CustomButton>
                      </div>
                    </div>

                    <div className="hidden lg:block" />
                  </div>
                </div>
              </div>

              <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 sm:p-8" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
