import React from 'react';
import {Component} from 'react'
import { MDBDataTableV5, MDBBtn, MDBIcon } from 'mdbreact';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { Typography, Grid } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default class TableFlotte extends Component {

  constructor(props){
    super(props);
    this.state = {
      open : false,
      id : "52",
      uop : "régionale",
      region : "1",
      matInt : "605",
      matExt : "1-605",
      marque : "Mercedes",
      modele : "Classe G-63 AMG",
      structure : "1",
      type : "1"
    }
  }

  render(){
    
    const handleClickOpen = (id, uop, region, matInt, matExt, marque, modele, structure, type) => {
      this.setState({
        open : true,
        id : id,
        uop : uop,
        region : region,
        matInt : matInt,
        matExt : matExt,
        marque : marque,
        modele : modele,
        structure : structure,
        type : type
      })
    };
  
    const handleClose = () => {
      this.setState({
        open : false
      })
    };
  
    const datatable ={
      columns : [
        {
          label: 'ID',
          field: 'id',
          width: 100,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },
        {
          label: 'Unité operationelle',
          field: 'uop',
          width: 150,
        },
        {
          label: 'Région',
          field: 'region',
          width: 200,
        },
        {
          label: 'Structure rattachement',
          field: 'structure',
          sort: 'asc',
          width: 200,
        },
        {
          label: 'Type véhicule',
          field: 'type',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Afficher',
          field: 'afficher',
          sort: 'disabled',
          width: 100,
        },
      ],
      rows : [
        {
            id : "1",
            uop : "régionale",
            region : "1",
            matInt : "605",
            matExt : "1-605",
            marque : "Mercedes",
            modele : "Classe G-63 AMG",
            structure : "UNI-001",
            type : "1",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "régionale", "1", "605" , "1-605", "Mercedes", "Classe G-63 AMG", "UNI-001", "1",
            )}>
            <AddIcon /> 
          </IconButton>,
        },
        {
            id : "2",
            uop : "régionale",
            region : "1",
            matInt : "605",
            matExt : "1-605",
            marque : "Mercedes",
            modele : "Classe G-63 AMG",
            structure : "1",
            type : "1",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "régionale", "1", "605" , "1-605", "Mercedes", "Classe G-63 AMG", "UNI-001", "1"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
            id : "3",
            uop : "régionale",
            region : "1",
            matInt : "605",
            matExt : "1-605",
            marque : "Mercedes",
            modele : "Classe G-63 AMG",
            structure : "1",
            type : "1",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "régionale", "1", "605" , "1-605", "Mercedes", "Classe G-63 AMG", "UNI-001", "1"
            )}>
            <AddIcon />
          </IconButton>,
        },
        {
          id : "4",
          uop : "régionale",
            region : "1",
            matInt : "605",
            matExt : "1-605",
            marque : "Mercedes",
            modele : "Classe G-63 AMG",
            structure : "1",
            type : "1",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "régionale", "1", "605" , "1-605", "Mercedes", "Classe G-63 AMG", "UNI-001", "1"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "5",
          uop : "régionale",
            region : "1",
            matInt : "605",
            matExt : "1-605",
            marque : "Mercedes",
            modele : "Classe G-63 AMG",
            structure : "1",
            type : "1",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "régionale", "1", "605" , "1-605", "Mercedes", "Classe G-63 AMG", "UNI-001", "1"
            )}>
            <AddIcon />
          </IconButton>,
        },
        {
          id : "6",
          uop : "régionale",
            region : "1",
            matInt : "605",
            matExt : "1-605",
            marque : "Mercedes",
            modele : "Classe G-63 AMG",
            structure : "1",
            type : "1",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "régionale", "1", "605" , "1-605", "Mercedes", "Classe G-63 AMG", "UNI-001", "1"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "7",
          uop : "régionale",
            region : "1",
            matInt : "605",
            matExt : "1-605",
            marque : "Mercedes",
            modele : "Classe G-63 AMG",
            structure : "1",
            type : "1",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "régionale", "1", "605" , "1-605", "Mercedes", "Classe G-63 AMG", "UNI-001", "1"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "8",
          uop : "régionale",
          region : "1",
          matInt : "605",
          matExt : "1-605",
          marque : "Mercedes",
          modele : "Classe G-63 AMG",
          structure : "1",
          type : "1",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "régionale", "1", "605" , "1-605", "Mercedes", "Classe G-63 AMG", "UNI-001", "1"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "9",
          uop : "régionale",
            region : "1",
            matInt : "605",
            matExt : "1-605",
            marque : "Mercedes",
            modele : "Classe G-63 AMG",
            structure : "1",
            type : "1",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "régionale", "1", "605" , "1-605", "Mercedes", "Classe G-63 AMG", "UNI-001", "1"
            )}>
              <AddIcon />
            </IconButton>,
        }
      ],
    }
    return (
      <div>
        <MDBDataTableV5
          hover
          entriesOptions={[5, 10, 15]}
          entries={5}
          pagesAmount={4}
          data={datatable}
        />
        <Dialog
          fullWidth={true}
          open={this.state.open}
          TransitionComponent={Transition} 
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Véhciule "}{this.state.id}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">Type : {this.state.type} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Structure de rattachement : {this.state.structure} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Marque : {this.state.marque}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Modèle : {this.state.modele} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Matricule interne : {this.state.matInt}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Matricule externe : {this.state.matExt} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Unité opérationnelle : {this.state.uop}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Région : {this.state.region} </Typography>
                  </Grid>
                </Grid>    
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
  
}