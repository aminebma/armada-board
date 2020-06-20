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

    handleDateChange = (date) => {
        this.setState({ selectedDate: date })
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
                                        margin="10px"
                                        id="date-début"
                                        label="Date début"
                                        format="dd/MM/yyyy"
                                        value={selectedDateDebut}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                    />
                                </div >
                                <div className="Date">
                                    <KeyboardDatePicker
                                        margin="10px"
                                        id="date-début"
                                        label="Date fin"
                                        format="dd/MM/yyyy"
                                        value={selectedDateFin}
                                        onChange={this.handleDateChange}
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
                        <Button onClick={this.handleClose} color="primary">
                            Exporter au format xlxs
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default ExportPlanning;