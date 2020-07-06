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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default class TableMaint extends Component {

  constructor(props){
    super(props);
    this.state = {
      open : false
    }
  }

  render(){
    
    const handleClickOpen = (id) => {
      this.setState({
        open : true
      })
      console.log(id)
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
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen("123")}>
            <AddIcon /> 
          </IconButton>,
        },
        {
          id : "52",
          effectuee : "Effectuée",
          dateAttrinution : "22/07/2020",
          dateRealisation : "25/07/2020",
          niveau :"2",
          afficher : 
            <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen("123")}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "123",
          effectuee : "en attente",
          dateAttrinution : "25/07/2020",
          dateRealisation : "NONE",
          niveau :"2",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen("123")}>
            <AddIcon />
          </IconButton>,
        },
        {
          id : "52",
          effectuee : "Effectuée",
          dateAttrinution : "22/07/2020",
          dateRealisation : "25/07/2020",
          niveau :"2",
          afficher : 
            <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen("123")}>
              <AddIcon />
            </IconButton>,
        },
        {
          id : "123",
          effectuee : "en attente",
          dateAttrinution : "25/07/2020",
          dateRealisation : "NONE",
          niveau :"2",
          afficher : 
          <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen("123")}>
            <AddIcon />
          </IconButton>,
        },
        {
          id : "52",
          effectuee : "Effectuée",
          dateAttrinution : "22/07/2020",
          dateRealisation : "25/07/2020",
          niveau :"2",
          afficher : 
            <IconButton aria-label="plus" size="small" onClick={() => handleClickOpen("123")}>
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
          open={this.state.open}
          TransitionComponent={Transition} 
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Maintenance MIN524-021"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                le détails de chaque maintenance à insérer ici.
                Ce sera plus simple de le faire une fois les objets récupéré du bac afin d'utiliser les states
                et pour formater plus rapidement "datatable" (lignes) et le contenu du DIALOG.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                OUCHAR
              </Button>
              <Button onClick={handleClose} color="primary">
                CHIKOUR
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
  
}