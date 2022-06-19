import "./App.css";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import LoadingPage from "./Loading";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return <Comments />;
};

export default App;
