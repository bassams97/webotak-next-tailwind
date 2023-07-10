import Link from 'next/link'

const BreadCrumb = ({ className = '', style, breadCrumbs }) => {
  return (
    <div className={`[&_*]:font-primary text-white text-[14px] lg:text-[18px] ${className} mb-[20px] lg:mb-[40px]`} style={style}>
      {breadCrumbs?.length > 0 &&
        breadCrumbs.map((crumb, index) => (
          <span key={index} className='!font-bold'>
            {crumb.link ? (
              <>
                <Link href={crumb.link} className="lg:hover:text-link duration-300 !font-bold">
                  {crumb.text}
                </Link>{' '}
                &#62; {' '}
              </>
            ) : (
              <span className="text-[#a3a3a3] !font-bold"> {crumb.text}</span>
            )}
          </span>
        ))}
    </div>
  )
}

export default BreadCrumb
