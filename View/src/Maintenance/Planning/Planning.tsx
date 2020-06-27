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
import { ListeVoiture } from './ListeVoiture';
import { ListeModèle } from './ListeModèle';
import { ListeBesoin } from './ListeBesoin';


const Ressources = [{
    fieldName: 'véhicule',
    title: 'vehicule',
    instances: ListeVoiture,
}, {
    fieldName: 'modèle',
    title: 'modèle',
    instances: ListeModèle
}, {
    fieldName: 'Niveau_maintenance',
    title: 'Niveau Maintenance',
    instances: [
        { id: '1', text: 'Niveau 1', color: '#e8eaf6' },
        { id: '2', text: 'Niveau 2', color: '#e8eaf6' },
        { id: '3', text: 'Niveau 3', color: '#e8eaf6' },
        { id: '4', text: 'Niveau 4', color: '#e8eaf6' },
        { id: '5', text: 'Niveau 5', color: '#e8eaf6' },
    ],
}, {
    fieldName: 'echelon_maintenance',
    title: 'échelon',
    instances: [
        { id: '1', text: 'échelon 1', color: '#e8eaf6' },
        { id: '2', text: 'échelon 2', color: '#e8eaf6' },
        { id: '3', text: 'échelon 3', color: '#e8eaf6' },
        { id: '4', text: 'échelon 4', color: '#e8eaf6' },
        { id: '5', text: 'échelon 5', color: '#e8eaf6' },
    ],
}, {
    fieldName: 'Besoin',
    title: 'Besoin',
    instances: ListeBesoin,
}];


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



type AppointmentProps = Appointments.AppointmentProps & WithStyles<typeof styles>;
type AppointmentContentProps = Appointments.AppointmentContentProps & WithStyles<typeof styles>;
type AppointmentTooltipHeaderProps = AppointmentTooltip.HeaderProps & WithStyles<typeof styleToolTip>;
type AppointmentTooltipContentProps = AppointmentTooltip.ContentProps & WithStyles<typeof styleToolTip>;


const PopHeader = withStyles(styleToolTip, { name: 'Header' })(({
    children, appointmentData, ...restProps
}: AppointmentTooltipHeaderProps) => (
        <AppointmentTooltip.Header
            {...restProps}
            appointmentData={appointmentData}
        >
        </AppointmentTooltip.Header>
    ));

const PopContent = withStyles(styleToolTip, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
}: AppointmentTooltipContentProps) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                <Grid item xs={2} className={classes.textCenter}>
                    <DriveEtaIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>{appointmentData?.véhicule}</span>
                </Grid>
                <Grid item xs={2} className={classes.textCenter}>
                    <LocalOfferIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>modèle : {appointmentData?.modèle}</span>
                </Grid>
                <Grid item xs={2} className={classes.textCenter}>
                    <BuildIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>Niveau : {appointmentData?.Niveau_maintenance}</span>
                </Grid>
                <Grid item xs={2} className={classes.textCenter}>
                    <GradeIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>échelon : {appointmentData?.echelon_maintenance}</span>
                </Grid>
                <Grid item xs={2} className={classes.textCenter}>
                    <BusinessCenterIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>{appointmentData?.Besoin}</span>
                </Grid>

            </Grid >
        </AppointmentTooltip.Content >
    ));

const UneMaintenance = withStyles(styles)(({
    data, ...restProps
}: AppointmentProps) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...styles,
                backgroundColor: '#174a84',
                borderRadius: '8px',
            }}
            data={data}
        >
        </Appointments.Appointment>

    ));

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

export { UneMaintenance };
export { MaintenanceContent };
export { PopContent };
export { PopHeader };
export { Ressources};