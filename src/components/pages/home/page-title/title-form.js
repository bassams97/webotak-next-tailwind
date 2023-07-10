import { useState } from "react"
import FormControl from "src/components/ui/form-control"
import { useRouter } from "next/router"
import { dateQueryFormat } from "src/helpers/date-query-format"
import Button from "src/components/buttons"
import { usePopup } from "src/context/popup"

const yachtTypeSelectList = [
  { label: "Motor Yachts", value: "Motor Boat" },
  { label: "Catamarans/Tri", value: "Catamaran" },
  { label: "Monohulls", value: "Monohull" },
  { label: "Motor Sailers", value: "Motor Sailer" }
]

const TitleForm = ({ locationsList = [] }) => {
  const router = useRouter()
  const {isOpen, closePopup} = usePopup()

  const [formData, setFormData] = useState({ location: "", yacht: "", dateRange: [null, null], guests: "" })
  const [error, setError] = useState({ location: false })

  const [isSubmitting, setIsSubmitting] = useState(false)

  function changeHandler(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setError({ ...error, [name]: false })
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.location) {
      newErrors.location = true
    }

    setError(newErrors)
    return Object.values(newErrors).length === 0
  }

  async function submitHandler(e) {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      const formQueries = {}
      const startDate = dateQueryFormat(formData.dateRange[0])
      const endDate = dateQueryFormat(formData.dateRange[1])
      if (formData.dateRange[0] && formData.dateRange[1]) formQueries["date"] = `${startDate}+${endDate}`
      if (formData.yacht) formQueries["yacht-type"] = formData.yacht
      if (formData.guests) formQueries["guests"] = formData.guests
      await router.push({
        pathname: `/${formData.location}/find-a-yacht`,
        query: { ...formQueries }
      })
      if (windowGlobal && windowGlobal.location) {
        windowGlobal.sessionStorage.setItem("lastSearch", windowGlobal.location.href)
      }
      if (isOpen) closePopup()
    }
  }

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-12 lg:w-[900px] gap-4 lg:gap-0 lg:shadow-lg [&_label]:!font-[500]"
      onSubmit={submitHandler}
    >
      <div
        className="bg-white lg:col-span-4 rounded-[10px] lg:rounded-r-none p-3 px-4 lg:pr-0 shadow-lg
       lg:shadow-none"
      >
        <FormControl
          id="yacht-search-area_id"
          variant="select"
          placeholder="Search your Location"
          label="Select a location to find a yacht"
          name="location"
          startIcon={
            <svg
              className="w-[16px] h-auto absolute pointer-events-none select-none bottom-3 text-[#b1b1b1]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              ></path>
            </svg>
          }
          className="!border-none !pl-0"
          onChange={changeHandler}
          error={error.location}
          options={locationsList}
        />
      </div>
      <div className="bg-white lg:col-span-5 rounded-[10px] lg:rounded-none p-3 px-4 lg:pr-0 shadow-lg lg:shadow-none flex">
        <FormControl
          id="yacht-type"
          variant="select"
          placeholder="Select Type"
          label="All Yachts"
          name="yacht"
          className="grow shrink-1 w-[45%] !border-[0] lg:!border-l !pl-0 lg:!pl-[8px]"
          onChange={changeHandler}
          options={yachtTypeSelectList}
        />
        <FormControl
          id="from-to"
          variant="date"
          placeholder="From - To"
          label="Dates"
          className="grow shrink-1 w-[35%]"
          value={formData.dateRange}
          onChange={date => setFormData({ ...formData, dateRange: date })}
        />
        <FormControl
          id="guests"
          variant="input"
          placeholder="#"
          label="Guests"
          type="number"
          name="guests"
          onChange={changeHandler}
          className="grow shrink-1 w-[20%]"
        />
      </div>
      <div className="lg:bg-white lg:col-span-3 flex lg:p-[12px] justify-center rounded-r-md">
        <Button
          className="lg:w-full px-[40px] py-[15px] rounded-md text-white !font-bold lg:rounded-md
          duration-300 shadow-lg text-[15px] uppercase"
          type="submit"
          disabled={isSubmitting}
          style={{ pointerEvents: isSubmitting ? "none" : "auto" }}
        >
          Explore now
        </Button>
      </div>
    </form>
  )
}

export default TitleForm

const windowGlobal = typeof window !== "undefined" && window
