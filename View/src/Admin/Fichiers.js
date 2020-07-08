import React, { Component } from 'react';
import { TextField , Button, Drawer, Paper, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import PublishIcon from '@material-ui/icons/Publish';


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

class Fichiers extends Component{
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
                                <input id="FichierInput" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                Carnet de bord
                                <input id="FichierInput" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                Guide constructeur
                                <input id="FichierInput" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                Controle coûts
                                <input id="FichierInput" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider style={{paddingTop : 100, background : 'white'}}/>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="secondary">Ajout de rapports.</Typography> 
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="standard-basic" label="Nom" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="standard-basic" label="Catégorie" />
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                JrXml
                                <input id="FichierInput" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                Jasper
                                <input id="FichierInput" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                            </Button>
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

export default withStyles(styles)(Fichiers);