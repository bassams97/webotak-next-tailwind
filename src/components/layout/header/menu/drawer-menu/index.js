import DrawerList from "./list"
import NextLink from "next/link"
import listData from "./listData"
import Image from "src/components/image"
import { useEffect, useState } from "react"
import Button from "src/components/buttons"
import SocialIcons from "src/components/ui/social-icons"
import { MenuIcon } from "src/components/image/icons"

export default function Drawer({ isOpen, setIsOpen }) {
  const [data, setData] = useState({
    firstCol: null,
    secondCol: null,
    thirdCol: null
  })

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center"
        aria-controls="mobile-menu"
        aria-expanded="false"
        aria-label="Drawer menu"
      >
        <div className="w-[30px] lg:w-[35px]">
          <MenuIcon className="h-full w-full lg:[&:hover_path]:!stroke-teal lg:[&_path]:duration-300" />
        </div>
      </button>

      <div
        className={
          "fixed overflow-auto lg:overflow-hidden position z-10 left-0  inset-0 transform ease-in-out" +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0 "
            : " transition-all delay-500 opacity-0 -translate-x-full  ")
        }
      >
        <div
          className={
            "w-screen max-w-full left-0 absolute bg-white h-auto lg:h-screen delay-400 duration-500 ease-in-out transition-all transform " +
            (isOpen ? " translate-x-0 " : " -translate-x-full ")
          }
        >
          <div
            style={{ backgroundImage: "url('/images/bg-menu-min-1.webp')" }}
            className="bg-cover bg-center bg-no-repeat h-[100vh] overflow-y-scroll lg:overflow-y-hidden lg:h-  flex flex-col lg:flex-row justify-between pt-[28px] lg:py-[28px] px-[30px] "
          >
            <div className="w-full lg:w-[80%] flex flex-col justify-between text-center lg:text-left">
              <div className="xl:h-full">
                <div
                  className="font-bold text-lg h-[60px] cursor-pointer w-full text-left lg:hover:text-teal text-white"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-[27px] h-auto font-bold duration-300"
                  >
                    <path
                      fill="currentColor"
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    ></path>
                  </svg>
                </div>
                <div className="2xl:pl-[100px] 2xl:pr-[40px] 2xl:justify-start xl:h-[90%] xl:flex xl:flex-wrap xl:flex-row xl:justify-between xl:content-around">
                  <div className="grid grid-cols-12 xl:w-full 2xl:px-[0] px-[14px]">
                    <div className="col-span-12 lg:col-span-6">
                      {data.firstCol && (
                        <>
                          <ListTitle
                            title={data.firstCol.title}
                            onClick={() => setIsOpen(!isOpen)}
                            link={`/${data.firstCol.slug}`}
                          />
                          <DrawerList data={data.firstCol.list} setIsOpen={setIsOpen} isOpen={isOpen} />
                        </>
                      )}
                    </div>
                    <div className="col-span-12 lg:col-span-6 mt-[20px] lg:mt-0">
                      {data.secondCol && (
                        <>
                          <ListTitle
                            title={data.secondCol.title}
                            onClick={() => setIsOpen(!isOpen)}
                            link={`/${data.secondCol.slug}`}
                          />
                          <div className="grid grid-cols-12">
                            <div className="col-span-12">
                              <DrawerList
                                data={data.secondCol.list}
                                setIsOpen={setIsOpen}
                                isOpen={isOpen}
                                className="lg:flex-row [&>a]:w-full [&>a]:lg:w-[50%] flex-wrap"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-12 xl:w-full 2xl:px-[0] px-[14px] mt-[20px]">
                    {data.thirdCol && (
                      <>
                        <div className="col-span-12">
                          <ListTitle
                            title={data.thirdCol.title}
                            onClick={() => setIsOpen(!isOpen)}
                            link={`/${data.thirdCol.slug}`}
                          />
                        </div>
                        <div className="col-span-12">
                          <DrawerList
                            data={data.thirdCol.list}
                            setIsOpen={setIsOpen}
                            isOpen={isOpen}
                            className="lg:flex-row [&>a]:w-full [&>a]:lg:w-[25%] flex-wrap"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="justify-between ml-[20px] mt-[40px] border-[rgba(255,255,255,.15)] border-t-[1px] border-solid pt-[18px] items-center hidden lg:flex">
                <div className="col-span-12 lg:col-span-3 text-[#cccccc] text-[12px] font-normal pl-4 leading-[1]">
                  <p className="mb-[5px]">Copyright © 2022 by Ritzy Charters</p>
                  <p>Ritzy Charters LLC all Rights Reserved</p>
                </div>
                <div className="col-span-12 lg:col-span-6 flex items-center justify-between">
                  <NextLink href="https://www.vipca.org/">
                    <div className={`max-w-[100px] w-[100px] h-[46px] relative mx-[20px] maxMobile:mx-[10px]`}>
                      <Image src="/images/logos/vipca.webp" alt="vipca" isFill sizes="35vw" />
                    </div>
                  </NextLink>
                  <NextLink href="https://www.cyba.net/">
                    <div className={`max-w-[100px] w-[45px] h-[45px] relative mx-[20px] maxMobile:mx-[10px]`}>
                      <Image src="/images/logos/cyba.webp" alt="cyba" isFill sizes="35vw" />
                    </div>
                  </NextLink>
                  <NextLink href="https://iyba.org/member-directory?filter_keyword=Ritzy+Charters">
                    <div className={`max-w-[100px] w-[100px] h-[45px] relative mx-[20px] maxMobile:mx-[10px]`}>
                      <Image src="/images/logos/iyba.svg" alt="iyba" isFill sizes="35vw" />
                    </div>
                  </NextLink>
                  <NextLink href="https://www.crewedyachtsbvi.com/accredited-brokers">
                    <div className={`max-w-[100px] w-[100px] h-[27px] relative mx-[20px] maxMobile:mx-[10px]`}>
                      <Image src="/images/logos/bvi-charter.webp" alt="bvi-charter" isFill sizes="35vw" />
                    </div>
                  </NextLink>
                </div>
                <div className="col-span-12 lg:col-span-3 text-right mr-10">
                  <SocialIcons color={"white"} />
                </div>
              </div>
            </div>
            <div className="relative lg:static w-full lg:w-[20%] lg:h-screen border-t-[1px] mt-[30px] pt-[30px] pb-[30px] lg:pt-0 lg:mt-0 lg:border-t-0 lg:border-solid border-[rgba(255,255,255,.15)]">
              <div className="absolute h-full bg-[rgba(18,24,26,.3)] w-[calc(100%+60px)] lg:w-[400px] lg:left-[initial] left-[-30px] top-0 " />
              <div className="relative z-50 text-center h-full flex flex-col items-center justify-center xl:left-[18px]">
                <DrawerList
                  data={headerSidebar}
                  collapsible={false}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                  notLocation={true}
                  className="mb-[30px] lg:mt-[-20px] [&>*]xl:my-[6px] "
                />
                <Button
                  className="mb-[30px] lg:mt-[60px] !font-normal !py-[6px] !px-[30px] !text-[18px] !leading-[26px]"
                  href="/contact-us"
                >
                  Contact Us
                </Button>
                <NextLink href="callto:+1 (954) 228-5562" className="block text-white">
                  <div className="[&>*]:inline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-[16px] h-auto mr-[12px] align-[-.125em]"
                    >
                      <path
                        fill="currentColor"
                        d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                      ></path>
                    </svg>
                    <p> +1 (954) 228-5562</p>
                  </div>
                </NextLink>
                <div className="justify-between mt-[20px] pt-[18px] items-center lg:hidden text-center max-w-full">
                  <div className="flex items-center justify-between py-[20px] bg-[rgba(255,255,255,.05)] rounded-md">
                    <NextLink href="https://www.vipca.org/">
                      <div className={`max-w-[100px] w-[70px] h-[32px] relative mx-[20px] maxMobile:mx-[10px]`}>
                        <Image src="/images/logos/vipca-w70.webp" alt="vipca" isFill sizes="35vw" />
                      </div>
                    </NextLink>
                    <NextLink href="https://www.cyba.net/">
                      <div
                        className={`max-w-[100px] maxMobile:h-[50px] w-[50px] h-[50px] relative mx-[20px] maxMobile:mx-[10px] aspect-[1]`}
                      >
                        <Image src="/images/logos/cyba-w50.webp" alt="cyba" isFill sizes="35vw" />
                      </div>
                    </NextLink>
                    <NextLink href="https://iyba.org/member-directory?filter_keyword=Ritzy+Charters">
                      <div className={`max-w-[100px] w-[70px] h-[34px] relative mx-[20px] maxMobile:mx-[10px]`}>
                        <Image src="/images/logos/iyba.svg" alt="iyba" isFill sizes="35vw" />
                      </div>
                    </NextLink>
                    <NextLink href="https://www.crewedyachtsbvi.com/accredited-brokers">
                      <div className={`max-w-[100px] w-[70px] h-[19px] relative mx-[20px] maxMobile:mx-[10px]`}>
                        <Image src="/images/logos/bvi-charter-w70.webp" alt="bvi-charter" isFill sizes="35vw" />
                      </div>
                    </NextLink>
                  </div>
                  <div className="text-[#cccccc] text-[12px] font-normal mt-[30px]">
                    <p className="mb-[5px]">Copyright © 2022 by Ritzy Charters</p>
                    <p>Ritzy Charters LLC all Rights Reserved</p>
                  </div>
                  <div className="mt-[30px] mb-[20px]">
                    <SocialIcons color={"white"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ListTitle({ title, link = "#", onClick }) {
  return (
    <div className="mb-[20px] 2xl:mb-[40px]">
      <NextLink
        href={link}
        onClick={onClick}
        className="font-secondary text-white text-[32px] font-bold mb-[20px] leading-[initial]"
      >
        {title}
      </NextLink>
    </div>
  )
}

// const caribbeanList = [
//   { text: "Virgin Islands", link: "/locations/caribbean-virgin-islands-bvi" },
//   { text: "Bahamas", link: "/locations/bahamas" },
//   { text: "The Grenadines", link: "#" },
//   { text: "Anguilla St Martin St Barts", link: "#" },
//   { text: "Belize", link: "/locations/belize" }
// ]

// const secondColList = [
//   { text: "Greece", link: "/locations/greece" },
//   { text: "Croatia", link: "/locations/croatia" },
//   { text: "Amalfi Coast", link: "#" },
//   { text: "Balearic Islands", link: "/locations/w-med-spain-balearics" },
//   { text: "Corsica & Sardinia", link: "#" },
//   { text: "French & Italian Riviera", link: "#" },
//   { text: "Sicily", link: "/locations/w-med-naples-sicily" },
//   { text: "Turkey", link: "/locations/turkey" }
// ]

// const otherLocationsList = [
//   { text: "Alaska", link: "/locations/alaska" },
//   { text: "Antarctica", link: "/locations/antarctica" },
//   { text: "Arctic", link: "/locations/arctic" },
//   { text: "Australia", link: "/locations/australia" },
//   { text: "California", link: "/locations/usa-california" },
//   { text: "Canary Islands", link: "/locations/canary-islands" },
//   { text: "French Polynesia", link: "/locations/french-polynesia" },
//   { text: "Galapagos", link: "/locations/galapagos" },
//   { text: "Indian Ocean & SE Asia", link: "/locations/indian-ocean-and-se-asia" },
//   { text: "Mexico", link: "/locations/mexico" },
//   { text: "Miami / Ft. Lauderdale", link: "#" },
//   { text: "New England", link: "/locations/usa-new-england" },
//   { text: "New Zealand", link: "/locations/new-zealand" },
//   { text: "Northern Europe", link: "/locations/northern-europe" },
//   { text: "Pacific NW", link: "/locations/pacific-nw" },
//   { text: "Red Sea", link: "/locations/red-sea" },
//   { text: "South America", link: "/locations/south-america" },
//   { text: "South Pacific", link: "/locations/south-pacific" },
//   { text: "United Arab Emirates", link: "/locations/united-arab-emirates" }
//   // { text: 'See more +', link: '/see-more' }
// ]

const headerSidebar = [
  { name: "Blog", slug: "/blog" },
  { name: "About us", slug: "/about-us" },
  { name: "Contact Us", slug: "/contact-us" },
  { name: "Our Team", slug: "/our-team" },
  { name: "Terms and Conditions", slug: "/terms-and-conditions" },
  { name: "Privacy Policy", slug: "/privacy-policy" },
  { name: "Sitemap", slug: "/sitemap" }
]
