import styles from "src/styles/components/buttons.module.scss"
import Link from "next/link"

export default function Button({
  children,
  startIcon,
  endIcon,
  style,
  href,
  variant = "button",
  className = "",
  onClick,
  disabled = false
}) {
  const content = (
    <>
      {startIcon && startIcon}
      {children}
      {endIcon && endIcon}
    </>
  )
  return href ? (
    <Link className={`${styles[variant]} ${className}`} style={{ ...style }} href={href}>
      {content}
    </Link>
  ) : (
    <button
      className={`${styles[variant]} ${className}`}
      style={{ ...style }}
      onClick={onClick}
      disabled={disabled}
      aria-label="Button"
    >
      {content}
    </button>
  )
}
