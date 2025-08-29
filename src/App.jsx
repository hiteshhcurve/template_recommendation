import { useContext } from "react";
import GlobalContext from "./context/GlobalContext";

import Header from "./components/header";
import Showcase from "./components/showcase";
import Loader from "./components/Loader";
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
            <h1>{error}</h1>
          ) : (
            <Showcase />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
