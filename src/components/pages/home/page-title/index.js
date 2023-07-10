import styles from "src/styles/layout.module.scss"
import TitleForm from "./title-form"
import { usePopup } from "src/context/popup"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import HeaderBG from "../../../../../public/images/home1-min-1.webp"

export default function HomePageTitle({ className = "", bgStyles = "" }) {
  const [dataLists, setDataLists] = useState({ caribbeans: [], mediterranean: [], restOfWorld: [] })
  const { openPopup } = usePopup()

  useEffect(() => {
    const popupContent = (
      <div className={styles.modal_spanish}>
        <h3>
          <b>
            A pesar de que el sitio se encuentra únicamente en Inglés, nuestros representantes hablan perfecto Español y
            con gusto lo ayudarán a encontrar el barco que está buscando.
          </b>
        </h3>
        <h4>
          Por favor, navegue el sitio tranquilo y pregunte en Español acerca de los barcos que le interesen que con
          gusto lo asistiremos.
        </h4>
        <p>
          <b>
            Si usted no habla Inglés no dude en <Link href="contact-us">contactarnos directamente.</Link>
          </b>
        </p>
        <p>Estamos trabajando para hacer una versión en Español del sitio.</p>
        <p>
          <b>Desde ya gracias por su comprensión.</b>
        </p>
      </div>
    )
    if (windowGlobal && windowGlobal.location.search === "?spanish=yes") {
      openPopup({
        content: popupContent,
        titleText: "¿Hablas Español? Este mensaje es importante para ti.",
        buttonText: "Cerrar"
      })
    }
  }, [])

  return (
    <div className={`${styles.pageTitle} ${styles.home_pageTitle} ${className}`}>
      <div
        className={`${styles.home_pageTitle_bg} ${bgStyles}`}
        style={{ backgroundImage: `url(/images/home1-min-1.webp)` }}
      ></div>
      <Image
        src={HeaderBG}
        alt={"header BG"}
        className={`lg:duration-[.4s] object-cover w-full h-full z-0 brightness-[.home_7] ${bgStyles}`}
        // height={280}
        // width={280}
        fill
        priority={true}
        // isFill={true}
        // sizes="(max-width: 768px) 100vw,
        //       (max-width: 1200px) 33vw,
        //       25vw"
      />

      <h2 className={styles.home_pageTitle_title}>Crewed luxury yacht charters</h2>
      <h3 className={styles.home_pageTitle_subTitle}>Quality time awaits on board!</h3>
      <div className={styles.home_form_container}>
        <TitleForm locationsList={dataLists || []} />
      </div>
    </div>
  )
}

const windowGlobal = typeof window !== "undefined" && window
