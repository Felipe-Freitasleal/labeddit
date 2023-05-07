import { Box, Button, CircularProgress, Fade, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { baseURL } from "../../utilits/baseURL";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const getToken = localStorage.getItem("Labeddit-token");
    const token = getToken;

    try {
      setIsLoading(true);

      const header = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const response = await axios.get(`${baseURL}/posts`, header);
      console.log(response.data);
      if (response.status !== 200) throw new Error("Error");
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Box padding={"28px"}>
      <Box sx={{ height: 40, justifyContent: "center" }}>
        <Fade in={isLoading} unmountOnExit>
          <CircularProgress />
        </Fade>
      </Box>
      <Grid>
        <TextField
          fullWidth
          margin="normal"
          id="new-post"
          label="Escreva seu post..."
          name="new-post"
          autoComplete="new-post"
          sx={{
            backgroundColor: "#EDEDED",
            // borderRadius: "12px",
            h: "131px",
          }}
        />
        <Button type="button" fullWidth variant="contained" sx={{ mb: 3 }}>
          Postar
        </Button>
      </Grid>
      {posts?.map((post) => (
        <Grid
          key={post.id}
          sx={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            my: "8px",
            p: "9px 10px",
            gap: "18px",
            w: "364px",
            h: "167px",
            backgroundColor: "#FBFBFB",
            border: "1px solid #E0E0E0",
            borderRadius: "12px",
            flex: "none",
            order: 0,
            flexGrow: 0,
          }}
        >
          <Typography
            sx={{
              h: "16px",
              fontFamily: "IBM Plex Sans",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "16px",
              textAlign: "center",
              color: "#6F6F6F",
              flex: "none",
              order: 0,
              flexGrow: 0,
            }}
          >
            Enviado por: {post.creator.name}
          </Typography>
          <Typography
            sx={{
              w: "335px",
              fontFamily: "IBM Plex Sans",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "23px",
              color: "#000000",
              flex: "none",
              order: 1,
              flexGrow: 0,
            }}
          >
            {post.content}
          </Typography>
        </Grid>
      ))}
    </Box>
  );
};

export default Home;
