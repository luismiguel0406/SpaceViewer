import { Grid2 as Grid, Skeleton } from '@mui/material'
import React from 'react'

const Loading = () => {
    const numberOfSkeletons = [1,2,3,4,5,6,7,8,9,10,11,12];
  return (
    <>
    {numberOfSkeletons.map(()=>(
        <Grid size={{xs: 12, sm:6, md:4, lg:3}}>
            <Skeleton variant='rectangular' width={450} height={510} sx={{bgcolor:'white', borderRadius:1}}/>
        </Grid>
    ))}
    </>
  )
}

export default Loading