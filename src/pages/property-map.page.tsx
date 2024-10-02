import React from 'react';
import { Box, Grid } from '@mui/material';

const PropertyMapPage = () => {
  return (
    <Grid display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={'24px'}>
      <Grid display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'} gap={'16px'}></Grid>
      <Box>
        <>map</>
      </Box>
    </Grid>
  );
};

export default PropertyMapPage;
