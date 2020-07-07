import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MomentUtils from '@date-io/moment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles } from '@material-ui/core/styles';
import './Export_Planning.css'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";


class ExportPlanning extends Component {
    state = {
        openDialog: true,
        selectedDateD: new Date(),
        selectedDateF: new Date(),
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
    }

    handleClickOpen = () => {
        this.setState({ openDialog: true });
    }

    handleClose = () => {
        this.setState({ openDialog: false });
        this.props.var();
    };

    handleExport = () => {
        console.log('Hey')
        const body = {
            affectation:1,
            date_debut: this.state.selectedDateD,
            date_fin: this.state.selectedDateF,
            niveau: []
        }
        if(this.state.checked1) body.niveau.push(1)
        if(this.state.checked2) body.niveau.push(2)
        if(this.state.checked3) body.niveau.push(3)
        if(this.state.checked4) body.niveau.push(4)
        if(this.state.checked5) body.niveau.push(5)
        axios.post('http://localhost:3001/api/maintenances/planning/export',body,{ responseType: "blob"})
            .then(res => {
                const file = new Blob(
                    [res.data],
                    {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                const fileUrl = URL.createObjectURL(file)
                console.log('Done')
                window.open(fileUrl)
            })
    }

    handleDateDChange = (date) => {
        this.setState({ selectedDateD: date })
    };

    handleDateFChange = (date) => {
        this.setState( { selectedDateF: date })
    };

    handleChangeChecked1 = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };

    handleChangeChecked2 = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };
    handleChangeChecked3 = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };
    handleChangeChecked4 = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };
    handleChangeChecked5 = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };

    render() {
        const selectedDateDebut = this.state.selectedDateD;
        const selectedDateFin = this.state.selectedDateF;
        return (
            <div>
                <Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Exportation planning</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Durée du planning voulue
                                </DialogContentText>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Grid container justify="space-around">
                                <div className="Date">
                                    <KeyboardDatePicker
                                        disableToolBar
                                        margin="10px"
                                        id="date-début"
                                        label="Date début"
                                        format="YYYY-MM-DD"
                                        defaultValue="2020-01-01"
                                        value={this.state.selectedDateD}
                                        onChange={this.handleDateDChange}
                                        KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                    />
                                </div >
                                <div className="Date">
                                    <KeyboardDatePicker
                                        disableToolBar
                                        margin="10px"
                                        id="date-début"
                                        label="Date fin"
                                        format="YYYY-MM-DD"
                                        defaultValue="2020-01-01"
                                        value={this.state.selectedDateF}
                                        onChange={this.handleDateFChange}
                                        KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                    />
                                </div>
                            </Grid>
                            <DialogContentText>
                                Niveau de maintenance voulu
                                </DialogContentText>
                                <div className="Niveau">
                            <Grid>
                                <FormControlLabel
                                    control={
                                        <Checkbox color="Primary" checked={this.state.checked1} onChange={this.handleChangeChecked1} name="checked1" />
                                    }
                                    label="1" />
                                <FormControlLabel
                                    control={
                                        <Checkbox color="Primary" checked={this.state.checked2} onChange={this.handleChangeChecked2} name="checked2" />
                                    }
                                    label="2" />
                                <FormControlLabel
                                    control={
                                        <Checkbox color="Primary" checked={this.state.checked3} onChange={this.handleChangeChecked3} name="checked3" />
                                    }
                                    label="3" />
                                <FormControlLabel
                                    control={
                                        <Checkbox color="Primary" checked={this.state.checked4} onChange={this.handleChangeChecked4} name="checked4" />
                                    }
                                    label="4" />
                                <FormControlLabel
                                    control={
                                        <Checkbox color="Primary" checked={this.state.checked5} onChange={this.handleChangeChecked5} name="checked5" />
                                    }
                                    label="5" />
                            </Grid>
                            </div>
                        </MuiPickersUtilsProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleExport} color="primary">
                            Exporter au format xlxs
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default ExportPlanning;