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
import { ListeVoiture } from './ListeVoiture';
import { ListeModèle } from './ListeModèle';
import { ListeBesoin } from './ListeBesoin';
import{ UneMaintenance, MaintenanceContent} from './Planning.tsx';

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


export default class TestPlanning extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: MaintenanceData,
            currentViewName: 'Week',
        };
        this.commitChanges = this.commitChanges.bind(this);
    };

    currentViewNameChange = (currentViewName) => {
        this.setState({ currentViewName });
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
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
        const donnee = this.state.data;
        return (
            <div>
            <Paper className="Calendar">
                <Scheduler data={donnee} >
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
                    <Appointments appointmentComponent={UneMaintenance} appointmentContentComponent={MaintenanceContent}/>
                    <Resources data={resources}/>
                    <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
                    <AppointmentForm />
                </Scheduler>
            </Paper>
            </div>
        );
    }
}
