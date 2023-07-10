import { useEffect, useRef } from "react"
import { CSSTransition } from "react-transition-group"

import styles from "src/styles/components/popup.module.scss"

const PopupWrapper = ({ open, closeModal, children, className = "", content = "" }) => {
  const nodeRef = useRef()
  useEffect(() => {
    window.document.body.style.overflow = open ? "hidden" : "auto"
  }, [open])
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={open}
      timeout={500}
      classNames={{
        enterActive: styles.openModal,
        exitActive: styles.closeModal
      }}
      nodeRef={nodeRef}
    >
      <div className="fixed top-0 left-0 bottom-0 right-0 z-[51]" ref={nodeRef}>
        <div className="bg-[rgba(0,0,0,.6)] h-screen w-screen fixed " onClick={closeModal}></div>
        <div
          // !overflow-y-visible
          className={`pb-[20px] bg-primary text-white w-screen h-screen fixed top-[50%] left-[50%] translate-x-[-50%]
            translate-y-[-50%] overflow-y-auto  min-w-[316px]
            md:max-w-[800px] md:w-[90%] md:overflow-y-visible md:max-h-[90vh] md:rounded-[20px] md:h-[inherit] z-20 ${className}`}
        >
          {children}
        </div>
        {content && content}
      </div>
    </CSSTransition>
  )
}

export default PopupWrapper
