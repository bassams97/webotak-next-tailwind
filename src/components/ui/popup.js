import Button from "src/components/buttons"
import PopupWrapper from "src/components/ui/modal-wrapper"
import { usePopup } from "src/context/popup"
import styles from "src/styles/components/popup.module.scss"

const Popup = () => {
  const { isOpen, closePopup, content, title, btnText, htmlContent } = usePopup()

  return !htmlContent ? (
    <PopupWrapper open={isOpen} closeModal={closePopup} className="md:!max-h-[100vh]">
      <div className={styles.container}>
        {title && <div className={styles.popup_title}>{title}</div>}
        <div className="text-[24px]">
          <svg
            className="cursor-pointer w-[18px] h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            onClick={closePopup}
          >
            <path
              fill="currentColor"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            ></path>
          </svg>
        </div>
      </div>
      <div className={styles.content_container}>
        <div className={styles.popup_content}>{content}</div>
        <div className={styles.button_container}>
          <Button variant="button" className={styles.button} onClick={closePopup}>
            {btnText || "Close"}
          </Button>
        </div>
      </div>
    </PopupWrapper>
  ) : (
    htmlContent
  )
}

export default Popup
