import { useEffect, useState } from "react"
import { useCurrency } from "src/context/currency-context"
import { SelectControl } from "."

const currencyList = [
  { name: "EUR", value: "eur" },
  { name: "USD", value: "usd" }
]

const CurrencySelect = ({ className = "", ...rest }) => {
  const [defaultCurrencyOption, setDefaultCurrencyOption] = useState({ name: "", value: "" })
  const { localCurrency, setCurrencyHandler } = useCurrency()

  useEffect(() => {
    if (windowGlobal) {
      const storedCurrencyOption =
        currencyList.find(currencyOption => currencyOption.value === localCurrency) || currencyList[1]
      setDefaultCurrencyOption(storedCurrencyOption)
    }
  }, [localCurrency])

  function currencyClickHandler(currencyOption) {
    setDefaultCurrencyOption(currencyOption)
    setCurrencyHandler(currencyOption.value)
  }

  const formattedCurrencyList = currencyList.filter(currency => currency.value !== defaultCurrencyOption.value)

  return (
    <SelectControl
      label="Currency"
      className={className}
      list={formattedCurrencyList}
      labelInside
      defaultOption={defaultCurrencyOption}
      onClick={currencyClickHandler}
      isCurrency
      {...rest}
    />
  )
}

export default CurrencySelect

const windowGlobal = typeof window !== "undefined" && window
