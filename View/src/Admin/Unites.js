import React, { Component } from 'react';
import { TextField , Button, Drawer, Paper, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

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

class Unites extends Component{

    state = {
        classe: '',
        affiliation : '',
        region : ''
    }

    handleAddUnite = () => {
        const body = {
            nom: document.getElementById('nom').value,
            classe: this.state.classe,
            affiliation: this.state.affiliation,
            region: this.state.region,
          }
          axios.post('http://localhost:3001/api/admin/unites', body)
            .then(res => {
                alert("Unité ajoutée avec succès !");
            })
            .catch((error) => {
              alert("Une erreur s'est produite");
            })
    }

    handleClasseChange = event => {
        this.setState({
            classe: event.target.value
        })
    }

    handleAffiliationChange = event => {
        this.setState({
            affiliation: event.target.value
        })
    }

    handleRegionChange = event => {
        this.setState({
            region: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
            <Paper className={classes.paper}>
            <Grid container spacing={2}>
                
                    <Grid item xs={12}>
                        <Typography variant="h6" color="secondary">Gestion des unités.</Typography> 
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="nom" label="Nom de l'unité" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="classe"
                            select
                            label="Classe"
                            helperText="Choisissez la classe de l'unité"
                            color="secondary"
                            onChange={this.handleClasseChange}
                        >
                            <MenuItem key={"1"} value={"Opérationelle"}>
                                {"Opérationelle"}
                            </MenuItem>
                            <MenuItem key={"2"} value={"Régionale"}>
                                {"Régionale"}
                            </MenuItem>
                            <MenuItem key={"3"} value={"Centrale"}>
                                {"Centrale"}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="affiliation"
                            select
                            label="Affiliation"
                            helperText="Choisissez une affiliation"
                            color="secondary"
                            onChange={this.handleAffiliationChange}
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
                    <Grid item xs={3}>
                        <TextField
                            id="region"
                            select
                            label="Région"
                            helperText="Choisissez une région"
                            color="secondary"
                            onChange={this.handleRegionChange}
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
                            <MenuItem key={"6"} value={"6"}>
                                {"6"}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={this.handleAddUnite}>Ajouter</Button>
                    </Grid>
            </Grid>
            </Paper>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Unites);