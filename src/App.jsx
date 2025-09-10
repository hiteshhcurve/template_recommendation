import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import GlobalContext from "./context/GlobalContext";
import Header from "./components/Header";
import Showcase from "./components/Showcase";
import Loader from "./components/Loader";
import LoginPage from "./pages/LoginPage";
import Error from "./components/Error";
import "./App.scss";

const App = () => {
  const { loading, error } = useContext(GlobalContext);

  return (
    <div className="app">
      <Header />

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
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
