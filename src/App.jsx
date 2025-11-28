import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useRouteLoader from "./hooks/useRouteLoader";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Showcase from "./components/Showcase";
import CreateBrief from "./pages/CreateBrief";
import "./App.scss";
import Selected from "./components/Selected";

const App = () => {
  useRouteLoader();

  const { pathname } = useLocation();

  const isLoginPage =
    pathname.includes("/create-brief/") ||
    pathname.includes("/selected") ||
    pathname.includes("/error") ||
    pathname.includes("/success");

  return (
    <div className="app">
      <Header />
      {!isLoginPage && <Navigation />}

      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Showcase />} />
            <Route path="/:query" element={<Showcase />} />

            <Route path="/search/:query" element={<Showcase />} />

            <Route path="/filter/:filters" element={<Showcase />} />

            <Route path="/selected/:data" element={<Selected />} />

            <Route path="/create-brief/:data" element={<CreateBrief />} />
          </Routes>
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default App;
