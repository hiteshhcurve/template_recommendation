"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearSuccess } from "@/features/ui/uiSlice";
import { setSelectedTemplates } from "@/features/templates/templateSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Success = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { globalSuccess } = useSelector((state) => state.ui);
  const campaignID = useSelector((state) => state.filters.campaignID);

  const handleClick = (e) => {
    e.preventDefault();

    const query = {
      campaign_id: campaignID,
    };

    const encodedQuery = btoa(JSON.stringify(query));

    dispatch(clearSuccess());
    dispatch(setSelectedTemplates([]));
    router.push(`/${encodedQuery}`);
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
