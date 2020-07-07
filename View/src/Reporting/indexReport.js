import React from "react";
import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import axios from 'axios';
import download from 'downloadjs';
import moment from 'moment';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';


const styles = theme => ({
    root: {
        paddingTop : 25,
        width: "100%",
        maxWidth: 360,
        background: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4
    },
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
});

class KpiList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            titre: 'Catégorie',
            soustitre: 'Indicateur',
            datedebut: '20/05/2019',
            datefin: '',
            fichier: false,
            kpis: {
                category: []
            },
            report: ""
        };
    }

    componentWillMount(){
        this.getItems()
    };

    getItems(){
        axios.get(`http://localhost:3001/api/reports/`)
            .then(res => {
                this.setState({ kpis: res.data });
            });
    }

    handleClick = e => {
        this.setState({ [e]: !this.state[e] });
    };
    handleClickKpi = (category, subCategory) =>{
        this.setState((state, props) => ({
            titre : category,
            soustitre : subCategory
          }));
        console.log(this.state)
    };
    handleDateDebutChange = (date) => {
        this.setState((state, props) => ({
            datedebut : date
          }));
      };
    handleDateFinChange = (date) => {
    this.setState((state, props) => ({
        datefin : date
        }));
    };

    handleGenrateReport = () =>{
        const body = {
            name: this.state.soustitre,
            data: {
                date_debut: this.state.datedebut,
                date_fin: this.state.datefin
            }
        }
        axios.post('http://localhost:3001/api/reports/report',body,{ responseType: "blob"})
            .then(res => {
                //this.setState({report: res.data});
                const file = new Blob(
                    [res.data],
                    {type: 'application/pdf'});
                const fileUrl = URL.createObjectURL(file)
                console.log(fileUrl)
                this.setState({report: fileUrl});
                this.setState((state, props) => ({
                    fichier : true
                }));
            })
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <div>
                        {this.state.kpis.category.map(category => {
                            return (
                                <List
                                    className={classes.root}
                                    key={category.id}
                                    subheader={
                                        <ListSubheader>{category.name}</ListSubheader>
                                    }
                                >
                                    <div key={category.id}>
                                        {category.subCategory != null ? (
                                            <div key={category.id}>
                                                <ListItem
                                                    button
                                                    key={category.id}
                                                    onClick={this.handleClick.bind(
                                                        this,
                                                        category.name
                                                    )}
                                                >
                                                    <ListItemText
                                                        primary={category.name}
                                                    />
                                                    {this.state[category.name] ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    )}
                                                </ListItem>
                                                <Collapse
                                                    key={category.id}
                                                    component="li"
                                                    in={this.state[category.name]}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <List disablePadding>
                                                        {category.subCategory.map(
                                                            subCategory => {
                                                                return (
                                                                    <ListItem
                                                                        button
                                                                        key={
                                                                            subCategory.id
                                                                        }
                                                                        className={
                                                                            classes.nested
                                                                        }
                                                                        onClick={() => this.handleClickKpi(category.name, subCategory.name)}
                                                                    >
                                                                        <ListItemText
                                                                            key={
                                                                                subCategory.id
                                                                            }
                                                                            primary={
                                                                                subCategory.name
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                );
                                                            }
                                                        )}
                                                    </List>
                                                </Collapse>{" "}
                                            </div>
                                        ) : (
                                            <ListItem
                                                button
                                                onClick={this.handleClick.bind(
                                                    this,
                                                    category.name
                                                )}
                                                key={category.id}
                                            >
                                                <ListItemText
                                                    primary={category.name}
                                                />
                                            </ListItem>
                                        )}
                                    </div>
                                    <Divider key={category.id} absolute />
                                </List>
                            );
                        })}
                    </div>
                </Grid>
                <Grid item xs={9} style={{paddingTop : 35,}}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    className={classes.typoPadding}
                                >
                                    {this.state.titre}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    className={classes.typoPadding}
                                >
                                    {this.state.soustitre}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <Grid container >
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="YYYY-MM-DD"
                                            defaultValue="2020-01-01"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date début"
                                            value={this.state.datedebut}
                                            onChange={this.handleDateDebutChange}
                                            KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <Grid container >
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="YYYY-MM-DD"
                                            defaultValue="2020-01-01"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date fin"
                                            value={this.state.datefin}
                                            onChange={this.handleDateFinChange}
                                            KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" color="primary" onClick={this.handleGenrateReport}>
                                    Générer
                                </Button>
                            </Grid>
                        </Grid>
                        <br/> <br/>
                        <Grid item>
                            {this.state.fichier != false ?(
                                <div>
                                    <Button variant="contained" color="primary">
                                        <a style={{color: "#FFFFFF"}} href= {`${this.state.report}`} download= {`${this.state.titre}-${this.state.soustitre}-${moment(this.state.datedebut).format('DD-MM-YYYY')}_${moment(this.state.datefin).format('DD-MM-YYYY')}.pdf`}> Exporter le rapport </a>
                                    </Button>
                                    <br/> <br/>
                                    <iframe title={`${this.state.titre}-${this.state.soustitre}`} style={{width: 720, height: 1080, position: "relative", left:"10%", right:"10%"}} src={this.state.report} />
                                </div>
                            ) : (
                                <div>Aucun rapport à afficher.</div>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

KpiList.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(KpiList);
