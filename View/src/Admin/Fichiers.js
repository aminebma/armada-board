import React, { Component } from 'react';
import { TextField, Button, Drawer, Paper, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios';

const styles = theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        marginTop: 100, marginLeft: 100
    },
})

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#2196f3'
        }
    }
});

class Fichiers extends Component {

    constructor(props){
        super(props)
        this.state = {
            jrxmlFile: '',
            jasperFile: ''
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onJRXMLChangeInput = this.onJRXMLChangeInput.bind(this);
        this.onJASPERChangeInput = this.onJASPERChangeInput.bind(this);
    }

    handleReportUpload() {
        const formData = new FormData()
        formData.append('nom', document.getElementById('nom').value)
        formData.append('categorie', document.getElementById('categorie').value)
        formData.append('report', this.state.jrxmlFile)
        formData.append('report', this.state.jasperFile)
        axios.post('http://localhost:3001/api/reports/', formData)
            .then(res => {
                alert("Rapport ajouté avec succès !");
            })
            .catch((error) => {
                alert("Une erreur s'est produite");
            })
    }

    onChangeInput = e => {
        switch (e.target.name) {
            // Updated this
            case 'selectedFile':
                if (e.target.files.length > 0) {
                    // Accessed .name from file 
                    //this.setState({ fileName: e.target.files[0].name });
                    //this.setState({ file: e.target.files[0] })
                }
                break;
        }
    };

    onJRXMLChangeInput = e => {
        switch (e.target.name) {
            // Updated this
            case 'selectedFile':
                if (e.target.files.length > 0) {
                    // Accessed .name from file 
                    this.setState({ jrxmlFile: e.target.files[0] });
                    console.log(this.state)
                }
                break;
        }
    };

    onJASPERChangeInput = e => {
        switch (e.target.name) {
            // Updated this
            case 'selectedFile':
                if (e.target.files.length > 0) {
                    // Accessed .name from file 
                    this.setState({ jasperFile: e.target.files[0] });
                }
                break;
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="secondary">Ajout de fichiers.</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                Fiche technique
                                <input id="FicheTechnique" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                Carnet de bord
                                <input id="CarnetDeBord" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                Guide constructeur
                                <input id="GuideConstructeur" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                Fiche de Controle des coûts
                                <input id="ControleCouts" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider style={{ paddingTop: 100, background: 'white' }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="secondary">Ajout de rapports.</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="nom" label="Nom" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="categorie" label="Catégorie" />
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                JrXml
                                <input id="JRXML" name="selectedFile" onChange={(event) => this.onJRXMLChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                Jasper
                                <input id="JASPER" name="selectedFile" onChange={(event) => this.onJASPERChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="secondary" onClick={this.handleReportUpload}>Ajouter</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Fichiers);