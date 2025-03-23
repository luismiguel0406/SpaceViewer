import { Card, CardHeader, CardMedia, CardContent, Stack, Typography, Grid2 as Grid, Grow, IconButton} from "@mui/material";
import TrashIcon from "@mui/icons-material/Delete"

const ImageCard = ({item, index, load=true, handleOpenRemoveItem})=>{

    return(
      <Grid size={{xs: 12, sm:6, md:4, lg:3}} minHeight={200}>
        <Grow in={load}>
          <Card className="rovercard" >
            <CardHeader
              title={`${item?.camera?.full_name}`}
              subheader={item?.earth_date}
            />
            <CardMedia
              component="img"
              image={item?.img_src}
              alt={`${item?.full_name} (${item?.camera.name})`}
              sx={{objectFit:"cover", height:250}}          
            />
            <CardContent>         
              <Stack direction="row" spacing={1}>
                <Typography>Rover name:</Typography> 
                <Typography>{item?.rover?.name}</Typography> 
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography>Camera name:</Typography> 
                <Typography>{item?.camera?.name}</Typography> 
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography>Launch date:</Typography> 
                <Typography>{item?.rover?.launch_date}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                  <Typography>Landing date:</Typography>
                  <Typography>{item?.rover?.landing_date}</Typography>
              </Stack>     
              <Stack direction="row" sx={{alignItems:"center", justifyContent:"space-between"}}>
                  <IconButton onClick={()=>handleOpenRemoveItem(item)}>
                    <TrashIcon sx={{ color: "darkred" }} ></TrashIcon>
                  </IconButton>
                  <Typography>{index + 1}</Typography>
              </Stack>    
            </CardContent>    
          </Card>
        </Grow>
      </Grid>
    )
  }

  export default ImageCard;