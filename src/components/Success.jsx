import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearSuccess } from "../features/ui/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { globalSuccess } = useSelector((state) => state.ui);

  const handleClick = () => {
    dispatch(clearSuccess());
    navigate("/");
  };

  return (
    <div className="success-box">
      <FontAwesomeIcon icon={faCircleCheck} className="success-icon" />
      <h1 className="success-heading">Thank You For Reaching Out!</h1>
      <h3 className="success-msg">{globalSuccess}</h3>
      <Button text="Go to Home" btnType="primary" onClick={handleClick} />
    </div>
  );
};

export default Success;
