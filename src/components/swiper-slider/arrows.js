import { useSwiper } from "swiper/react"
import { useEffect, useState } from "react"
import styles from "src/styles/slider.module.scss"

// variants normal, filled, transparent
// Outer Buttons
const NextBtn = ({ className = "", variant = "normal", forwardedSliderRef }) => {
  const [isLast, setIsLast] = useState(false)

  let icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-auto h-[30px]">
      <path
        fill="currentColor"
        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
      ></path>
    </svg>
  )
  if (variant === "filled" || variant === "transparent") {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[24px] h-auto">
        <path
          fill="currentColor"
          d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
        ></path>
      </svg>
    )
  }

  useEffect(() => {
    forwardedSliderRef.current.swiper.on("slideChange", () => {
      setIsLast(forwardedSliderRef.current.swiper.isEnd)
    })
  }, [forwardedSliderRef, setIsLast])
  function slideNextHandler() {
    if (!forwardedSliderRef.current) return
    forwardedSliderRef.current.swiper.slideNext()
  }
  return (
    <button
      className={`${styles.sliderButton} ${styles.outer} ${styles[variant]} ${styles.buttonNext} ${
        isLast ? styles.disabled : styles.active
      } ${className}`}
      onClick={slideNextHandler}
      aria-label="slide Next"
    >
      {icon}
    </button>
  )
}

const PrevBtn = ({ className = "", variant = "normal", forwardedSliderRef, isLoop }) => {
  const [isFirst, setIsFirst] = useState(isLoop)

  let icon = (
    <svg className="w-auto h-[30px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path
        fill="currentColor"
        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
      ></path>
    </svg>
  )
  if (variant === "filled" || variant === "transparent") {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[24px] h-auto">
        <path
          fill="currentColor"
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        ></path>
      </svg>
    )
  }

  useEffect(() => {
    forwardedSliderRef.current.swiper.on("slideChange", () => {
      setIsFirst(forwardedSliderRef.current.swiper.isBeginning)
    })
  }, [forwardedSliderRef, setIsFirst])
  function slidePrevHandler() {
    if (!forwardedSliderRef.current) return
    forwardedSliderRef.current.swiper.slidePrev()
  }
  return (
    <button
      className={`${styles.sliderButton} ${styles.outer} ${styles[variant]} ${styles.buttonPrev} ${
        isFirst ? styles.disabled : styles.active
      } ${className}`}
      onClick={slidePrevHandler}
      aria-label="slide Prev"
    >
      {icon}
    </button>
  )
}

// inner Buttons
const InnerNextBtn = ({ className = "", variant = "filled", defaultDisabled }) => {
  const swiper = useSwiper()
  const [isLast, setIsLast] = useState(defaultDisabled)

  swiper.on("slideChange", () => {
    setIsLast(swiper.isEnd)
  })
  function slideNextHandler() {
    swiper.slideNext()
  }
  return (
    <button
      className={`${styles.sliderButton} ${styles.inner} ${styles[variant]} ${styles.buttonNext} ${
        isLast ? styles.disabled : styles.active
      } ${className}`}
      onClick={slideNextHandler}
      aria-label="slide Next"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[24px] h-auto">
        <path
          fill="currentColor"
          d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
        ></path>
      </svg>
    </button>
  )
}

const InnerPrevBtn = ({ className = "", variant = "filled", defaultDisabled }) => {
  const swiper = useSwiper()
  const [isFirst, setIsFirst] = useState(defaultDisabled)

  swiper.on("slideChange", () => {
    setIsFirst(swiper.isBeginning)
  })

  function slidePrevHandler() {
    swiper.slidePrev()
  }
  return (
    <button
      className={`${styles.sliderButton} ${styles.inner} ${styles[variant]} ${styles.buttonPrev} ${
        isFirst ? styles.disabled : styles.active
      } ${className}`}
      onClick={slidePrevHandler}
      aria-label="slide Prev"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[24px] h-auto">
        <path
          fill="currentColor"
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        ></path>
      </svg>
    </button>
  )
}

export { NextBtn, PrevBtn, InnerPrevBtn, InnerNextBtn }
