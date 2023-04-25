import { useColorMode } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Authpage from "./pages/Authpage";
import Discoverpage from "./pages/Discoverpage";
import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import Authenticate from "./components/auth/Authenticate";

import "./App.css";

function App() {
  const { colorMode } = useColorMode();
  return (
    <div
      className="App"
      style={{ backgroundColor: colorMode === "light" ? "whitesmoke" : "" }}
    >
      <Routes>
        <Route path="/" exact element={<Authentication />} />
        <Route path="/auth" element={<Authpage />} />
        <Route
          path="/home"
          element={
            <>
              <Authenticate />
              <Homepage />
            </>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <>
              <Authenticate />
              <Profilepage />
            </>
          }
        />
        <Route
          path="/discover"
          element={
            <>
              <Authenticate />
              <Discoverpage />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
