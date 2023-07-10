// TODO_formatData: this function needs improve after we get and see all data structure 

export default function formatData(data) {
  if (Array.isArray(data)) {
    if (data.data) {
      return data.data.map(item => ({ id: item.id, ...item.attributes }))
    } else {
      return data.map(item => ({ id: item.id, ...item.attributes }))
    }
  } else if (typeof data == "object") {
    if (!Array.isArray(data.data)) {
      return { id: data.data.id, ...data.data.attributes }
    } else if (Array.isArray(data.data)) {
      return data.data.map(item => ({ id: item.id, ...item.attributes }))
    } else {
      return { id: data.id, ...data.attributes }
    }
  } else {
    const config = {}
    return serverData.data.data.map(item => {
      return { id: item.id, ...item.attributes }
    })
  }
}