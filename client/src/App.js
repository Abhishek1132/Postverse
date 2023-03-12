import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication";
import Authpage from "./pages/Authpage";
import Discoverpage from "./pages/Discoverpage";
import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/auth" element={<Authpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/discover" element={<Discoverpage />} />
      </Routes>
    </div>
  );
}

export default App;
