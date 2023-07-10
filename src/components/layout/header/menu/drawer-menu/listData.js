import formatData from "src/helpers/formatData"

export default function listData(data = {}, section) {
  const area = data.filter(item => item.slug == section)[0]
  const list = {}
  for (const key in area.locations) {
    if (Object.hasOwnProperty.call(area.locations, key)) {
      list[key] = area.locations[key]
    }
  }
  const formattedList = formatData(list)
  return {
    slug: area.slug,
    title: area.title,
    list: formattedList
  }
}
