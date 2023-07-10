import Head from "next/head"
import NextLink from "next/link"
import DesktopMenu from "./menu"
import Drawer from "./menu/drawer-menu"
import Image from "src/components/image"
import { useEffect, useRef, useState } from "react"
import styles from "src/styles/layout.module.scss"
import PageTitle from "src/components/layout/page-title"
import Button from "src/components/buttons"
import { useRouter } from "next/router"
import Script from "next/script"
import { usePopup } from "src/context/popup"

const Header = ({ pageTitle, title = "", bgImgUrl, metaDesc = "", searchPopup = true, structuredData = null }) => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false)
  const [showDrawer, setShowDrawer] = useState("hidden")
  const router = useRouter()
  const navbarRef = useRef()
  const { openPopup } = usePopup()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (navbarRef.current) {
        if (windowGlobal.pageYOffset >= 50) {
          navbarRef.current.style.backgroundColor = "#293338"
          navbarRef.current.style.boxShadow = "0 3px 20px 0 rgb(0 0 0 / 20%)"
        } else {
          navbarRef.current.style.backgroundColor = "transparent"
          navbarRef.current.style.boxShadow = "none"
        }
      }
    })
    setShowDrawer("block")
  }, [])

  return (
    <>
      <Head>
        <title>{`${title} | Webotak`}</title>
        <meta name="description" content={metaDesc ? metaDesc : "Webotak"} />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon_16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="95x95" href="/images/icons/favicon_95x95.png" />
        <link rel="apple-touch-icon" sizes="95x95" href="/images/icons/favicon_95x95.png" />

        {structuredData && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        )}
      </Head>
      {windowGlobal && (
        <Script
          id="gtm_script"
          type="application/ld+json"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Webotak",
              legalName: "Webotak LLC",
              description: "This is an template for sites of Webotak.",
              image: "https://rc3.s3.amazonaws.com/blog/postimages/Soggy+Dollar+Bar+%40hanhanbvi-1524143815.jpg",
              logo: "/#",
              url: process.env.NEXT_PUBLIC_SITE_URL,
              telephone: "+9 (5**) ***-****",
              sameAs: [
                "https://twitter.com/#",
                "https://www.facebook.com/#",
                "https://www.instagram.com/#",
                "https://www.wikidata.org/wiki/Q90684199"
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "7928 West Dr #901, North Bay Village",
                addressLocality: "Florida",
                postalCode: "33141",
                addressCountry: {
                  "@type": "Country",
                  name: "USA"
                }
              }
            })
          }}
        ></Script>
      )}
      <nav className={styles.header} ref={navbarRef}>
        <div className={`${styles.menu_logo} items-center `}>
          <div className={`w-[50px] h-[50px] flex lg:mr-[10px] ${showDrawer}`}>
            {/* TODO: Change this to what you want in your project */}
            <Drawer setIsOpen={setMenuDrawerOpen} isOpen={menuDrawerOpen} />
          </div>
          <NextLink
            href="/"
            as="/"
            className="w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[275px] h-[27px] relative"
          >
            <Image
              src="/images/main_logo_white.svg"
              alt="Logo"
              priority={true}
              isLoad={false}
              isFill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </NextLink>
          <div className="h-[50px] w-[50px] md:hidden relative">
            {router.route != "/" && (
              <div className="h-full w-full cursor-pointer relative" onClick={() => console.info("Clicked")}>
                <Image
                  src={"/images/header-search-2.webp"}
                  alt="Find a yacht"
                  isFill
                  isLoad={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                />
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:flex items-center">
          <div className="hidden lg:block">
            <DesktopMenu />
          </div>
          {router.route != "/" && (
            <Button
              startIcon={
                <svg
                  className="w-[24px] mr-2 inline align-[-.125em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                  ></path>
                </svg>
              }
              // startIcon={faSearch}
              onClick={() => console.info("Clicked")}
              className="xl:h-[58px] !rounded-lg !text-[20px] xl:!text-[24px] !leading-[28px] !ml-[15px] xl:!ml-[30px] whitespace-nowrap shrink-0"
            >
              Find a Yacht
            </Button>
          )}
        </div>
      </nav>
      {(pageTitle || bgImgUrl) && <PageTitle title={pageTitle} bgImgUrl={bgImgUrl} />}
    </>
  )
}

export default Header

const windowGlobal = typeof window !== "undefined" && window
