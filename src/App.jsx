import { Fragment, useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Grid2 as Grid, Card, CardHeader, CardMedia, CardContent, Stack} from '@mui/material';
import { getData } from './services/api';

function App() {

const [ nasaImages, setNasaImages ] = useState();

    useEffect(()=>{

       const fetchImages = async ()=>{
        const data = await getData();
        const {photos} = data;
        console.log(photos);
        setNasaImages(photos);
       }

      fetchImages()
    },[])

  const ImageCard = ({item})=>{

    return(
      <Grid size={{xs: 12, sm:6, md:4, lg:3}}>
        <Card>
          <CardHeader
            title={`${item?.camera?.full_name} (${item?.camera.name})`}
            subheader={item?.earth_date}
          />
          <CardMedia
            component="img"
            image={item?.img_src}
            alt={`${item?.full_name} (${item?.camera.name})`}
          />
          <CardContent>         
            <Stack direction="row">
              <Typography>Rover name:</Typography> 
              <Typography>{item?.rover?.name}</Typography> 
            </Stack>
            <Stack direction="row">
              <Typography>Launch date:</Typography> 
              <Typography>{item?.rover?.launch_date}</Typography>
            </Stack>
            <Stack direction="row">
                <Typography>Landing date:</Typography>
                <Typography>{item?.rover?.landing_date}</Typography>
            </Stack>         
          </CardContent>    
        </Card>
      </Grid>
    )
  }

  return (
    <Fragment>
      <CssBaseline/>
      <Container maxWidth={false}>
        <Typography variant='h1'>Nasa Viewer</Typography>

        <Grid container spacing={2}>
        {nasaImages?.map((item)=>{
          return <ImageCard key={item.id} item={item}/>
        })}
        </Grid>
      </Container>
    </Fragment>
  )
}

export default App
