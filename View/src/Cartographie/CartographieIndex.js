import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Drawer, Paper, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';


const mapStyles = {
};


class Cartographie extends Component{
    render() {
        return (
            <Grid conatiner spacing={2}>
                <Grid item xs={9}>
                    <Paper style={{
                        display: 'flex',
                        overflow: 'auto',
                        flexDirection: 'column',
                    }}>
                        <Map
                        google={this.props.google}
                        zoom={8}
                        style={mapStyles}
                        initialCenter={{ lat: 47.444, lng: -122.176}}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper>
                    </Paper>
                </Grid>
            </Grid>
    );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC8uooJvBbe5IjZop2cRJYOw6eFBoBkc1M'
})(Cartographie);