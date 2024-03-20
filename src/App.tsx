import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LOCAL_AUTH } from "./constant/Constant";
import { useAuthContext } from "./context/AuthContext";
import { useUserContext } from "./context/UserContext";
import { UserResponse } from "./model/UserResponse";
import AllUserPage from "./pages/AllUser";
import Header from "./pages/Header";
import LandmarkPage from "./pages/Landmark";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { AuthService } from "./service/AuthService";
import { LoadingScreen } from "./util/LoadingScreen";

function App() {
  const { auth, setAuth } = useAuthContext();
  const { user, setUser } = useUserContext();
  const authService = new AuthService();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_AUTH)) {
      authService
        .getUserByToken(localStorage.getItem(LOCAL_AUTH)!)
        .then((res) => {
          if (res.response) {
            if (Object.keys(res).length !== 0) {
              const user: UserResponse = {
                uid: res.user.uid,
                username: res.user.username,
                country: res.user.country,
                avatar: res.user.avatar,
                role: res.user.role,
              };

              setUser(user);
              setAuth(true);
              setLoading(false);
            }
          }
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  return (
    <>
      {auth ? (
        user?.role === "admin" ? (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<LandmarkPage />} />
              <Route path="/alluser" element={<AllUserPage />} />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          </>
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<LandmarkPage />} />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          </>
        )
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
