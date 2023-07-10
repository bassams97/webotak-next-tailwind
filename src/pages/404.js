import Link from "next/link"
import Image from "src/components/image"
import Layout from "src/components/layout"
import Section from "src/components/ui/section"

const areasList = [
  { name: "Explore Caribbean", slug: "caribbean" },
  { name: "Explore Mediterranean", slug: "mediterranean" },
  { name: "Explore Other Locations", slug: "other-locations" }
]

export default function Error404() {
  return (
    <Layout title="Not Found (404)">
      <Section className="p-[15px] pt-[96px] lg:pb-[50px] lg:px-[45px] font-primary">
        <div className="py-[100px] grid lg:grid-cols-3 text-center lg:text-start">
          <div className="flex justify-center items-center mb-[40px] lg:mb-0">
            <Image
              src="/images/notfound.png"
              alt="not-found-icon"
              className="h-[100px] w-[100px] object-cover lg:h-[140px] lg:w-[140px]"
              height={140}
              width={140}
            />
          </div>
          <div className="lg:col-span-2">
            <h2 className="font-secondary mt-[25px] mb-[10px] text-[40px] leading-[40px] font-[600] text-teal lg:text-[80px] lg:leading-[80px] lg:mt-0 lg:mb-[25px]">
              Oops!
            </h2>
            <h3 className="text-[18px] leading-[32px] mb-[25px] lg:mb-[40px] lg:text-[22px] lg:leading-[32px] text-white">
              Seems that the page you are looking for doesn’t exist or is no longer there.
            </h3>
            <div className="pb-[40px]">
              <Link href="/" className="mb-[15px] font-bold text-link duration-300 lg:hover:text-white">
                Go back to the Homepage
              </Link>
              <div className="h-[1px] w-[90px] border-b border-solid border-b-[rgba(255,255,255,.1)] mt-[40px] mx-auto lg:mx-0"></div>
            </div>
            <ul className="mt-[25px] lg:mt-0">
              {areasList.map(area => (
                <li className="mb-[10px] pb-[15px] text-[16px] leading-[16px] lg:pb-0" key={area.slug}>
                  <Link href={`/${area.slug}`} className="font-bold text-link duration-300 lg:hover:opacity-80">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </Layout>
  )
}
