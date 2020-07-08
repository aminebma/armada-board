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
import { Typography } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default class TableMaint extends Component {

  constructor(props){
    super(props);
    this.state = {
      open : false,
      id : "52",
      effectuee : "Effectuée",
      dateAttrinution : "22/07/2020",
      dateRealisation : "25/07/2020",
      niveau :"2",
      echelon : "2",
      vehicule : "mazda",
      pane : "Pane d'huile",
    }
  }

  render(){
    
    const handleClickOpen = (id, effectuee, date1, date2, niv, ech, vehi, pan) => {
      this.setState({
        open : true,
        id : id,
        effectuee : effectuee,
        dateAttrinution : date1,
        dateRealisation : date2,
        niveau :niv,
        echelon : ech,
        vehicule : vehi,
        pane : pan,
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
          label: 'Effectuée',
          field: 'effectuee',
          width: 150,
        },
        {
          label: 'Date Attribution',
          field: 'dateAttrinution',
          width: 200,
        },
        {
          label: 'Date Réalisation',
          field: 'dateRealisation',
          sort: 'asc',
          width: 200,
        },
        {
          label: 'Niveau',
          field: 'niveau',
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
          id : "123",
          effectuee : "en attente",
          dateAttrinution : "25/07/2020",
          dateRealisation : "NONE",
          niveau :"2",
          echelon : "2",
          vehicule : "mazda",
          pane : "Pane d'huile",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "123", "en attente", "25/07/2020", "NONE" ,"2", "2", "mazda", "Pane d'huile"
            )}>
            <AddIcon /> 
          </IconButton>,
        },
        {
          id : "52",
          effectuee : "Effectuée",
          dateAttrinution : "22/07/2020",
          dateRealisation : "25/07/2020",
          niveau :"2",
          echelon : "2",
          vehicule : "mazda",
          pane : "Pane d'huile",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "123", "Effectuée", "25/07/2020", "NONE" ,"2", "2", "mazda", "Pane d'huile"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "123",
          effectuee : "en attente",
          dateAttrinution : "25/07/2020",
          dateRealisation : "NONE",
          niveau :"2",
          echelon : "2",
          vehicule : "mazda",
          pane : "Pane d'huile",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "123", "en attente", "25/07/2020", "NONE" ,"2", "2", "mazda", "Pane d'huile"
            )}>
            <AddIcon />
          </IconButton>,
        },
        {
          id : "52",
          effectuee : "Effectuée",
          dateAttrinution : "22/07/2020",
          dateRealisation : "25/07/2020",
          niveau :"2",
          echelon : "2",
          vehicule : "mazda",
          pane : "Pane d'huile",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "123", "en attente", "25/07/2020", "NONE" ,"2", "2", "mazda", "Pane d'huile"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "123",
          effectuee : "en attente",
          dateAttrinution : "25/07/2020",
          dateRealisation : "NONE",
          niveau :"2",
          echelon : "2",
          vehicule : "mazda",
          pane : "Pane d'huile",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "123", "en attente", "25/07/2020", "NONE" ,"2", "2", "mazda", "Pane d'huile"
            )}>
            <AddIcon />
          </IconButton>,
        },
        {
          id : "52",
          effectuee : "Effectuée",
          dateAttrinution : "22/07/2020",
          dateRealisation : "25/07/2020",
          niveau :"2",
          echelon : "2",
          vehicule : "mazda",
          pane : "Pane d'huile",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "123", "en attente", "25/07/2020", "NONE" ,"2", "2", "mazda", "Pane d'huile"
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
            <DialogTitle id="alert-dialog-slide-title">{"Maintenance "}{this.state.id}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">Type : {this.state.pane} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Véhicule : {this.state.vehicule} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Niveau : {this.state.niveau}</Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1">Statut : {this.state.effectuee} </Typography>
                <Typography variant="body1">Date d'attribution : {this.state.dateAttrinution}     Date de réalisation : {this.state.dateRealisation}</Typography>
                     Echelon : {this.state.echelon}
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