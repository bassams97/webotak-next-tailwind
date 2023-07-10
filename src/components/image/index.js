import NextImage from "next/image"
import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function Image({
  src = "",
  alt = "Ritzy",
  width,
  height,
  styles,
  className = "",
  quality,
  priority = false,
  isFill = false,
  sizes = "",
  isLoad = true,
  loading = "eager"
}) {
  const [loaded, setLoaded] = useState(false)

  function handleImageLoad() {
    setLoaded(true)
  }
  // useEffect(() => {
  //   handleImageLoad()
  // }, [])

  // if ((width && height) || isFill == true) {
  const customLoader = ({ src, width, quality }) => {
    // return `${src}?w=${width}&q=${quality || 75}`
    return "/images/placeholder.webp"
  }
  return (
    <>
      {/* {isLoad && !loaded && <Skeleton style={{ width: "100%", height: "100%" }} />} */}
      {src.length > 0 && (
        <NextImage
          // blurDataURL={isLoad && "/images/placeholder.webp"}
          // placeholder={isLoad && "blur"}
          blurDataURL="/images/placeholder.webp"
          placeholder="blur"
          alt={alt}
          width={width}
          height={height}
          style={styles}
          className={className}
          priority={priority}
          fill={isFill}
          sizes={sizes}
          loading={loading}
          quality={quality}
          src={src}
          // loader={customLoader}
          // onLoadingComplete={() => handleImageLoad()}
          // unoptimized={true}
        />
      )}
    </>
  )
  // } else {
  //   return (
  //     <>
  //       {isLoad && !loaded && <Skeleton style={{ width: "100%", height: "100%" }} />}
  //       {src && <img src={src} alt={alt} style={styles} className={className} onLoad={() => setLoaded(true)} />}
  //     </>
  //   )
  // }
}
