import axios from "axios"
import formatData from "./formatData"

export default async function fetchData({
  limit,
  apiUrl,
  fields,
  populate,
  populateLevel,
  is_formatData = true,
  where = { field: "", value: "", operator: "$eq" },
  href = ""
}) {
  // const apiForRequest = populate ? `${apiUrl}?populate=${populate}` : fields ? `${apiUrl}?fields=${fields}` : `${apiUrl}`
  let apiRoute = apiUrl

  let i = 1

  if (where.field && where.value) {
    if (i == 1) {
      apiRoute += `?filters[${where.field}][${where.operator}]=${where.value}`
      i++
    } else {
      apiRoute += `&filters[${where.field}][${where.operator}]=${where.value}`
    }
  }

  if (limit) {
    if (i == 1) {
      apiRoute += `?pagination[limit]=${limit}`
      i++
    } else {
      apiRoute += `&pagination[limit]=${limit}`
    }
  }

  if (populate) {
    if (i == 1) {
      apiRoute += `?populate=${populate}`
      i++
    } else {
      apiRoute += `&populate=${populate}`
    }
  }

  if (populateLevel) {
    if (i == 1) {
      apiRoute += `?populate${populateLevel}`
      i++
    } else {
      apiRoute += `&populate${populateLevel}`
    }
  }

  if (fields) {
    if (i == 1) {
      apiRoute += `?fields=${fields}`
      i++
    } else {
      apiRoute += `&fields=${fields}`
    }
  }

  try {
    const serverData = await axios.get(`${href ? href : process.env.NEXT_PUBLIC_API_URL}/api/${apiRoute}`)
    if (is_formatData) {
      const formatedData = formatData(serverData.data)
      return formatedData /* .data.map(item => ({ id: item.id, ...item.attributes })) */
    } else {
      return serverData.data
    }
  } catch (err) {
    let error

    if (err.response?.data) {
      if (err.response.data.error?.message) {
        error = err.response.data.error.message
      } else {
        error = err.response.data
      }
    } else if (err.message) {
      error = err.message
    }

    return { errorMessage: error }
  }
}
