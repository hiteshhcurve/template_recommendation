import Search from "./Search";

const Header = ({ setTemplates }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">Template Finder</h1>
          </div>

          <Search setTemplates={setTemplates} />
        </div>
      </div>
    </header>
  );
};

export default Header;
