import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileDefault from "../assets/profileDefault.png";
import CustomTextField from "../components/CustomTextField";
import { AuthService } from "../service/AuthService";
import { LandmarkService } from "../service/LandmarkService";

function RegisterPage() {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const confirmPasswordRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [textFieldError, setTextFieldError] = useState("");
  const [country, setCountry] = useState(0);
  const [countries, setCountries] = useState<any>([]);
  const authService = new AuthService();
  const landmarkService = new LandmarkService();

  useEffect(() => {
    setLoading(true);
    landmarkService
      .getCountry()
      .then((res) => {
        console.log(res);

        if (res.response) {
          setCountries(res.countries);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const coun = countries[country];
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPw = confirmPasswordRef.current?.value;

    if (coun && username && password && confirmPw) {
      if (usernameValid && passwordValid) {
        setLoading(true);
        authService
          .register({
            username: username,
            password: password,
            country: coun,
            avatar: avatarFile,
          })
          .then((res) => {
            if (res.response) {
              navigate("/login", {
                replace: true,
                state: { openSnackbar: true },
              });
            } else {
              setTextFieldError(res.error);
            }
            setLoading(false);
          });
      }
    } else {
      setTextFieldError("Please Enter All Textfield");
    }
  };

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setAvatarFile(event.target.files[0]);
    }
  }

  function isValidUsername(inputStr: string) {
    const pattern: RegExp = /^[a-zA-Z0-9_]+$/;
    if (!pattern.test(inputStr) && inputStr !== "") {
      setUsernameError("Username a-z A-Z 0-9 _");
      setUsernameValid(false);
    } else {
      setUsernameError("");
      setUsernameValid(true);
    }
    setTextFieldError("");
  }

  const isValidPassword = () => {
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setPasswordError("Password not match");
      setPasswordValid(false);
    } else {
      setPasswordError("");
      setPasswordValid(true);
    }
    setTextFieldError("");
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
                  Sign Up
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        borderRadius: "50%",
                        aspectRatio: "1/1",
                      }}
                      image={
                        avatarFile
                          ? URL.createObjectURL(avatarFile)
                          : profileDefault
                      }
                    />
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="avatar-upload"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="avatar-upload">
                      <Button
                        disabled={loading}
                        variant="contained"
                        size="small"
                        sx={{
                          fontSize: "1.2rem",
                          borderRadius: "10rem",
                          backgroundColor: "rgb(240, 165, 70)",
                          boxShadow: 0,
                          ":hover": {
                            backgroundColor: "rgb(200, 120, 20)",
                            boxShadow: 0,
                          },
                        }}
                        component="span"
                        fullWidth
                      >
                        <Typography color={"white"} variant="body1">
                          UPLOAD
                        </Typography>
                      </Button>
                    </label>
                  </Box>
                  <Box
                    sx={{
                      flex: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <CustomTextField
                      disabled={loading}
                      fullWidth
                      inputRef={usernameRef}
                      label="Username"
                      FormHelperTextProps={{ sx: { color: "red" } }}
                      helperText={usernameError}
                      onChange={(e: any) => {
                        isValidUsername(e.target.value);
                      }}
                    />
                    {countries.length > 0 && (
                      <Select
                        size="medium"
                        value={country}
                        onChange={(e) => {
                          setCountry(+e.target.value);
                        }}
                        fullWidth
                        sx={{
                          color:"rgb(200, 120, 20)",
                          '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(200, 120, 20)',
                            borderRadius: "10rem",
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(200, 120, 20)',
                            color:"rgb(200, 120, 20)",
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(200, 120, 20)',
                            color:"rgb(200, 120, 20)",
                          },
                        }}
                      >
                        {countries.map((coun: any, index: number) => (
                          <MenuItem key={index} value={index}>
                            {coun}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Box>
                </Box>
                <CustomTextField
                  disabled={loading}
                  inputRef={passwordRef}
                  label="Password"
                  type="password"
                  onChange={isValidPassword}
                />
                <CustomTextField
                  disabled={loading}
                  inputRef={confirmPasswordRef}
                  label="Confirm Password"
                  type="password"
                  FormHelperTextProps={{ sx: { color: "red" } }}
                  helperText={passwordError}
                  onChange={isValidPassword}
                />
                {textFieldError && (
                  <Typography color={"red"} variant="body1">
                    *{textFieldError}
                  </Typography>
                )}
              </Box>
              <Divider className="bounce-in" sx={{ m: 1 }} />
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
                  disabled={loading}
                  variant="contained"
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
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
                <Button
                  disabled={loading}
                  variant="outlined"
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
                    navigate(-1);
                    setTextFieldError("");
                  }}
                >
                  Back
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default RegisterPage;
