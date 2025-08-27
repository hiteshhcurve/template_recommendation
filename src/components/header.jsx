import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import Search from "./Search";

const Header = ({ setTemplates, setLoading }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">Template Finder</h1>
          </div>

          <Search setTemplates={setTemplates} setLoading={setLoading} />

          <div className="header-right">
            <button className="filter-btn">
              <FontAwesomeIcon icon={faFilter} />
              Filters
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
