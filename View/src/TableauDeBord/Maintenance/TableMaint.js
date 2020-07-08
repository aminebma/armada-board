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
          id : "1",
          effectuee : "Effectuée",
          dateAttrinution : "30/06/2020",
          dateRealisation : "30/06/2020",
          niveau :"1",
          echelon : "1",
          vehicule : "Mercedes Classe G63 AMG",
          pane : "Vidange",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "1", "En attente", "30/06/2020", "30/06/2020" ,"1", "1", "Mercedes Classe G63 AMG", "Vidange"
            )}>
            <AddIcon /> 
          </IconButton>,
        },
        {
          id : "2",
          effectuee : "Effectuée",
          dateAttrinution : "01/07/2020",
          dateRealisation : "01/07/2020",
          niveau :"2",
          echelon : "3",
          vehicule : "Mercedes Classe G63 AMG",
          pane : "Courroie",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "2", "Effectuée", "01/07/2020", "01/07/2020" ,"2", "3", "Mercedes Classe G63 AMG", "Courroie"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "3",
          effectuee : "Effectuée",
          dateAttrinution : "01/07/2020",
          dateRealisation : "01/07/2020",
          niveau :"1",
          echelon : "2",
          vehicule : "Sonacom SNVI M230",
          pane : "Plaquettes de Freins",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "3", "Effectuée", "01/07/2020", "01/07/2020" ,"1", "2", "BMW R80 RT", "Pneus"
            )}>
            <AddIcon />
          </IconButton>,
        },
        {
          id : "4",
          effectuee : "En attente",
          dateAttrinution : "22/07/2020",
          dateRealisation : "A venir",
          niveau :"3",
          echelon : "4",
          vehicule : "Sonacom SNVI M120",
          pane : "Parallelisme",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "4", "En attente", "22/07/2020", "A venir" ,"3", "4", "Sonacom SNVI M120", "Parallelisme"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "5",
          effectuee : "En attente",
          dateAttrinution : "25/07/2020",
          dateRealisation : "A venir",
          niveau :"1",
          echelon : "1",
          vehicule : "BMW R80 RT",
          pane : "Liquide de Freins",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "5", "En attente", "25/07/2020", "A venir" ,"1", "1", "BMW R80 RT", "Liquide de Freins"
            )}>
            <AddIcon />
          </IconButton>,
        },
        {
          id : "6",
          effectuee : "En attente",
          dateAttrinution : "27/07/2020",
          dateRealisation : "A venir",
          niveau :"2",
          echelon : "3",
          vehicule : "Mercedes Classe G63 AMG",
          pane : "Vidange Boite à vitesses",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "6", "En attente", "27/07/2020", "A venir" ,"2", "3", "Mercedes Classe G63 AMG", "Vidange boite à vitesses"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "7",
          effectuee : "En attente",
          dateAttrinution : "30/07/2020",
          dateRealisation : "A venir",
          niveau :"2",
          echelon : "3",
          vehicule : "Sonacom SNVI M120",
          pane : "Vidange Boite à vitesses",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "7", "En attente", "30/07/2020", "A venir" ,"2", "3", "Sonacom SNVI M120", "Vidange boite à vitesses"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "8",
          effectuee : "En attente",
          dateAttrinution : "30/07/2020",
          dateRealisation : "A venir",
          niveau :"3",
          echelon : "3",
          vehicule : "Sonacom SNVI M230",
          pane : "Suspensions",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "8", "En attente", "30/07/2020", "A venir" ,"3", "3", "Sonacom SNVI M230", "Suspensions"
            )}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "9",
          effectuee : "En attente",
          dateAttrinution : "12/08/2020",
          dateRealisation : "A venir",
          niveau :"1",
          echelon : "1",
          vehicule : "BMW R80 RT",
          pane : "Divers",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen(
            "9", "En attente", "12/08/2020", "A venir" ,"1", "1", "BMW R80 RT", "Divers"
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