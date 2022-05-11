import { useEffect } from "react";
import "./App.css";
import Login from "./components/login";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";

const instance = createInstance({
  urlBase: "https://ug9id0nvch.execute-api.ap-southeast-2.amazonaws.com/",
  siteId: 22,
  // userId: "UID76903202", // optional, default value: `undefined`.
  trackerUrl:
    "https://ug9id0nvch.execute-api.ap-southeast-2.amazonaws.com/matomo.php", // optional, default value: `${urlBase}matomo.php`
  srcUrl:
    "https://github.com/abed-eb/PWA-Login-SignUp/blob/044a7c7cf489db6767049b9324fac5770d9424a1/src/cc-manual-1.3.js", // optional, default value: `${urlBase}matomo.js`
  // disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  // heartBeat: {
  //   // optional, enabled by default
  //   active: true, // optional, default value: true
  //   seconds: 10, // optional, default value: `15
  // },
  // linkTracking: false, // optional, default value: true
  // configurations: {
  //   // optional, default value: {}
  //   // any valid matomo configuration, all below are optional
  //   disableCookies: true,
  //   setSecureCookie: true,
  //   setRequestMethod: "POST",
  // },
});

const App = () => {
  // useEffect(() => {
  //   window.initCC(22);
  // }, []);
  return (
    <MatomoProvider value={instance}>
      <Login />
    </MatomoProvider>
  );
};

export default App;
