import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "../features/ui/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Error = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { globalError } = useSelector((state) => state.ui);

  const handleClick = () => {
    dispatch(clearError());
    navigate("/");
  };

  return (
    <div className="error-box">
      <FontAwesomeIcon icon={faTriangleExclamation} className="error-icon" />
      <h1 className="error-heading">Oops! Something went wrong!</h1>
      <h3 className="error-msg">{globalError}</h3>
      <Button text="Go to Home" btnType="primary" onClick={handleClick} />
    </div>
  );
};

export default Error;
