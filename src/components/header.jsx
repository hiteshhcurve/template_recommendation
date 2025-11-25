import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../features/filters/filterSlice";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { preagency, preclient } = useSelector((state) => state.filters.params);
  const isLoginPage = pathname === "/create-brief";

  const handleLogoClick = (e) => {
    e.preventDefault();

    dispatch(resetFilters());
    navigate("/");
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

            {!isLoginPage && preagency && preclient && (
              <div className="header-right">
                <Button
                  icon={faRightToBracket}
                  text={"Campaign Brief"}
                  btnType={"secondary"}
                  onClick={() => {
                    let encode = btoa(
                      JSON.stringify({
                        preagency: preagency,
                        preclient: preclient,
                      })
                    );
                    navigate(`/create-brief/${encode}`);
                  }}
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
