import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const Button = ({ text, icon, type, onClick }) => {
  return (
    <button className="view-btn" type={type || "button"} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={faEye} />}
      {text}
    </button>
  );
};

export default Button;
