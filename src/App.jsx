import { Fragment, useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Grid2 as Grid, Button, Box} from '@mui/material';
import { getData } from './services/api';
import ImageCard from './components/ImageCard';
import AddIcon  from '@mui/icons-material/Add'

function App() {

const IMAGES_PER_LOAD = 12;
const START_INDEX = 0;
const API_KEY  = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY"
const SPACE_COLOR = "linear-gradient(to bottom, #000033, #191970, #483D8B, #6A5ACD, #87CEEB, #ADD8E6)"
const [ nasaImages, setNasaImages ] = useState([]);
const [ endIndex, setEndIndex ] = useState(IMAGES_PER_LOAD);


    useEffect(()=>{

       const fetchImages = async (url)=>{
        const data = await getData(url);
        const {photos} = data;
        setNasaImages(photos);
       }

      fetchImages(`/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
    },[API_KEY]) 

  const handleMoreImages =()=>{
    setEndIndex((prevState)=>( prevState  + IMAGES_PER_LOAD ))
  }

  const imagesToShow = nasaImages?.slice(START_INDEX, endIndex);

  return (
    <Fragment>
      <CssBaseline/>
      <Container maxWidth={false} sx={{backgroundImage: SPACE_COLOR, height:"100%"}} >
        <Typography variant='h1' color='white'>Nasa Viewer</Typography>

        <Grid container spacing={2} paddingTop={5}>
        {imagesToShow?.map((item, idx)=>{
          return <ImageCard key={item.id} item={item} index={idx}/>
        })}
        </Grid>
        <Grid  container direction="row" sx={{alignItems:"center", justifyContent:"center", padding:"25px"}} >
          <Button 
            variant='contained' 
            size='large' 
            startIcon={<AddIcon/>} 
            color={SPACE_COLOR}
            onClick={handleMoreImages}>
              More Images
          </Button>
        </Grid>
      </Container>
    </Fragment>
  )
}

export default App;
