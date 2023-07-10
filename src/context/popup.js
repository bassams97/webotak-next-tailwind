import { createContext, useContext, useState } from "react"

const Context = createContext({
  isOpen: false,
  content: "",
  title: "",
  btnText: "",
  yachtInfo: "",
  htmlContent: "",
  openPopup: (content, title, btnText, yachtInfo, htmlContent) => {},
  closePopup: () => {}
})

export const usePopup = () => useContext(Context)

const PopupContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    content: "",
    title: "",
    btnText: "",
    yachtInfo: null,
    htmlContent: ""
  })

  function openPopup({ content, titleText, buttonText, yachtInfo, htmlContent }) {
    setState({
      ...state,
      content: content,
      title: titleText,
      btnText: buttonText,
      yachtInfo: yachtInfo,
      isOpen: true,
      htmlContent: htmlContent
    })
  }

  function closePopup() {
    setState({
      ...state,
      content: "",
      title: "",
      btnText: "",
      yachtInfo: null,
      htmlContent: "",
      isOpen: false
    })
  }

  const value = {
    openPopup,
    closePopup,
    ...state
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default PopupContextProvider
