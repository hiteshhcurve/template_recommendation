import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const Button = ({ text, icon, type, onClick, disabled }) => {
  return (
    <button
      className={`view-btn ${disabled ? "disabled" : ""}`}
      type={type || "button"}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={faEye} />}
      {text}
    </button>
  );
};

export default Button;
