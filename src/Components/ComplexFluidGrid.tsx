import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const ComplexFluidGrid = () => {
  return (
    <Box sx={{ flexGrow: 1, borderRadius: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <div className="grid-elements">Hello guys</div>
        </Grid>
        <Grid item xs={6} md={4}>
          <div className="grid-elements">How are you</div>
        </Grid>
        <Grid item xs={6} md={4}>
          <div className="grid-elements">lauda</div>
        </Grid>
        <Grid item xs={6} md={8}>
          <div className="grid-elements">lassan</div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplexFluidGrid;
