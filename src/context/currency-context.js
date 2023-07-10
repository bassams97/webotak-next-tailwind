import { createContext, useContext, useState, useEffect } from "react"
import { getLocalCurrency } from "src/helpers/get-local-currency"
import useOptions from "src/hooks/useOptions"

const CurrencyContext = createContext({
  localCurrency: "",
  currencyRate: 0,
  setCurrencyHandler: currency => {}
})

export const useCurrency = () => useContext(CurrencyContext)

export default function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("")
  const [currencyRate, setCurrencyRate] = useState(0)
  const { currency: currencyRateOption } = useOptions()
  useEffect(() => {
    if (windowGlobal) {
      let storedCurrency = getLocalCurrency()
      setCurrency(storedCurrency)
      if (currencyRateOption?.usd) {
        windowGlobal.sessionStorage.setItem("currencyRate", currencyRateOption.usd)
        windowGlobal.sessionStorage.setItem("currencyUpdate", currencyRateOption.last_update)
        setCurrencyRate(currencyRateOption.usd)
      } else {
        const storedCurrencyRate = +windowGlobal.sessionStorage.getItem("currencyRate") || 0
        setCurrencyRate(storedCurrencyRate)
      }
    }
  }, [currencyRateOption])

  function setCurrencyHandler(selectedCurrency) {
    setCurrency(selectedCurrency)
    if (windowGlobal) {
      windowGlobal.localStorage.setItem("currencyUpdate", currencyRateOption.last_update)
      windowGlobal.localStorage.setItem("currency", selectedCurrency)
    }
  }

  return (
    <CurrencyContext.Provider value={{ localCurrency: currency, currencyRate, setCurrencyHandler }}>
      {children}
    </CurrencyContext.Provider>
  )
}

const windowGlobal = typeof window !== "undefined" && window
