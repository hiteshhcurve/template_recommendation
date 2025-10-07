import { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GlobalContext from "./context/GlobalContext";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Showcase from "./components/Showcase";
import Loader from "./components/Loader";
import LoginPage from "./pages/LoginPage";
import Error from "./components/Error";
import CreateBrief from "./pages/CreateBrief";
import "./App.scss";

const App = () => {
  const { loading, error } = useContext(GlobalContext);

  const { pathname } = useLocation();

  const isLoginPage = pathname === "/create-brief";

  return (
    <div className="app">
      <Header />
      {!isLoginPage && <Navigation />}

      <main className="main-content">
        <div className="container">
          {loading ? (
            <Loader size="lg" color="#f97316" />
          ) : error ? (
            <Error msg={error} />
          ) : (
            <Routes>
              <Route path="/" element={<Showcase />} />

              <Route path="/search/:query" element={<Showcase />} />

              <Route path="/filter/:filters" element={<Showcase />} />

              <Route path="/create-brief" element={<CreateBrief />} />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
