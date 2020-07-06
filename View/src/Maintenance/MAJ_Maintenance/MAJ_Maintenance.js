import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishIcon from '@material-ui/icons/Publish';
import { IconButton } from '@material-ui/core';
import './MAJ_Maintenance.css';

class MAJMaintenance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            openDialog: true,
            CarnetDebordName: '',
            CarnetDebord: '',
        }
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onChangeInput = e => {
        switch (e.target.name) {
            // Updated this
            case 'selectedFile':
                if (e.target.files.length > 0) {
                    // Accessed .name from file 
                    this.setState({ CarnetDebordName: e.target.files[0].name });
                    this.setState({ CarnetDebord: e.target.files[0] });
                    //alert(this.state.CarnetDebord);
                    //alert(window.document.getElementById("FichierInput").value);
                    //this.readCarnetDeBord("C:\\Users\\darso\\Documents\\Projet\\armada-board\\lib\\files\\Carnet_de_bord.xlsx");
                }
                break;
        }
    };

    handleClickOpen = () => {
        this.setState({ openDialog: true });
    }

    handleMAJ = () => {
        this.setState({ openDialog: false });
        let formData = new FormData();
        let result = null;
        let newData = this.props.data; 
        formData.append("file", this.state.CarnetDebord);
        const xhr = new XMLHttpRequest();
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            //alert(JSON.parse(xhr.responseText))
            result = JSON.parse(xhr.responseText);
            for (let appointments of result) {
                for (let appointment of appointments.appointments){
                    newData.push(appointment)
                }
            }
            this.props.onChangeData(newData)
        });
        // open the request with the verb and the url
        xhr.open('POST', 'http://localhost:3001/api/maintenances/planning', true)
        // send the request
        xhr.send(formData);
        this.props.var();

    };

    render() {
        const CarnetDebordName = this.state.CarnetDebordName;
        let file = null;
        file = CarnetDebordName
            ? (<span>{CarnetDebordName}</span>)
            : (<span>Aucun fichier</span>);
        return (
            <div >
                <Dialog open={this.state.openDialog} onClose={this.handleClose}  >
                    <DialogTitle className="Dialog-Text">Mise à jour du calendrier de maintenance</DialogTitle>
                    <DialogContent>
                        <DialogContentText margin="normal">
                            Selectionnez le carnet de bord
                        </DialogContentText>
                        <div className="Grid-Dialog">
                            <div >
                                <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                    Carnet de bord
                                    <input id="FichierInput" name="selectedFile" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                                </Button>
                            </div>
                            <label className="label" htmlFor="file">{file}</label>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleMAJ} color="primary">
                            Mettre à jour
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default MAJMaintenance;