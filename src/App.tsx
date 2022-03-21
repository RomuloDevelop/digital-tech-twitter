import {
  Routes,
  Route,
} from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import Home from './pages/Home'
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <AuthGuard>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </AuthGuard>
  );
}

export default App;
