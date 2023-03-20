import { useColorMode } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Authpage from "./pages/Authpage";
import Discoverpage from "./pages/Discoverpage";
import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";

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
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/discover" element={<Discoverpage />} />
      </Routes>
    </div>
  );
}

export default App;
