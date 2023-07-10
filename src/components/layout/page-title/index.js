import styles from "src/styles/layout.module.scss"

export default function PageTitle({ title, bgImgUrl, subtitle }) {
  const background =
    bgImgUrl && bgImgUrl !== "initial" ? { backgroundImage: `url(${bgImgUrl})` } : { backgroundColor: "#bbb" }

  return (
    <div className={`${styles.pageTitle} relative max-h-[580px] h-[45vh] flex flex-col items-center justify-center`}>
      <div
        className="top-0 left-0 right-0 bottom-0 bg-cover bg-center brightness-[.7] absolute z-[-1]"
        style={{ ...background }}
      ></div>
      <h1
        className={`${styles.pageTitle_h1} `}
      >
        {title && title}
      </h1>
      {subtitle && (
        <h3 className="text-white text-[20px] leading-[28px] lg:text-[26px] lg:leading-[36px] px-[15px] py-[5px] !font-bold mb-[30px]">
          {subtitle && subtitle}
        </h3>
      )}
    </div>
  )
}
