import Footer from "./footer"
import Header from "./header"

export default function Layout({
  pageTitle,
  children,
  bgImgUrl,
  title,
  className = "",
  metaDesc,
  structuredData = null
}) {
  return (
    <>
      <Header
        pageTitle={pageTitle}
        bgImgUrl={bgImgUrl}
        title={title}
        metaDesc={metaDesc}
        structuredData={structuredData}
      />
      <main className={`${className}`}>{children}</main>
      <Footer />
    </>
  )
}
