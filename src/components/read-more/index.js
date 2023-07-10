import { useState } from "react"

// NOTE: you can target the read more by .read-more-text className to style it
const ReadMore = ({ text = "", max = 200, responsive = false, color = "white", className = "" }) => {
  const [displaySecondary, setDisplaySecondary] = useState(false)

  function toggle() {
    setDisplaySecondary(prev => !prev)
  }

  const textIsLong = text.length > 260
  if (textIsLong) {
    max = 260
  }

  const content = (
    <>
      {displaySecondary && <span dangerouslySetInnerHTML={{ __html: text }} />}
      {!displaySecondary && <span dangerouslySetInnerHTML={{ __html: text.slice(0, max) }} />}
      {text.length > max && (
        <span onClick={toggle} className="read-more-text cursor-pointer !font-bold" style={{ color }}>
          {displaySecondary ? " read less" : " read more..."}
        </span>
      )}
    </>
  )
  return (
    <span className={`font-primary ${className}`}>
      {responsive && !textIsLong && (
        <>
          <span className="md:hidden">{content}</span>
          <span className="hidden md:inline">{text}</span>
        </>
      )}
      {(!responsive || textIsLong) && <span>{content}</span>}
    </span>
  )
}

export default ReadMore
