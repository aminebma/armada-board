/*
ce fichier sert à modifier certains composants du calendrier <scheduler> présent dans le fichier Planning.js 
pour les adapter au maintenances

Lien de la documentation :
https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/

*/
import React, { Component } from 'react';
import {
    AppointmentTooltip,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import classNames from 'clsx';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BuildIcon from '@material-ui/icons/Build';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import GradeIcon from '@material-ui/icons/Grade';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

// Ressources pour l'édition d'un planning, elle sont présente dans la fêntre latéral lors de l'ajout/édition d'une maintenance
// les instances et les codes couleurs sont obligatoire, du moins je n'ai pas pu faire sans
// plus d'information sur  https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/resources/
const RessourceFormulaire = [{
    fieldName: 'niveau',
    title: 'niveau',
    instances: [
        { id: '1', text: '1', color: '#e8eaf6' },
        { id: '2', text: '2', color: '#852010' },
        { id: '3', text: '3', color: '#961258' },
        { id: '4', text: '4', color: '#961274' },
        { id: '5', text: '5', color: '#964578' },
    ],
}];

//Style des maintenances dans le calendrier, et des popups

const styles = ({ palette }: Theme) => createStyles({
    appointment: {
        borderRadius: 0,
        borderBottom: 0,
    },
    highPriorityAppointment: {
        borderLeft: `4px solid ${'#e8eaf6'}`,
    },
    mediumPriorityAppointment: {
        borderLeft: `4px solid ${'#e8eaf6'}`,
    },
    lowPriorityAppointment: {
        borderLeft: `4px solid ${'#e8eaf6'}`,
    },
    weekEndCell: {
        backgroundColor: fade(palette.action.disabledBackground, 0.04),
        '&:hover': {
            backgroundColor: fade(palette.action.disabledBackground, 0.04),
        },
        '&:focus': {
            backgroundColor: fade(palette.action.disabledBackground, 0.04),
        },
    },
    weekEndDayScaleCell: {
        backgroundColor: fade(palette.action.disabledBackground, 0.06),
    },
    text: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: '16px',
        marginBottom: '4px',
    },
    content: {
        opacity: 1,
        fontSize: '12px',
    },
    container: {
        width: '100%',
        lineHeight: 1.2,
        height: '100%',
    },
});

const styleToolTip = ({ palette }) => createStyles({
    icon: {
        color: palette.action.active,
    },
    textCenter: {
        textAlign: 'center',
    },
    firstRoom: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
    },
    secondRoom: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
    },
    thirdRoom: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
    },
    header: {
        height: '260px',
        backgroundSize: 'cover',
    },
    commandButton: {
        backgroundColor: 'rgba(255,255,255,0.65)',
    },
});

// création des types et rattachement avec un type par défaut et un modèle de style
// les types par défaut sont ceux du calendrier du package
// Les propriétés des composants seront enrichis pour s'adapter au modèle de maintenance

type AppointmentProps = Appointments.AppointmentProps & WithStyles<typeof styles>;
type AppointmentContentProps = Appointments.AppointmentContentProps & WithStyles<typeof styles>;
type AppointmentTooltipHeaderProps = AppointmentTooltip.HeaderProps & WithStyles<typeof styleToolTip>;
type AppointmentTooltipContentProps = AppointmentTooltip.ContentProps & WithStyles<typeof styleToolTip>;

//Header du PopUp lorsqu'on clique sur une maintenance dans le planning
// il n'a pas été modifié car il contient les informations par défaut d'un "appointment" qui sont title,starDate, endDate
// tout en utilisant les styles définis plus haut
const PopHeader = withStyles(styleToolTip, { name: 'Header' })(({
    children, appointmentData, ...restProps
}: AppointmentTooltipHeaderProps) => (
        <AppointmentTooltip.Header
            {...restProps}
            appointmentData={appointmentData}
        >
        </AppointmentTooltip.Header>
    ));

// Contenu du PopUp lorsqu'on clique sur une maintenance dans le planning
// il affiche le contenu de la maintenance en question avec des balises jsx standart ( icones+ texte)
// tout en utilisant les styles définis plus haut
const PopContent = withStyles(styleToolTip, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
}: AppointmentTooltipContentProps) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                <Grid item xs={2} className={classes.textCenter}>
                    <DriveEtaIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>Matrice du véhicule : {appointmentData?.vehicule}</span>
                </Grid>
                <Grid item xs={2} className={classes.textCenter}>
                    <LocalOfferIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>affiliation : {appointmentData?.affectation}</span>
                </Grid>
                <Grid item xs={2} className={classes.textCenter}>
                    <BuildIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>Niveau : {appointmentData?.niveau[0]}</span>
                </Grid>
                <Grid item xs={2} className={classes.textCenter}>
                    <GradeIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>échelon : {appointmentData?.echelon[0]}</span>
                </Grid>
                <Grid item xs={2} className={classes.textCenter}>
                    <BusinessCenterIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>Besoin : {appointmentData?.besoin.contenu.intitule._text+', quantité : '+appointmentData?.besoin.contenu.quantite._text}</span>
                </Grid>

            </Grid >
        </AppointmentTooltip.Content >
    ));

// Le composant qui affiche une maintenance
// il y'a le background et les bordure
// c'est l'ossature d'une maintenance dans le calendrier
const UneMaintenance = withStyles(styles)(({
    data, ...restProps
}: AppointmentProps) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...styles,
                //backgroundColor: '#174a84',
                borderRadius: '8px',
            }}
            data={data}
        >
        </Appointments.Appointment>

    ));

// le contenu d'une maintenance dans le calendrier
// par soucis d'affichage, on affiche seulement le title de la maintenance en question
const MaintenanceContent = withStyles(styles, { name: 'AppointmentContent' })(({
    classes, data, ...restProps
}: AppointmentContentProps) => {
    return (
        <Appointments.AppointmentContent {...restProps} data={data}>
            <div className={classes.container}>
                <div className={classes.text}>
                    {data.title}
                </div>
            </div>
        </Appointments.AppointmentContent>
    );
});


//exportation des composants qui pourront être utilisé dans Planning.js

export { UneMaintenance };
export { MaintenanceContent };
export { PopContent };
export { PopHeader };
export { RessourceFormulaire};