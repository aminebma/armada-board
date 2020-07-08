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

class Utilisateurs extends Component{

    state={
        type: '',
        affectation: '',
        sexe: ''
    }

    handleAddUser= () =>{
        const body = {
            type: this.state.type,
            affectation: this.state.affectation,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            dateNaiss: document.getElementById('dateNaiss').value,
            adresseResidence: document.getElementById('adresse').value,
            numTel: document.getElementById('numtel').value,
            mail: document.getElementById('mail').value,
            sexe: this.state.sexe
          }
          axios.post('http://localhost:3001/api/admin/users', body)
            .then(res => {
                alert("Utilisateur ajouté avec succès !");
            })
            .catch((error) => {
              alert("Utilisateur existant");
            })
    }

    handleResetPassword = () => {
        const body = {
            username: document.getElementById('rusername').value,
            password: document.getElementById('newpassword').value
          }
          axios.put('http://localhost:3001/api/admin/users/reset-password', body)
            .then(res => {
                alert("Mot de passe utilisateur modifié avec succès !");
            })
            .catch((error) => {
              alert("Une erreur s'est produite");
            })
    }

    handleTypeChange = event => {
        this.setState({
            type: event.target.value
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
                                <Typography variant="h6" color="secondary">Ajout d'utilisateur.</Typography> 
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="username" label="Nom utilisateur" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="password" label="mot de passe" type="password"/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="type"
                                    select
                                    label="Type"
                                    helperText="Choisissez un type"
                                    color="secondary"
                                    onChange={this.handleTypeChange}
                                >
                                    <MenuItem key={"1"} value={"0"}>
                                        {"Admin"}
                                    </MenuItem>
                                    <MenuItem key={"2"} value={"1"}>
                                        {"Opérationel"}
                                    </MenuItem>
                                    <MenuItem key={"3"} value={"2"}>
                                        {"Régional"}
                                    </MenuItem>
                                    <MenuItem key={"4"} value={"3"}>
                                        {"Central"}
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="nom" label="Nom" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="prenom" label="Prénom" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="dateNaiss" label="Date de naissance" />
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
                            <Grid item xs={4}>
                                <TextField
                                    id="sexe"
                                    select
                                    label="Sexe"
                                    helperText="Selectionnez le sexe"
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
                            <Grid item xs={12}>
                                <Button variant="contained" color="secondary" onClick={this.handleAddUser}>Ajouter</Button>
                            </Grid>
                    </Grid>
                    <Divider style={{paddingTop : 100, background : 'white'}}/>
                    <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="secondary">Modifier mot de passe.</Typography> 
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="rusername" label="Nom d'utilisateur" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="newpassword" label="Mot de passe" type="password"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="secondary" onClick={this.handleResetPassword}>Modifier</Button>
                            </Grid>
                    </Grid>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Utilisateurs);