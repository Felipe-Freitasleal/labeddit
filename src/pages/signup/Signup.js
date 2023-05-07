import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Backdrop, CircularProgress, FormControlLabel } from "@mui/material";
import { useState } from "react";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    setIsLoading(true);
    console.log("Nada não!");
    setIsLoading(false);
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
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Apelido"
            name="surname"
            autoComplete="surname"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          />
          <Grid container>
            <Grid item>
              <Typography>
                Ao continuar, você concorda com o nosso Contrato de usuário e nossa Política de Privacidade
              </Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                item
                control={<Checkbox value="termos" color="primary" />}
                label="Eu concordo em receber emails sobre coisas legais no Labeddit"
              />
            </Grid>
            <Grid item>
              <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                Continuar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress sx={{ color: "#FF6489" }} />
      </Backdrop>
    </Container>
  );
};

export default Signup;
