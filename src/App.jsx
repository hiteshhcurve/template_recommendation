import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import GlobalContext from "./context/GlobalContext";
import Header from "./components/Header";
import Showcase from "./components/Showcase";
import Loader from "./components/Loader";
import LoginPage from "./pages/LoginPage";
import Error from "./components/Error";
import ProtectedRoute from "./components/ProtectedRoute";
// import Preview from "./pages/Preview";
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
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Showcase />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/search/:query"
                element={
                  <ProtectedRoute>
                    <Showcase />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/filter/:filters"
                element={
                  <ProtectedRoute>
                    <Showcase />
                  </ProtectedRoute>
                }
              />

              {/* <Route
                path="/preview/:previewUrl"
                element={
                  <ProtectedRoute>
                    <Preview />
                  </ProtectedRoute>
                }
              /> */}

              <Route path="/login" element={<LoginPage />} />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
