import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../context/GlobalContext";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoginPage = pathname === "/login";

  const {
    setSearchQuery,
    setSelectedClients,
    setSelectedCategories,
    setSelectedTags,
    setFiltersEnabled,
  } = useContext(GlobalContext);

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (!isLoginPage) {
      setSearchQuery("");
      setSelectedClients([]);
      setSelectedCategories([]);
      setSelectedTags([]);
      setFiltersEnabled(false);
      navigate("/");
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
                  icon={faRightToBracket}
                  text={"Campaign Brief"}
                  btnType={"secondary"}
                  onClick={() => navigate("/login")}
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
