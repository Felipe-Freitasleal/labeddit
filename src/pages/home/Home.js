import { Box, Button, Container, Divider, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "95vh",
        // overflow: "hidden",
        // overflowY: "scroll",
      }}
    >
      <Grid height="210px">
        <TextField
          id="postInput"
          label="Escreva seu post..."
          multiline
          rows={3}
          fullWidth
          sx={{
            backgroundColor: "#EDEDED",
            fontFamily: "IBM Plex Sans",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "23px",
          }}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{
            my: 1,
            fontFamily: "IBM Plex Sans",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "23px",
            borderRadius: "12px",
            background: "linear-gradient(90deg, #FF6489 0%, #F9B24E 100%), #4088CB",
          }}
        >
          Postar
        </Button>
        <Divider
          sx={{
            background: "linear-gradient(90deg, #FF6489 0%, #F9B24E 100%), #4088CB",
            height: "1px",
            border: "none",
            marginTop: "16px",
          }}
        />
      </Grid>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          height: "95%",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
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
      {isLoading && (
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={"80vw"} height={"16vh"} />
          <Skeleton variant="rounded" width={"80vw"} height={"16vh"} />
          <Skeleton variant="rounded" width={"80vw"} height={"16vh"} />
          <Skeleton variant="rounded" width={"80vw"} height={"16vh"} />
        </Stack>
      )}
      <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center", mt: 5 }}>
        <Divider
          sx={{
            background: "Black",
            height: "4px",
            border: "none",
            borderRadius: "10px",
            width: "100px",
          }}
        />
      </Grid>
    </Container>
  );
};

export default Home;
