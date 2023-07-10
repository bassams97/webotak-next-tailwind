export default function SubTitle({ className = "", title = "", description = "" }) {
  return (
    (description || title) && (
      <div className={`${className} text-white text-center lg:text-left`}>
        {title && (
          <h2 className="text-[30px] font-bold leading-[35px] lg:text-[37px] lg:leading-[50px] !font-secondary my-[30px] lg:mt-[60px] lg:mb-[40px]">
            {title}
          </h2>
        )}
        {description && (
          <div
            className="[&_*]:text-[15px] leading-[22px] lg:[&_*]:text-[21.5px] lg:[&_*]:leading-[25px] [&_*]:font-primary"
            dangerouslySetInnerHTML={{ __html: "<div>" + description + "</div>" }}
          />
        )}
      </div>
    )
  )
}
