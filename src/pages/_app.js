import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../styles/globals.scss"
import "swiper/css"
import { useRouter } from "next/router"
import { useEffect } from "react"

// TODO: fix modals. Make one component and one provider
import CurrencyProvider from "src/context/currency-context"
import Popup from "src/components/ui/popup"
import PopupContextProvider from "src/context/popup"

function MyApp({ Component, pageProps /* , headerLinks */ }) {
  const { query } = useRouter()

  useEffect(() => {
    if (windowGlobal) {
      if (
        windowGlobal.location.search.length > 0 &&
        document.querySelectorAll("#searchPage").length == 0 &&
        !windowGlobal.location.search.includes("guests") &&
        !windowGlobal.location.search.includes("yacht-type") &&
        !windowGlobal.location.search.includes("date") &&
        !windowGlobal.location.search.includes("price") &&
        !windowGlobal.location.search.includes("size") &&
        !windowGlobal.location.search.includes("scuba") &&
        !windowGlobal.location.search.includes("sort-by")
      ) {
        windowGlobal.sessionStorage.setItem("landingURL", windowGlobal.location.href)
      }
    }
    // if (query?.utm_source) {
    //
    // }
  }, [query])

  return (
    <>
      <CurrencyProvider>
          <PopupContextProvider>
            <Component {...pageProps} /* headerLinks={headerLinks}  */ />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss={true}
              draggable={true}
              pauseOnHover={true}
              // theme="colored"
            />

            <Popup />
          </PopupContextProvider>
      </CurrencyProvider>
    </>
  )
}

// MyApp.getInitialProps = async (ctx) => {
//   const response = await fetchData({apiUrl: "locations", fields: "slug"})
//   return { headerLinks: response }
// }

export default MyApp

const windowGlobal = typeof window !== "undefined" && window
