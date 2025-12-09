import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../features/filters/filterSlice";
import { reset as resetBrief } from "../features/brief/briefSlice";
import { setSelectedTemplates } from "../features/templates/templateSlice";
import {
  faRightToBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { selected } = useSelector((state) => state.templates);
  const { campaignID } = useSelector((state) => state.filters);

  const isLoginPage = pathname.includes("/selected");

  const handleLogoClick = (e) => {
    e.preventDefault();

    const query = {
      campaign_id: campaignID,
    };

    const encodedQuery = btoa(JSON.stringify(query));

    dispatch(resetFilters());
    dispatch(setSelectedTemplates([]));
    dispatch(resetBrief());
    navigate(`/${encodedQuery}`);
  };

  const handleNavigate = () => {
    if (pathname.includes("/selected/")) {
      const query = {
        campaign_id: campaignID,
        templates: selected?.map((s) => s.id),
      };

      const encodedQuery = btoa(JSON.stringify(query));
      navigate(`/create-brief/${encodedQuery}`);
    } else {
      const query = {
        campaign_id: campaignID,
        templates: selected?.map((s) => s.id),
      };

      const encodedQuery = btoa(JSON.stringify(query));
      const url = `/selected/${encodedQuery}`;
      console.log(url);
      navigate(url);
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">
                <img
                  src="https://s.hcurvecdn.com/selfserve_v2/images/f_logo.webp"
                  alt="HC Logo"
                  className="logo-img"
                  onClick={handleLogoClick}
                />
              </div>
            </div>

            {!isLoginPage && (
              <div className="header-right">
                <Button
                  icon={faCartShopping}
                  text={`View Cart (${selected.length})`}
                  btnType={"secondary"}
                  onClick={selected.length !== 0 ? handleNavigate : null}
                  disabled={selected.length === 0}
                />
              </div>
            )}

            {isLoginPage && (
              <div className="header-right">
                <Button
                  icon={faRightToBracket}
                  text={`Create Brief`}
                  btnType={"secondary"}
                  onClick={handleNavigate}
                />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
