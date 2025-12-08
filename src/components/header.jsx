import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFilters } from "../features/filters/filterSlice";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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

            {!isLoginPage && (
              <div className="header-right">
                <Button
                  icon={faRightToBracket}
                  text={"Campaign Brief"}
                  btnType={"secondary"}
                  onClick={() =>
                    navigate(`/create-brief/${pathname.split("/")[2] || ""}`)
                  }
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
