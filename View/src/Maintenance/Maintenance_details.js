import React, { Component } from 'react';
import './Maintenance.css'
import { Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BuildIcon from '@material-ui/icons/Build';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import GradeIcon from '@material-ui/icons/Grade';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 330,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 332,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    MaintenanceHeader: {
        width: 320,
        height: 52,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        backgroundColor: '#174a84',
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.21,
        letterSpacing: 1.25,
        textAlign: 'center',
        color: '#FFFFFF',
        padding: 15,
    }

}));

export default function Maintenance_Details() {
    const classes = useStyles();

    return (
        <Grid className="Maintenance-details">
            <List className={classes.root} subheader={<li />}>
                {[1, 2, 3, 4].map((sectionId) => (
                    <li key={`section-${sectionId}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader className={classes.MaintenanceHeader}>{`Maintenance${sectionId}`}</ListSubheader>
                            <ListItem key={`item-${sectionId}`}>
                                <ListItemIcon>
                                    <DriveEtaIcon />
                                </ListItemIcon>
                                <ListItemText primary="Véhicule" />
                            </ListItem>
                            <ListItem key={`item-${sectionId}`}>
                                <ListItemIcon>
                                    <LocalOfferIcon />
                                </ListItemIcon>
                                <ListItemText primary="Modèle" />
                            </ListItem>
                            <ListItem key={`item-${sectionId}`}>
                                <ListItemIcon>
                                    <BuildIcon />
                                </ListItemIcon>
                                <ListItemText primary="Maintenance" />
                            </ListItem>
                            <ListItem key={`item-${sectionId}`}>
                                <ListItemIcon>
                                    <VerifiedUserIcon />
                                </ListItemIcon>
                                <ListItemText primary="Niveau maintenance" />
                            </ListItem>
                            <ListItem key={`item-${sectionId}`}>
                                <ListItemIcon>
                                    <GradeIcon />
                                </ListItemIcon>
                                <ListItemText primary="échelon maintenance" />
                            </ListItem>
                            <ListItem key={`item-${sectionId}`}>
                                <ListItemIcon>
                                    <BusinessCenterIcon />
                                </ListItemIcon>
                                <ListItemText primary="Besoin requis" />
                            </ListItem>
                        </ul>
                    </li>
                ))}
            </List>
        </Grid>
    );
}