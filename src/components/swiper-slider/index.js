import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, A11y, Pagination, Thumbs, EffectFade } from "swiper"
import styles from "src/styles/slider.module.scss"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import "swiper/css/thumbs"

import { NextBtn, PrevBtn } from "./arrows"
import { forwardRef, useEffect, useRef } from "react"

const SwiperSlider = ({
  data,
  Slide,
  className = "",
  swiperClassName = "",
  arrowsClassName = "",
  breakpoints,
  showOverflow = true,
  pagination = true,
  showShadow = true,
  infinite = false,
  slidesPerView = 1,
  spaceBetween = 16,
  arrows,
  autoHeight = false,
  slideToClickedSlide = false,
  onForwardRef,
  fade = false,
  defaultPadding = true,
  onSwiper,
  watchSlidesProgress,
  thumbsSwiper
}) => {
  const sliderRef = useRef(null)
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const paginationRef = useRef(null)

  const swiperClasses = [
    styles.swiperSlider,
    showOverflow ? styles.showOverflow : "",
    defaultPadding ? "!pt-[20px] !mt-[-20px] !pb-[80px] !mb-[-80px]" : "",
    showShadow ? "lg:!px-[30px] lg:!mx-[-30px]" : "",
    swiperClassName ? swiperClassName : ""
  ]

  useEffect(() => {
    // pass ref to parent
    if (onForwardRef) {
      onForwardRef(sliderRef)
    }
  }, [onForwardRef])
  return (
    <div
      className={`relative ${className} ${
        pagination ? "mb-12" : ""
      } [&_.swiper-wrapper]:!transform-[translate3d(0px,0,0)]`}
    >
      {pagination && <CustomPagination ref={paginationRef} />}

      <Swiper
        thumbs={{ swiper: thumbsSwiper?.activeIndex ? thumbsSwiper : "" }}
        onSwiper={onSwiper && onSwiper}
        watchSlidesProgress={watchSlidesProgress && watchSlidesProgress}
        modules={[Navigation, A11y, Pagination, Thumbs, EffectFade]}
        navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current }}
        onBeforeInit={swiper => {
          swiper.params.navigation.prevEl = navigationPrevRef.current
          swiper.params.navigation.nextEl = navigationNextRef.current
          swiper.params.pagination.el = paginationRef.current
        }}
        className={swiperClasses.join(" ")}
        loop={infinite}
        spaceBetween={spaceBetween}
        slidesPerView={infinite ? "auto" : slidesPerView}
        breakpoints={{
          ...breakpoints
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true
        }}
        ref={sliderRef}
        autoHeight={autoHeight}
        slideToClickedSlide={slideToClickedSlide}
        effect={fade ? "fade" : ""}
      >
        {data &&
          data.map((d, index) => (
            <SwiperSlide key={index}>
              <Slide {...d} />
            </SwiperSlide>
          ))}
      </Swiper>
      {data.length > 1 && arrows && (
        <>
          <PrevBtn forwardedSliderRef={sliderRef} variant={arrows} className={arrowsClassName} isLoop={!infinite} />
          <NextBtn forwardedSliderRef={sliderRef} variant={arrows} className={arrowsClassName} />
        </>
      )}
    </div>
  )
}

export default SwiperSlider

const CustomPagination = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      // this only for yacht-slide
      className={`${styles.pagination} z-10 [&:has(+.swiper_.info-icon-hover:hover)]:z-0`}
    ></div>
  )
})
