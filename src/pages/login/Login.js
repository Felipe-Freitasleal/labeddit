import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utilits/baseURL";
import { useNavigate } from "react-router-dom";
import { Alert, Backdrop, CircularProgress, Collapse, IconButton } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [messageError, setMessageError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    const body = {
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(`${baseURL}/users/login`, body);
      if (response.status !== 200) throw new Error("Não autorizado");
      localStorage.setItem("Labeddit-token", response.data.token);
      if (response.status === 200) goToHome(navigate);
    } catch (error) {
      console.log(error);
      setMessageError(error.response.data);
      setOpenAlert(true);
    } finally {
      setIsLoading(false);
    }
  }

  function goToHome(navigate) {
    navigate("/");
  }

  function handleSignup(navigate) {
    navigate("/signup");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ width: "100%" }}>
            <Collapse in={openAlert}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenAlert(false);
                    }}
                  >
                    X
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {messageError}
              </Alert>
            </Collapse>
          </Box>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              fontFamily: "IBM Plex Sans",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "23px",
              borderRadius: "12px",
              background: "linear-gradient(90deg, #FF6489 0%, #F9B24E 100%), #4088CB",
            }}
            onClick={handleSubmit}
          >
            Continuar
          </Button>
          <Grid container>
            <Button type="button" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }} onClick={handleSignup}>
              Criar uma conta!
            </Button>
          </Grid>
        </Box>
      </Box>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress sx={{ color: "#FF6489" }} />
      </Backdrop>
    </Container>
  );
};

export default Login;
