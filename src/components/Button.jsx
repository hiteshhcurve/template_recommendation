import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ text, icon, type, onClick, disabled, width, btnType }) => {
  return (
    <button
      className={`btn-${btnType} ${disabled ? "disabled" : ""}`}
      type={type || "button"}
      style={{ width: `${width === "full" ? "100%" : "auto"}` }}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text}
    </button>
  );
};

export default Button;
