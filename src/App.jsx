import { useState, useEffect } from "react";
import Header from "./components/header";
import Showcase from "./components/showcase";
import Loader from "./components/Loader";
import "./App.scss";

const App = () => {
  const [templates, setTemplates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTemplates();
    fetchClientInfo();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/template_rec",
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();

      setTemplates(json.data);
      setLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  const fetchClientInfo = async () => {
    try {
      const res = await fetch(
        "https://selfserve.hockeycurve.com/selfservev2_staging/client_info",
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Client info loaded");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="app">
      <Header setTemplates={setTemplates} setLoading={setLoading} />

      <main className="main-content">
        <div className="container">
          {loading ? (
            <Loader size="lg" color="#f97316" />
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <Showcase data={templates} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
