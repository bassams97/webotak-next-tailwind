import styles from "src/styles/pagination.module.scss"

const PaginationButton = ({ className = "", children, active, disabled, onClick }) => {
  const classes = `${active ? styles.active : disabled ? styles.disabled : ""}`
  return (
    <li className={`${styles.paginationButton} ${classes} ${className}`} onClick={onClick}>
      <div>{children && children}</div>
    </li>
  )
}

export default PaginationButton
