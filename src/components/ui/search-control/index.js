import Image from "src/components/image"
import { forwardRef, useEffect, useRef, useState } from "react"
import { useClickedOutside } from "src/hooks/useClickedOutside"
import styles from "src/styles/search-control.module.scss"
import ReactDatePicker from "react-datepicker"
import { useRouter } from "next/router"
import { dateQueryFormat } from "src/helpers/date-query-format"

export function SelectControl({
  id = "",
  label = "",
  className = "",
  list = [],
  selectedValue = 0,
  labelInside = false,
  defaultOption = { name: "Not defined", value: 0 },
  onClick,
  isCurrency = false
}) {
  const [expended, setExpended] = useState(false)
  const router = useRouter()
  const ref = useRef(null)

  useClickedOutside(ref, () => {
    setExpended(false)
  })

  function toggleSelectHandler() {
    setExpended(!expended)
  }

  function clickSelectHandler(option) {
    setExpended(false)

    // if currency
    if (isCurrency) {
      onClick(option)
      return
    }
    if (onClick) onClick(option.value)

    let newQuery = { ...router.query, [id]: option.value }
    if (!option.value) delete newQuery[id]
    router.replace({ query: { ...newQuery } }, undefined, { shallow: true })
  }

  let formattedList = [{ ...defaultOption }, ...list]

  // if currency
  if (isCurrency) {
    formattedList = formattedList.slice(1)
  }

  const selectedOption = formattedList.find(option => option.value === selectedValue)

  return (
    <InputWrapper
      ref={ref}
      className={className}
      expended={expended}
      selectedValue={selectedValue !== defaultOption.value}
    >
      <div className={styles.input} onClick={toggleSelectHandler}>
        <div className={styles.inputValue}>
          {labelInside ? `${label}:` : <div className={styles.labelTop}>{label}</div>}
          {/* if currency */}
          <span className={!labelInside ? styles.activeHover : ""}>
            {isCurrency ? defaultOption.name : selectedOption?.name}
          </span>
        </div>
        <div className={styles.inputIcon}>
          <svg
            className="w-[10px] h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        className={`${styles.list} !overflow-y-visible !z-[16]`}
        style={{ height: expended ? formattedList.length * 34 : 0 }}
      >
        <ul>
          {formattedList.map((option, index) => (
            <li
              onClick={() => {
                clickSelectHandler(option)
              }}
              key={index}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </InputWrapper>
  )
}

export function CheckboxControl({ id, label, className = "", labelInside, onClick, imgUrl, selectedValue = false }) {
  const [checked, setChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setChecked(selectedValue)
  }, [selectedValue])

  function toggleCheckboxHandler() {
    const currentValue = !checked

    setChecked(currentValue)
    if (onClick) onClick(currentValue)

    let newQuery = { ...router.query, [id]: currentValue }
    if (!currentValue) delete newQuery[id]
    router.replace({ query: { ...newQuery } }, undefined, { shallow: true })
  }

  return (
    <InputWrapper className={`${className} ${styles.checkbox}`} selectedValue={selectedValue}>
      <div className={styles.input} onClick={toggleCheckboxHandler}>
        <div className={`${styles.inputValue} overflow-hidden`}>
          {labelInside ? `${label}:` : <div className={styles.labelTop}>{label}</div>}
          <span className={`${!labelInside ? styles.activeHover : ""}`}>
            {imgUrl && (
              <span className="!mr-1 block h-[17px] w-[28px] relative">
                <Image src={imgUrl} alt="checkbox-icon" className="" width={30} height={20} isLoad={false} />
              </span>
            )}
            <input type="checkbox" checked={checked} readOnly className="mr-1 cursor-pointer" />
            {/* NOTE: we can change this if we want */}
            <span>{label}</span>
          </span>
        </div>
      </div>
    </InputWrapper>
  )
}

export function DatePickerControl({
  id,
  label,
  className = "",
  labelInside,
  placeholder,
  value,
  onChange,
  showOnlyValue,
  onChangeShowOnly,
  showOnlySwitch
}) {
  const [expended, setExpended] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const router = useRouter()
  const calendarRef = useRef(null)

  function dateChangeHandler(value, prop = "dates") {
    if (prop == "dates") {
      const startDate = dateQueryFormat(value[0])
      const endDate = dateQueryFormat(value[1])

      let newQuery = { ...router.query, [id]: `${startDate}+${endDate}` }
      if (!value[1] || !value[0]) delete newQuery[id]
      router.replace({ query: { ...newQuery } }, undefined, { shallow: true })
    } else if (prop == "showOnly") {
      onChangeShowOnly(value)
      let newQuery = { ...router.query, showOnly: value }
      if (!value) delete newQuery["showOnly"]
      router.replace({ query: { ...newQuery } }, undefined, { shallow: true })
    }
  }

  function toggleDateHandler() {
    setExpended(!expended)
  }

  useEffect(() => {
    if (windowGlobal) setIsMobile(windowGlobal.innerWidth < 768)
  }, [windowGlobal, windowGlobal.innerWidth])

  function handleCloseCalender() {
    if (windowGlobal && isMobile) {
      document.body.style.overflow = "visible"
    }
  }

  function handleOpenCalender() {
    calendarRef.current.setBlur()
    if (windowGlobal && isMobile) {
      document.body.style.overflow = "hidden"
    }
  }

  function handleOpenCalender() {
    calendarRef.current.setBlur()
    if (windowGlobal && isMobile) {
      const closeBtn = document.createElement("div")
      closeBtn.id = "closeDates"
      closeBtn.className = "close-date-picker-btn"
      closeBtn.innerHTML = `<div class="close-date-picker-btn-inner">X</div>`
      closeBtn.addEventListener("click", () => {
        calendarRef.current.setOpen(false)
      })
      document.getElementsByClassName("react-datepicker")[0].appendChild(closeBtn)
      document.body.style.overflow = "hidden"
    }
  }

  return (
    <InputWrapper className={className} selectedValue={value[0]}>
      <div className={styles.input} onClick={toggleDateHandler}>
        <div className={`${styles.inputValue} !p-0 w-full`}>
          {labelInside ? `${label}:` : <div className={`${styles.labelTop} z-10 ml-3`}>{label}</div>}
          <span className={`${!labelInside ? styles.activeHover : ""} h-full !mt-0 w-full`}>
            <div className={`date-picker date-picker-dark search-date-input`}>
              <ReactDatePicker
                ref={calendarRef}
                placeholderText={placeholder}
                onCalendarOpen={() => handleOpenCalender()}
                onChange={e => {
                  dateChangeHandler(e, "dates")
                  onChange(e)
                }}
                onCalendarClose={() => handleCloseCalender()}
                minDate={new Date()}
                maxDate={new Date(2040, 11, 18)}
                startDate={value[0]}
                endDate={value[1]}
                showDisabledMonthNavigation
                selectsRange={true}
                isClearable
                monthsShown={2}
                openToDate={new Date()}
                className="w-full h-[53px] bg-primary p-[11px] leading-[normal] rounded-xs"
                autoComplete="off"
                format="MM-dd-yyyy"
                withPortal={isMobile}
              >
                {showOnlySwitch && (
                  <div className={styles.showOnly_hasCalendar}>
                    <img
                      src={"../../images/live-calendar-yes.png"}
                      className={styles.calendarIcon}
                      alt="live-Calendar-yes"
                    />
                    <label className={styles.only_yachts_with_calendar_label} htmlFor="only-yachts-with-Calendar">
                      {/* {showOnlyValue ? "Show All Yachts" : "Show only yachts with live Calendar"} */}
                      Show only yachts with live Calendar
                    </label>
                    <input
                      type="checkbox"
                      checked={showOnlyValue}
                      onChange={e => dateChangeHandler(e.target.checked, "showOnly")}
                      id="only-yachts-with-Calendar"
                      className={styles.only_yachts_with_calendar_switch}
                    />
                  </div>
                )}
              </ReactDatePicker>
            </div>
          </span>
        </div>
      </div>
    </InputWrapper>
  )
}

const InputWrapper = forwardRef(({ children, className, expended, selectedValue }, ref) => {
  return (
    <div
      className={`${styles.searchControl} ${expended ? styles.active : ""} ${
        selectedValue ? styles.selectedValue : ""
      } ${className}`}
      ref={ref}
    >
      {children}
    </div>
  )
})

export default InputWrapper

const windowGlobal = typeof window !== "undefined" && window
