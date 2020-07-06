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



import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { PDFReader } from 'reactjs-pdf-reader';
import { MobilePDFReader } from 'reactjs-pdf-reader';


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
    state = {
        titre : 'Catégorie',
        soustitre : 'Indicateur',
        datedebut : '20/05/2019',
        datefin : '',
        fichier : false,
        kpis : ''
    };
    componentDidMount(){
        var json
        axios.get(`http://localhost:3001/api/reports/`)
              .then(res => {
                json = res.data;
                this.setState({ category : {json} });
            })
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
        this.setState((state, props) => ({
            fichier : true
        }));
    }
    render() {
        const items = this.state.category;
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <div>
                        {items.category.map(category => {
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
                                            defaultValue="2020/07/05"
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
                                            defaultValue="2020/07/05"
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
                                <PDFReader  url="https://pdfhost.io/v/ac1oAk8aE_Microsoft_Word_Ide_ELWASSSILdocx.pdf" renderType="canvas"/>
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
