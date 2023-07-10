import PaginationButton from "./pagination-button"

// NOTE: maxButtons means how much buttons should show in pagination
const Pagination = ({ pages = [], currentPage = 0, setCurrentPage, maxButtons = 9 }) => {
  let pageCount = 0

  return (
    pages.length > 1 && (
      <div className="pt-[45px]">
        <ul className="flex flex-wrap justify-center lg:justify-end">
          <PaginationButton
            disabled={currentPage === 0}
            onClick={() => {
              setCurrentPage(prevPage => prevPage - 1)
            }}
          >
            «
          </PaginationButton>
          {pages.map((_, index) => {
            if (pageCount >= maxButtons) return // if all maxButtons showed then don't show more
            if (
              currentPage <= maxButtons / 2 || // if in start then show every buttons ahead
              index >= pages.length - maxButtons || // if reach the end then show every buttons behind
              (index >= currentPage - maxButtons / 2 && index <= currentPage + maxButtons / 2) // make right/left gap around the middle
            ) {
              pageCount++
              return (
                <PaginationButton
                  active={currentPage === index}
                  onClick={() => {
                    setCurrentPage(index)
                  }}
                  key={index}
                >
                  {index + 1}
                </PaginationButton>
              )
            }
          })}

          <PaginationButton
            disabled={pages.length === currentPage + 1}
            onClick={() => {
              setCurrentPage(prevPage => prevPage + 1)
            }}
          >
            »
          </PaginationButton>
        </ul>
      </div>
    )
  )
}

export default Pagination
