import { useEffect } from "react";
import "./App.css";
import Login from "./components/login";

const App = () => {
  // useEffect(() => {
  //   window.initCC(22);
  // }, []);
  return (
    <div>
      <Login />
    </div>
  );
};

export default App;
