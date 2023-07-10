export function getLocalCurrency() {
  let localCurrency = "usd"
  if (windowGlobal) {
    localCurrency = windowGlobal.localStorage.getItem("currency")?.toLowerCase()
    if (localCurrency) {
      if (localCurrency !== "usd" && localCurrency !== "eur") {
        return "usd"
      }
    } else {
      windowGlobal.localStorage.setItem("currency", "usd")
      return "usd"
    }
  }

  return localCurrency
}

const windowGlobal = typeof window !== "undefined" && window
