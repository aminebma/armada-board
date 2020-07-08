import React, { Component } from 'react';
import { TextField , Button, Drawer, Paper, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const styles = theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        marginTop : 100, marginLeft : 100
      },
})

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#2196f3'
      }
    }
  });

class RefMaintenance extends Component{
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
            <Paper className={classes.paper}>
            <Grid container spacing={2}>
                
                    <Grid item xs={12}>
                        <Typography variant="h6" color="secondary">Gestion des référentiels de maintenace.</Typography> 
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="standard-basic" label="Type" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Niveau"
                            helperText="Choisissez un niveau"
                            color="secondary"
                        >
                            <MenuItem key={"1"} value={"1"}>
                                {"1"}
                            </MenuItem>
                            <MenuItem key={"2"} value={"2"}>
                                {"2"}
                            </MenuItem>
                            <MenuItem key={"3"} value={"3"}>
                                {"3"}
                            </MenuItem>
                            <MenuItem key={"4"} value={"4"}>
                                {"4"}
                            </MenuItem>
                            <MenuItem key={"5"} value={"5"}>
                                {"5"}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Echelon"
                            helperText="Choisissez un echelon"
                            color="secondary"
                        >
                            <MenuItem key={"1"} value={"1"}>
                                {"1"}
                            </MenuItem>
                            <MenuItem key={"2"} value={"2"}>
                                {"2"}
                            </MenuItem>
                            <MenuItem key={"3"} value={"3"}>
                                {"3"}
                            </MenuItem>
                            <MenuItem key={"4"} value={"4"}>
                                {"4"}
                            </MenuItem>
                            <MenuItem key={"5"} value={"5"}>
                                {"5"}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary">Ajouter</Button>
                    </Grid>
                
            </Grid>
            </Paper>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(RefMaintenance);