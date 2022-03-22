import { useState } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import TransitionGroup from "./components/TransitionGroup";
import AuthGuard from "./guards/AuthGuard";
import Home from './pages/Home'
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <AuthGuard>
      <TransitionGroup>
        {(actualPath) => (
          <Routes location={actualPath}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        )}
      </TransitionGroup>
    </AuthGuard>
  );
}

export default App;
