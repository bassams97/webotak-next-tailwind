import NextLink from "next/link"

const areas = [
  { slug: "caribbean", name: "Caribbean" },
  { slug: "mediterranean", name: "Mediterranean" },
  { slug: "other-locations", name: "Other Locations" }
]

export default function DesktopMenu() {
  return (
    <ul className="flex items-center lg:gap-x-[10px] xl:gap-x-[30px]">
      {areas.map(area => (
        <li className="text-center" key={area.slug}>
          <NextLink
            
            href={`/${area.slug}`}
            className="text-white text-[20px] font-[500] leading-[24px]"
          >
            {area.name}
          </NextLink>
        </li>
      ))}
    </ul>
  )
}
