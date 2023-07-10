import axios from "axios"

export default async function createData(props) {
  const { apiUrl = "", data = {}, isDataObject = true, method = "post", id = "" } = props

  const handleDataObject = isDataObject ? { data: { ...data } } : { ...data }

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
  //   }
  // }
  if (!process.env.NEXT_PUBLIC_MODE) {
    try {
      let response
      if (method == "post") {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${apiUrl}`,
          {
            ...handleDataObject
          }
          // config
        )
      } else if (method == "put") {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${apiUrl}/${id}`,
          {
            ...handleDataObject
          }
          // config
        )
      }
      return response?.data
    } catch (err) {
      let error
      // console.log(err?.response.data || err)
      if (err.response.data) {
        if (err.response.data.error?.message) {
          error = err.response.data.error.message
        } else {
          error = err.response.data
        }
      } else if (err.message) {
        error = err.message
      }
      console.error(err?.response?.data || err.message)
      return { errorMessage: error }
    }
  }
}
