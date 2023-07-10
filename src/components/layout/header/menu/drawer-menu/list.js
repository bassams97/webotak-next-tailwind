import NextLink from "next/link"
import { useEffect, useState } from "react"

export default function DrawerList({ data, className, collapsible = true, setIsOpen, isOpen, notLocation = false }) {
  const [listData, setListData] = useState(data)

  useEffect(() => {
    if (windowGlobal.innerWidth <= 1024) {
      if (collapsible) {
        setListData(data.slice(0, 3))
      } else {
        setListData(data)
      }
    }
  }, [collapsible, data])

  function handleSeeMore() {
    setListData(data.slice(0, data.length))
  }

  function handleSeeLess() {
    setListData(data.slice(0, 3))
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {listData.map((item, index) => (
        <NextLink
          href={!notLocation ? `/${item.slug}` : item.slug}
          onClick={() => setIsOpen(!isOpen)}
          key={index}
          className="font-main text-white text-[15px] 2xl:text-[18px] my-[2px] 2xl:my-[6px] leading-[26px] lg:hover:text-teal duration-300"
        >
          {item.name}
        </NextLink>
      ))}
      {collapsible && (
        <>
          {listData.length == 3 ? (
            <div
              className="block lg:hidden font-main text-[18px] my-[6px] leading-[26px] text-teal"
              onClick={() => handleSeeMore()}
            >
              See More +
            </div>
          ) : (
            <div
              className="block lg:hidden font-main text-teal text-[18px] my-[6px] leading-[26px]"
              onClick={() => handleSeeLess()}
            >
              See Less -
            </div>
          )}
        </>
      )}
    </div>
  )
}

const windowGlobal = typeof window !== "undefined" && window
