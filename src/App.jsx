import { Fragment, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  Typography,
  Grid2 as Grid,
  Button,
} from "@mui/material";
import { getData } from "./services/api";
import ImageCard from "./components/ImageCard";
import AddIcon from "@mui/icons-material/Add";
import RemoveItemDialog from "./components/RemoveItemDialog";
import Loading from "./components/Loading";

function App() {
  const IMAGES_PER_LOAD = 12;
  const START_INDEX = 0;
  const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
  const SPACE_COLOR =
    "linear-gradient(to bottom, #000033, #191970, #483D8B, #6A5ACD, #87CEEB, #ADD8E6)";

  const [state, setState] = useState({
    nasaImages: [],
    endIndex: IMAGES_PER_LOAD,
    isLoading: false,
    openRemoveItem: false,
    currentItem: null,
    imagesToShow: [],
  });

  useEffect(() => {
    //Fetch de datos
    setState((prevState) => ({ ...prevState, isLoading: true }));

    const fetchImages = async (url) => {
      const data = await getData(url);
      const { photos } = data;
      setState((prevState) => ({ ...prevState, nasaImages: photos }));
    };

    const timeout = setTimeout(() => {
      fetchImages(
        `/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`
      );

      return () => {
        clearTimeout(timeout);
      };
    }, 3000);
  }, [API_KEY]);

  useEffect(() => {
    if (state.nasaImages?.length === 0) return;
    const images = state.nasaImages?.slice(START_INDEX, state.endIndex);
    setState((prevState) => ({
      ...prevState,
      imagesToShow: images,
      isLoading: false,
    }));
  }, [state.endIndex, state.nasaImages]);

  const handleCloseRemoveItem = () => {
    setState((prevState) => ({ ...prevState, openRemoveItem: false }));
  };

  const handleOpenRemoveItem = (item) => {
    setState((prevState) => ({
      ...prevState,
      openRemoveItem: true,
      currentItem: item,
    }));
  };

  const handleMoreImages = () => {
    setState((prevState) => ({
      ...prevState,
      endIndex: state.endIndex + IMAGES_PER_LOAD,
    }));
  };

  const handleRemove = () => {
    const imagesFiltered = state.imagesToShow.filter(
      (item) => item.id !== state.currentItem?.id
    );
    setState((prevState) => ({
      ...prevState,
      imagesToShow: imagesFiltered,
      openRemoveItem: false,
    }));
  };

  return (
    <Fragment>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{ backgroundImage: SPACE_COLOR, minHeight: "100%" }}
      >
        <Typography variant="h1" color="white">
          Nasa Viewer
        </Typography>

        <Grid container spacing={2} paddingTop={5}>
          {state.isLoading ? (
            <Loading />
          ) : (
            state.imagesToShow?.map((item, idx) => {
              return (
                <ImageCard
                  key={item.id}
                  item={item}
                  index={idx}
                  handleOpenRemoveItem={handleOpenRemoveItem}
                />
              );
            })
          )}
        </Grid>
        <Grid
          container
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            sx={{ bgcolor: "#000033", color: "white" }}
            onClick={handleMoreImages}
          >
            More Images
          </Button>
        </Grid>
      </Container>
      <RemoveItemDialog
        open={state.openRemoveItem}
        handleClose={handleCloseRemoveItem}
        handleRemove={handleRemove}
        content={state?.currentItem?.camera?.full_name}
      />
    </Fragment>
  );
}

export default App;
