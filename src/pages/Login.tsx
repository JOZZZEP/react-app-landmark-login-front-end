import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTextField from "../components/CustomTextField";
import { LOCAL_AUTH } from "../constant/Constant";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";
import { UserResponse } from "../model/UserResponse";
import { AuthService } from "../service/AuthService";

function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();
  const { setUser } = useUserContext();
  const location = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState(
    location.state?.openSnackbar ?? false
  );

  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [textFieldError, setTextFieldError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const authService = new AuthService();

  useEffect(() => {
    clearTimeout(timer.current);
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickLogin = () => {
    setTextFieldError("");
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (username && password) {
      setLoading(true);
      Promise.race([
        authService.login({
          username: username,
          password: password,
        }),
        new Promise(() => {
          setTimeout(() => {}, 10000);
        }),
      ])
        .then((res: any) => {
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
              localStorage.setItem(LOCAL_AUTH, res.token);
            }
          } else {
            setTextFieldError(res.error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTextFieldError("Enter Username and Password");
    }
  };
  return (
    <>
      <Container maxWidth={"sm"} sx={{ height: "100%" }}>
        <Box
          pt={5}
          pb={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Card sx={{ p: 2, borderRadius: "1rem", position: "relative" }}>
            {loading && (
              <CircularProgress
                color="warning"
                size={50}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-25px",
                  marginLeft: "-25px",
                  zIndex: 999,
                }}
              />
            )}
            <Box p={1}>
              <img
                className="bounce-in"
                src={
                  "https://facts.net/wp-content/uploads/2022/02/famous-landmarks.jpg"
                }
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </Box>
            <CardContent>
              <Box
                className="bounce-in"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  p: 1,
                }}
              >
                <Typography color={"rgb(200, 120, 20)"} variant="h4">
                  Login
                </Typography>
                <CustomTextField
                  disabled={loading}
                  inputRef={usernameRef}
                  label="Username"
                />
                <CustomTextField
                  disabled={loading}
                  inputRef={passwordRef}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {textFieldError && (
                  <Typography color={"red"} variant="body1">
                    *{textFieldError}
                  </Typography>
                )}
              </Box>
              <Divider className="bounce-in" sx={{ m: 2 }} />
              <Box
                className="bounce-in"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  p: 1,
                }}
              >
                <Button
                  variant="contained"
                  disabled={loading}
                  fullWidth
                  size="large"
                  sx={{
                    fontSize: "1.3rem",
                    borderRadius: "10rem",
                    backgroundColor: "rgb(240, 165, 70)",
                    boxShadow: 0,
                    ":hover": {
                      backgroundColor: "rgb(200, 120, 20)",
                      boxShadow: 0,
                    },
                  }}
                  onClick={handleClickLogin}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  disabled={loading}
                  fullWidth
                  size="large"
                  sx={{
                    fontSize: "1rem",
                    borderRadius: "10rem",
                    color: "rgb(240, 165, 70)",
                    borderColor: "rgb(240, 165, 70)",
                    ":hover": {
                      backgroundColor: "rgb(200, 120, 20)",
                      color: "white",
                      borderColor: "rgb(200, 120, 20)",
                    },
                  }}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Register Success!
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginPage;
