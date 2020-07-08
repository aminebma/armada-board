import React, { Component } from 'react';
import { TextField , Button, Drawer, Paper, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';


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

class Utilisateurs extends Component{
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="secondary">Ajout d'utilisateur.</Typography> 
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="Nom utilisateur" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="mot de passe" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Niveau"
                                    helperText="Choisissez un niveau"
                                    color="secondary"
                                >
                                    <MenuItem key={"1"} value={"Admin"}>
                                        {"Admin"}
                                    </MenuItem>
                                    <MenuItem key={"2"} value={"Opérationel"}>
                                        {"Opérationel"}
                                    </MenuItem>
                                    <MenuItem key={"3"} value={"Régional"}>
                                        {"Régional"}
                                    </MenuItem>
                                    <MenuItem key={"4"} value={"Central"}>
                                        {"Central"}
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="Nom" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="Prénom" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="Date de naissance" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="Adresse postale" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="Adresse mail" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="Numéro de téléphone" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Unité"
                                    helperText="Choisissez une unité"
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
                    <Divider style={{paddingTop : 100, background : 'white'}}/>
                    <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="secondary">Modifier mot de passe.</Typography> 
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="Nom d'utilisateur" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="standard-basic" label="Mot de passe" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="secondary">Modifier</Button>
                            </Grid>
                    </Grid>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Utilisateurs);