import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Button = ({ text, icon, type, onClick, disabled, width }) => {
  return (
    <button
      className={`view-btn ${disabled ? "disabled" : ""}`}
      type={type || "button"}
      style={{ width: `${width === "full" ? "100%" : "auto"}` }}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={faEye} />}
      {text}
    </button>
  );
};

export default Button;
