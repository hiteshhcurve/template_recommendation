import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../features/filters/filterSlice";
import {
  faCircleCheck,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { selected } = useSelector((state) => state.templates);
  const { params } = useSelector((state) => state.filters);

  const isLoginPage = pathname.includes("/selected");

  const handleLogoClick = (e) => {
    e.preventDefault();

    const query = {
      params,
    };

    const encodedQuery = btoa(JSON.stringify(query));

    dispatch(resetFilters());
    navigate(`/${encodedQuery}`);
  };

  const handleNavigate = () => {
    if (pathname.includes("/selected/")) {
      const query = {
        params,
        templates: selected?.map((s) => s.preset_id),
      };

      const encodedQuery = btoa(JSON.stringify(query));
      navigate(`/create-brief/${encodedQuery}`);
    } else {
      const query = {
        params,
        templates: selected?.map((s) => s.id),
      };

      const encodedQuery = btoa(JSON.stringify(query));
      navigate(`/selected/${encodedQuery}`);
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

            {selected?.length > 0 && !isLoginPage && (
              <div className="header-right">
                <Button
                  icon={faCircleCheck}
                  text={`Selected (${selected.length})`}
                  btnType={"secondary"}
                  onClick={handleNavigate}
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
