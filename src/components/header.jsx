import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../context/GlobalContext";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoginPage = pathname === "/create-brief";

  const {
    setSearchQuery,
    setSelectedClients,
    setSelectedIndustryTags1,
    setSelectedIndustryTags2,
    setSelectedIndustryTags3,
    setFiltersEnabled,
    setError,
    setMessage,
  } = useContext(GlobalContext);

  const handleLogoClick = (e) => {
    e.preventDefault();

    setSearchQuery("");
    setSelectedClients([]);
    setSelectedIndustryTags1([]);
    setSelectedIndustryTags2([]);
    setSelectedIndustryTags3([]);
    setFiltersEnabled(false);
    setError("");
    setMessage("");
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

            {!isLoginPage && (
              <div className="header-right">
                <Button
                  icon={faRightToBracket}
                  text={"Campaign Brief"}
                  btnType={"secondary"}
                  onClick={() => navigate("/create-brief")}
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
