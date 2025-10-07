import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import GlobalContext from "../context/GlobalContext";

const Success = ({ msg }) => {
  const navigate = useNavigate();

  const { setMessage } = useContext(GlobalContext);

  const handleClick = () => {
    setMessage("");
    navigate("/");
  };

  return (
    <div className="success-box">
      <FontAwesomeIcon icon={faCircleCheck} className="success-icon" />
      <h1 className="success-heading">Thank You For Reaching Out!</h1>
      <h3 className="success-msg">{msg}</h3>
      <Button text="Go to Home" btnType="primary" onClick={handleClick} />
    </div>
  );
};

export default Success;
