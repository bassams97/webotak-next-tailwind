import { gql } from "graphql-request"
import gqlClient from "src/helpers/gql-client"
import { useEffect, useState } from "react"

export default function useOptions() {
  const [options, setOptions] = useState([])
  async function getOptions() {
    const data = await gqlClient({
      query: gql`
        query OptionsQuery {
          option {
            data {
              attributes {
                currency
                minimum_price
                social_icons {
                  id
                  link
                  icon
                }
              }
            }
          }
        }
      `
    })
    // const formatedData = await formatData({ data: data.option.data })
    setOptions(data.option.data.attributes)
  }
  useEffect(() => {
    getOptions()
  }, [])

  return options
}
