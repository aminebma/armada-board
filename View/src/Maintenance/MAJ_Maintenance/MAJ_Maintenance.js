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

    state = {
        openDialog: true,
        FicheTechniqueName: '',
        CarnetDebordName: '',
        FicheSuivisName: '',
        GuideConstructeurName: '',
    }

    onChangeInput = e => {
        switch (e.target.name) {
            // Updated this
            case 'selectedFile1':
                if (e.target.files.length > 0) {
                    // Accessed .name from file 
                    this.setState({ FicheTechniqueName: e.target.files[0].name });
                }
                break;
            case 'selectedFile2':
                if (e.target.files.length > 0) {
                    // Accessed .name from file 
                    this.setState({ CarnetDebordName: e.target.files[0].name });
                }
                break;
            case 'selectedFile3':
                if (e.target.files.length > 0) {
                    // Accessed .name from file 
                    this.setState({ FicheSuivisName: e.target.files[0].name });
                }
                break;
            case 'selectedFile4':
                if (e.target.files.length > 0) {
                    // Accessed .name from file 
                    this.setState({ GuideConstructeurName: e.target.files[0].name });
                }
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    };

    handleClickOpen = () => {
        this.setState({ openDialog: true });
    }

    handleClose = () => {
        this.setState({ openDialog: false });
        this.props.var();
    };

    render() {
        const FicheTechniqueName = this.state.FicheTechniqueName;
        const CarnetDebordName = this.state.CarnetDebordName;
        const FicheSuivisName = this.state.FicheSuivisName;
        const GuideConstructeurName = this.state.GuideConstructeurName;
        let file1 = null;
        let file2 = null;
        let file3 = null;
        let file4 = null;
        file1 = FicheTechniqueName
            ? (<span>{FicheTechniqueName}</span>)
            : (<span>Aucun fichier</span>);
        file2 = CarnetDebordName
            ? (<span>{CarnetDebordName}</span>)
            : (<span>Aucun fichier</span>);
        file3 = FicheSuivisName
            ? (<span>{FicheSuivisName}</span>)
            : (<span>Aucun fichier</span>);
        file4 = GuideConstructeurName
            ? (<span>{GuideConstructeurName}</span>)
            : (<span>Aucun fichier</span>);

        return (
            <div >
                <Dialog open={this.state.openDialog} onClose={this.handleClose}  >
                    <DialogTitle className="Dialog-Text">Mise à jour du calendrier de maintenance</DialogTitle>
                    <DialogContent>
                    <DialogContentText margin="normal">
                            Selectionner les fichiers
                        </DialogContentText>
                        <div className="Grid-Dialog">
                            <div >
                                <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                    Fiche technique
                                    <input name="selectedFile1" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                                </Button>
                                <label className="label" htmlFor="file">{file1}</label>
                            </div>
                            <div>
                                <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                    Carnet de bord
                                    <input name="selectedFile2" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                                </Button>
                                <label className="label" htmlFor="file">{file2}</label>
                            </div>
                            <div>
                                <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                    Fiche de suivis
                                    <input name="selectedFile3" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                                </Button>
                                <label className="label" htmlFor="file3">{file3}</label>
                            </div>
                            <div>
                                <Button startIcon={<PublishIcon />} className="button-Upload" variant="contained" component="label" >
                                    Guide constructeur
                                    <input name="selectedFile4" onChange={(event) => this.onChangeInput(event)} type="file" style={{ display: "none" }} />
                                </Button>
                                <label className="label" htmlFor="file">{file4}</label>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Mettre à jour
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default MAJMaintenance;