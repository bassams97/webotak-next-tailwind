import Layout from "src/components/layout"
import Section from "src/components/ui/section"
import HomePageTitle from "./page-title"

const HomePage = ({ data, counts }) => {
  return (
    <Layout title="Home" metaDesc={`Home Page.`}>
      <HomePageTitle />
      <Section
        className="grid grid-cols-1 lg:grid-cols-2 px-[40px] pt-[30px] lg:pt-16"
        sectionClass="overflow-hidden"
      ></Section>
    </Layout>
    // </Suspense>
  )
}

export { HomePage }
