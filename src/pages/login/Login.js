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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${baseURL}/users/login`, body);
      if (response.status !== 200) throw new Error("Não autorizado");
      localStorage.setItem("Labeddit-token", response.data.token);
    } catch (error) {
      console.log(error);
    }
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
          <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
            Continuar
          </Button>
          <Grid container>
            <Button type="button" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
              Criar uma conta!
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
