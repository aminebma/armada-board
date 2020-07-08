import React, { Component } from 'react';
import { TextField , Button, Drawer, Paper, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
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

class Vehicules extends Component{

    state={
        affectation: '',
        sexe: ''
    }

    handleAddVehicule = () => {
        const body = {
            affectation: this.state.affectation,
            type: document.getElementById('type').value,
            marque: document.getElementById('marque').value,
            modele: document.getElementById('modele').value,
            matricule_interne: document.getElementById('matricule_interne').value,
            matricule_externe: document.getElementById('matricule_externe').value,
          }
          axios.post('http://localhost:3001/api/vehicules/', body)
            .then(res => {
                alert("Véhicule ajouté avec succès !");
            })
            .catch((error) => {
              alert("Une erreur s'est produite.");
            })
    }

    handleAddDriver = () => {
        const body = {
            affectation: this.state.affectation,
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            dateNaiss: document.getElementById('datenaiss').value,
            adresseResidence: document.getElementById('adresse').value,
            numTel: document.getElementById('numtel').value,
            mail: document.getElementById('mail').value,
            sexe: this.state.sexe
          }
          axios.post('http://localhost:3001/api/admin/chauffeurs', body)
            .then(res => {
                alert("Chauffeur ajouté avec succès !");
            })
            .catch((error) => {
              alert("Chauffeur existant");
            })
    }

    handleAffectationChange = event => {
        this.setState({
            affectation: event.target.value
        })
    }

    handleSexeChange = event => {
        this.setState({
            sexe: event.target.value
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="secondary">Ajout de véhicule.</Typography> 
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="type" label="Type" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="marque" label="Marque" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="modele" label="Modèle" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="matricule_interne" label="Matricule interne" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="matricule_externe" label="Matricule externe" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="unite"
                                select
                                label="Unité"
                                helperText="Choisissez une unité"
                                color="secondary"
                                onChange={this.handleAffectationChange}
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
                            <Button variant="contained" color="secondary" onClick={this.handleAddVehicule}>Ajouter</Button>
                        </Grid>
                    </Grid>
                    <Divider style={{paddingTop : 100, background : 'white'}}/>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="secondary">Ajout de chauffeurs.</Typography> 
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="nom" label="Nom" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="prenom" label="Prénom" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="datenaiss" label="Date de naissance" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="sexe"
                                select
                                label="Sexe"
                                helperText="Choisissez une unité"
                                color="secondary"
                                onChange={this.handleSexeChange}
                            >
                                <MenuItem key={"1"} value={"H"}>
                                    {"Homme"}
                                </MenuItem>
                                <MenuItem key={"2"} value={"F"}>
                                    {"Femme"}
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="adresse" label="Adresse postale" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="mail" label="Adresse mail" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="numtel" label="Numéro de téléphone" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="unite"
                                select
                                label="Unité"
                                helperText="Choisissez une unité"
                                color="secondary"
                                onChange={this.handleAffectationChange}
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
                            <Button variant="contained" color="secondary" onClick={this.handleAddDriver}>Ajouter</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Vehicules);