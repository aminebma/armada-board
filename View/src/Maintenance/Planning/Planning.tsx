import React, { Component } from 'react';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import Paper from '@material-ui/core/Paper';
import {
    Scheduler,
    WeekView,
    MonthView,
    Toolbar,
    DateNavigator,
    TodayButton,
    ViewSwitcher,
    AppointmentTooltip,
    Appointments,
    ConfirmationDialog,
    DayView,
    AppointmentForm,
    Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { MaintenanceData } from './TestData';
import { Resource } from 'devextreme-react/scheduler';
import BuildIcon from '@material-ui/icons/Build';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'clsx';
import { ListeVoiture } from './ListeVoiture';
import { ListeModèle } from './ListeModèle';
import { ListeBesoin } from './ListeBesoin';

const resources = [{
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

const isWeekEnd = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;
const defaultCurrentDate = new Date(2020, 6, 21, 11, 15);

type AppointmentProps = Appointments.AppointmentProps & WithStyles<typeof styles>
type AppointmentContentProps = Appointments.AppointmentContentProps & WithStyles<typeof styles>;

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
                <div className={classNames(classes.text, classes.content)}>
                    {`véhicule: ${data.véhicule}`}
                </div>
                <div className={classNames(classes.text, classes.content)}>
                    {`modèle: ${data.modèle}`}
                </div>
                <div className={classNames(classes.text, classes.content)}>
                    {`Niveau maintenance: ${data.Niveau_maintenance}`}
                </div>
                <div className={classNames(classes.text, classes.content)}>
                    {`Echelon maintenance: ${data.echelon_maintenance}`}
                </div>
                <div className={classNames(classes.text, classes.content)}>
                    {`Besoin requis: ${data.Besoin}`}
                </div>
            </div>
        </Appointments.AppointmentContent>
    );
});


class Planning extends Component {

    state = {
        data: MaintenanceData,
        currentViewName: 'Week',
    };
    constructor(props){
        super(props)
        this.commitChanges = this.commitChanges.bind(this);
    };
   
    currentViewNameChange = (currentViewName) => {
        this.setState({ currentViewName });
    }

        commitChanges ({ added, changed, deleted }) {
            this.setState((state) => {
            let data = this.state.data;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
        }

        render() {

            return (
                <Paper className="Calendar">
                    <Scheduler data={this.state.data} >
                        <ViewState currentViewName={this.state.currentViewName} onCurrentViewNameChange={this.currentViewNameChange} />
                        <EditingState onCommitChanges={this.commitChanges}/>
                        <IntegratedEditing />
                        <WeekView startDayHour={9} endDayHour={19} />
                        <WeekView name="work-week" displayName="Work Week" excludedDays={[6, 7]} startDayHour={7} endDayHour={19} />
                        <MonthView />
                        <DayView startDayHour={9} endDayHour={19} />
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <ViewSwitcher />
                        <ConfirmationDialog />
                        <Appointments appointmentComponent={UneMaintenance}
                            appointmentContentComponent={MaintenanceContent} />
                        <Resources data={resources} />
                        <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
                        <AppointmentForm />
                    </Scheduler>
                </Paper>
            );
        }

    }

    export default Planning;