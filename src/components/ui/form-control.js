import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "src/styles/inputs.module.scss"
import { useEffect, useRef, useState } from "react"

const FormControl = ({
  className = "",
  variant = "input",
  label = "",
  id = "",
  placeholder = "",
  onChange,
  value,
  type = "text",
  error,
  options,
  startIcon,
  name = "",
  fullScreen = false
}) => {
  const ref = useRef()
  const [isMobile, setIsMobile] = useState(true)
  useEffect(() => {
    if (windowGlobal) setIsMobile(windowGlobal.innerWidth < 768)
  }, [windowGlobal, windowGlobal.innerWidth])

  switch (variant) {
    // input
    case "input": {
      return (
        <div className={`${className} ${styles.input}`}>
          <label htmlFor={id} className="!font-bold" style={{ color: error ? "#f2b20e" : "#293338" }}>
            {label}
            {error && (
              <svg className="w-[16px] h-auto ml-[10px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                ></path>
              </svg>
            )}
          </label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`w-full pb-2 ${styles.inputTag}`}
            onChange={onChange}
            name={name}
          />
        </div>
      )
    }
    // select
    case "select": {
      return (
        <div className={`${className} ${styles.select} relative`}>
          <label htmlFor={id} className="!font-bold" style={{ color: error ? "#f2b20e" : "#293338" }}>
            {label}
            {error && (
              <svg
                className="w-[16px] h-auto ml-[10px] inline align-[-.125em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                ></path>
              </svg>
            )}
          </label>
          {startIcon && startIcon}
          <select
            id={id}
            className="w-full appearance-none pb-2 bg-white"
            onChange={onChange}
            defaultValue=""
            style={{ paddingLeft: startIcon ? 24 : 0 }}
            name={name}
          >
            <option value="">{placeholder}</option>

            {options.length > 0 && options.map((option, index) => {
              if (option.options) {
                return (
                  <optgroup key={index} label={option.label}>
                    {option.options.map(({ label, value }, index) => (
                      <option value={value} key={index * 10}>
                        {label}
                      </option>
                    ))}
                  </optgroup>
                )
              }
              if (option.value) {
                return (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                )
              }
            })}
          </select>
        </div>
      )
    }
    // date
    case "date": {
      function handleCloseCalender() {
        if (windowGlobal && isMobile) {
          document.body.style.overflow = "visible"
        }
      }

      function handleOpenCalender() {
        ref.current.setBlur()
        if (windowGlobal && isMobile) {
          const closeBtn = document.createElement("div")
          closeBtn.id = "closeDates"
          closeBtn.className = "close-date-picker-btn"
          closeBtn.innerHTML = `<div class="close-date-picker-btn-inner">X</div>`
          closeBtn.addEventListener("click", () => {
            ref.current.setOpen(false)
          })
          document.getElementsByClassName("react-datepicker")[0].appendChild(closeBtn)
          document.body.style.overflow = "hidden"
        }
      }

      return (
        <div className={`${className} ${styles.inputDatePicker} date-picker`}>
          <label htmlFor={id} className="!font-bold" style={{ color: error ? "#f2b20e" : "#293338" }}>
            {label}
            {error && (
              <svg
                className="w-[16px] h-auto ml-[10px] inline align-[-.125em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                ></path>
              </svg>
            )}
          </label>
          <ReactDatePicker
            id={id}
            ref={ref}
            placeholderText={placeholder}
            onCalendarOpen={() => handleOpenCalender()}
            onCalendarClose={() => handleCloseCalender()}
            onChange={onChange}
            minDate={new Date()}
            maxDate={new Date(2030, 11, 18)}
            startDate={value[0]}
            endDate={value[1]}
            showDisabledMonthNavigation
            selectsRange={true}
            isClearable
            monthsShown={2}
            openToDate={new Date()}
            className="pb-2 w-full "
            autoComplete="off"
            withPortal={isMobile}
          />
        </div>
      )
    }
  }
}

export default FormControl

const windowGlobal = typeof window !== "undefined" && window
