import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const Error = ({ msg }) => {
  return (
    <div className="error-box">
      <FontAwesomeIcon icon={faTriangleExclamation} className="error-icon" />
      <h1 className="error-heading">Oops! Something went wrong!</h1>
      <h3 className="error-msg">{msg}</h3>
    </div>
  );
};

export default Error;
