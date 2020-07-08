import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Drawer, Paper, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

 
const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
}))

const containerStyle = {
  width: '920px',
  height: '400px'
};
 
const center = {
  lat: -3.745,
  lng: -38.523
};
 
function SimpleMap() {
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const classes = useStyles();
 
  return (
    <Grid container spacing={2} style={{paddingTop : 40}}>
        <Grid item xs={9}>
            <Paper className={classes.paper}>
                <LoadScript
                    googleMapsApiKey="AIzaSyC8uooJvBbe5IjZop2cRJYOw6eFBoBkc1M"
                >
                    <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <></>
                    </GoogleMap>
                </LoadScript>
            </Paper>
        </Grid>
    </Grid>
  )
}
 
export default React.memo(SimpleMap)