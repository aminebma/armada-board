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

import { UneMaintenance, MaintenanceContent, PopHeader, PopContent, Ressources } from './Planning.tsx';

export default class TestPlanning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentViewName: 'Week',
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.getMaintenanceData = this.getMaintenanceData.bind(this)
    };

    currentViewNameChange = (currentViewName) => {
        this.setState({ currentViewName });
    }

    // fonction par défaut qui s'éxécute lors de l'affichage de la page
    // elle exécutera la fonction getMaintenanceData qui ramènera les maintenances de la BDD
    componentWillMount() {
        this.getMaintenanceData();
    }

    //Fonction pour charger les maintenances de la BDD et les mettre dans la variable data du state
    getMaintenanceData() {
        // http request first method

        // create a new XMLHttpRequest

        const xhr = new XMLHttpRequest();

        // get a callback when the server responds

        xhr.addEventListener('load', () => {
            // update the state of the component with the result here

            this.setState({ data: JSON.parse(xhr.responseText) })
        });

        // open the request with the verb and the url

        xhr.open('GET', 'http://localhost:3001/api/maintenances/planning/all/1', false)

        // send the request

        xhr.send();

    }

    //Fonction du changement dans le planning ( ajout , supression, modification d'une maintenance)
    //fonction par défaut du package, je n'y ai pas touché, je ne l'ai pas comprise aussi
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
        const mesMaintenances = this.state.data.map(function (Unemaintenance) {
            return (
                <div>
                    <p>le Id de la maintenance : {Unemaintenance.id}</p>
                    <p>le type de la maintenance : {Unemaintenance.type}</p>
                    <p>le niveau de la maintenance : {Unemaintenance.niveau[0]}</p>
                    <p>l'echelon de la maintenance : {Unemaintenance.echelon[0]}</p>
                    <p>la date du début de la maintenance : {Unemaintenance.date_debut}</p>
                    <p>le date de fin de la maintenance : {Unemaintenance.date_fin}</p>
                    <p>le véhicule de la maintenance : {Unemaintenance.vehicule}</p>
                    <p>--------------------------------------------------------------------</p>
                </div>
            )
        })

        //rendement du planning
        // chaque composant à des propriétés par défaut, qu'on peut ou doit spécifer
        // par exemple le composant EditingState doit avoir bligatoirement la propriété onCommitChanges
        // par exemple le composant appointment peut être utilisé sans propriétés, il affichera des rendez vous avec la structure par défaut
        // mais vu qu'on a écrasé les propriétés appointmentComponent et appointmentContentComponent par les composants crées dans planning.tsx, l'affichage est personnalisé et non par défaut
        // plus d'information sur les propriétés de chaque composant sur https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/
    
        return (
            <div>
                {mesMaintenances}
            
            {/*
            <div>
                <Paper className="Calendar">
                    <Scheduler data={this.state.data} >
                        <ViewState currentViewName={this.state.currentViewName} onCurrentViewNameChange={this.currentViewNameChange} />
                        <EditingState onCommitChanges={this.commitChanges} />
                        <IntegratedEditing />
                        <WeekView startDayHour={9} endDayHour={19} />
                        <WeekView name="work-week" displayName="Work Week" excludedDays={[6, 7]} startDayHour={7} endDayHour={19} />
                        <MonthView />
                        <DayView startDayHour={9} endDayHour={19} />
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <ViewSwitcher />
                        <ConfirmationDialog messages="Etes vous sur de vouloir supprimer cette maintenance ?" />
                        <Appointments appointmentComponent={UneMaintenance} appointmentContentComponent={MaintenanceContent} />
                        <Resources />
                        <AppointmentTooltip headerComponent={PopHeader} contentComponent={PopContent} showOpenButton showDeleteButton showCloseButton />
                        <AppointmentForm />
                    </Scheduler>
                </Paper>
            </div>
            */}
            </div>
        );
    }
}
