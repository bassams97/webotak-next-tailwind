import { gql } from "graphql-request"
import gqlClient from "src/helpers/gql-client"
import { HomePage } from "src/components/pages"
export default function Home({ data = "", counts = "" }) {
  return <HomePage data={data} counts={counts} />
}

export async function getStaticProps() {
  const options = await gqlClient({
    query: gql`
      query OptionQuery {
        option {
          data {
            attributes {
              minimum_price
            }
          }
        }
      }
    `
  })

  const data = await gqlClient({
    query: gql`
      query HomeQuery {
        localLocations(pagination: { limit: 12 }, filters: { visible_on_home_page: { eq: true } }) {
          data {
            id
            attributes {
              name
              slug
              square_image {
                data {
                  attributes {
                    formats
                    #url
                  }
                }
              }
              image {
                data {
                  attributes {
                    formats
                  }
                }
              }
              area {
                data {
                  attributes {
                    title
                  }
                }
              }
            }
          }
        }
        areas {
          data {
            attributes {
              square_image {
                data {
                  attributes {
                    formats
                    url
                  }
                }
              }
              image {
                data {
                  attributes {
                    formats
                  }
                }
              }
              slug
              title
            }
          }
        }
        yachts(pagination: { limit: 5 }, filters: { featured: { eq: true }, yachtLowNumericPrice: { gt: ${options.option.data.attributes.minimum_price} } }) {
          data {
            id
            attributes {
              #slugID
              #yachtCurrencySymbol
              #yachtCrew
              #yachtTermsTypeNum
              yachtName
              sizeFeet
              sizeMeter
              yachtUnits
              yachtCurrency
              yachtHighNumericPrice
              yachtLowNumericPrice
              yachtCabins
              yachtPax
              yachtTermsType
              yachtScubaOnboard
              mainImage {
                data {
                  attributes {
                    formats
                  }
                }
              }
            }
          }
        }

        reviews(filters: { showOnHomePage: { eq: true }, approved: { eq: true } }, pagination: { limit: 5 }) {
          data {
            id
            attributes {
              brokerRate
              brokerComment
              startingDate
              guestFirstName
              guestLastName
              yacht {
                data {
                  id
                  attributes {
                    yachtName
                    sizeFeet
                    sizeMeter
                    yachtUnits
                    yachtYearBuilt
                    yachtBuilder
                  }
                }
              }
            }
          }
        }

        blogs(pagination: { limit: 5 }, filters: { featured: { eq: true } }) {
          data {
            id
            attributes {
              slug
              title
              image {
                data {
                  attributes {
                    url
                    formats
                  }
                }
              }
            }
          }
        }
      }
    `
  })

  const counts = await gqlClient({
    query: gql`
      query CountQuery {
        yachts(filters: {yachtLowNumericPrice: { gt: ${options.option.data.attributes.minimum_price} }}) {
          meta {
            pagination {
              total
            }
          }
        }
        locations {
          meta {
            pagination {
              total
            }
          }
        }
      }
    `
  })

  return {
    props: {
      data,
      counts: counts
    },
    revalidate: 10
  }
}
