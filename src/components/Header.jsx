"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetFilters } from "@/features/filters/filterSlice";
import { setPage } from "@/features/ui/uiSlice";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoClick = (e) => {
    e.preventDefault();

    dispatch(resetFilters());
    dispatch(setPage(1));
    router.push(`/`);
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
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
