const Section = ({ children, style, id = "", className = "", bgColor = "#293338", sectionClass = "" }) => {
  return (
    <section {...(id && {id:id})} style={{ backgroundColor: bgColor }} className={sectionClass}>
      <div className={`container mx-auto ${className} max-w-[1600px]`} style={style}>
        {children}
      </div>
    </section>
  )
}

export default Section
