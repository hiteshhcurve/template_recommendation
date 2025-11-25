import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useRouteLoader from "./hooks/useRouteLoader";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Showcase from "./components/Showcase";
import Error from "./components/Error";
import Success from "./components/Success";
import CreateBrief from "./pages/CreateBrief";
import "./App.scss";

const App = () => {
  useRouteLoader();

  const { globalError, globalSuccess } = useSelector((state) => state.ui);
  const { pathname } = useLocation();

  const isLoginPage = pathname === "/create-brief";

  return (
    <div className="app">
      <Header />
      {!isLoginPage && <Navigation />}

      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Showcase />} />

            <Route path="/search/:query" element={<Showcase />} />

            <Route path="/filter/:filters" element={<Showcase />} />

            <Route path="/create-brief/:filters" element={<CreateBrief />} />

            <Route path="/error" element={<Error msg={globalError} />} />

            <Route path="/success" element={<Success msg={globalSuccess} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
