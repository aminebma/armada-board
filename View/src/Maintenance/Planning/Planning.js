import React, { Component } from 'react';
import { ViewState, EditingState, IntegratedEditing, IntegratedGrouping, GroupingState } from '@devexpress/dx-react-scheduler';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
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
    CurrentTimeIndicator,
    GroupingPanel,
    DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';

import { UneMaintenance, MaintenanceContent, PopHeader, PopContent, RessourceFormulaire } from './Planning.tsx';

const styles = ({ spacing, palette, typography }) => ({
    formControlLabel: {
        padding: spacing(2),
        paddingLeft: spacing(10),
    },
    text: {
        ...typography.caption,
        color: palette.text.secondary,
        fontWeight: 'bold',
        fontSize: '1rem',
    },
});

const isWeekOrMonthView = viewName => viewName === 'Week' || viewName === 'Month';

const groupOrientation = viewName => viewName.split(' ')[0];

const GroupOrderSwitcher = withStyles(styles, { name: 'ResourceSwitcher' })(
    ({
        isGroupByDate, onChange, classes,
    }) => (
            <FormControlLabel
                control={
                    <Checkbox checked={isGroupByDate} onChange={onChange} color="primary" />
                }
                label="Grouper par date d'abord"
                className={classes.formControlLabel}
                classes={{ label: classes.text }}
            />
        ),
);

export default class Planning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null, //transmetre la variable data du parent dans le state du child
            currentViewName: 'Month',
            grouping: {
                resourceName: 'niveau',
            },
            groupByDate: isWeekOrMonthView,
            isGroupByDate: true,
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.onGroupOrderChange = () => {
            const { isGroupByDate } = this.state;
            this.setState({
                isGroupByDate: !isGroupByDate,
                groupByDate: isGroupByDate ? undefined : isWeekOrMonthView,
            });
        };

        //this.getMaintenanceData = this.getMaintenanceData.bind(this)
        //this.UpdateParentState = this.UpdateParentState.bind(this)
    };


    /*UpdateParentState() {
        this.props.onChangeData(this.state.data) // MAJ de la variable data du state du parent en passons le contenu de la variable data du state du chil
    }*/
    currentViewNameChange = (currentViewName) => {
        this.setState({ currentViewName });
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
        const donnee = this.props.data
        //if(donnee[5]!= null) alert(donnee[5].title+' coucou')

        // rendement du planning
        // chaque composant à des propriétés par défaut, qu'on peut ou doit spécifer
        // par exemple le composant EditingState doit avoir bligatoirement la propriété onCommitChanges
        // par exemple le composant appointment peut être utilisé sans propriétés, il affichera des rendez vous avec la structure par défaut
        // mais vu qu'on a écrasé les propriétés appointmentComponent et appointmentContentComponent par les composants crées dans planning.tsx, l'affichage est personnalisé et non par défaut
        // plus d'information sur les propriétés de chaque composant sur https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/
        return (
            <div>
                <Paper className="Calendar">
                    <GroupOrderSwitcher isGroupByDate={this.state.isGroupByDate} onChange={this.onGroupOrderChange} />
                    <Scheduler data={donnee} local="fr-FR">
                        <ViewState currentViewName={this.state.currentViewName} onCurrentViewNameChange={this.currentViewNameChange} />
                        <EditingState onCommitChanges={this.commitChanges} />
                        <WeekView startDayHour={7} endDayHour={17} />
                        <WeekView name="work-week" displayName="Work Week" excludedDays={[6, 7]} startDayHour={7} endDayHour={19} />
                        <MonthView />
                        <DayView startDayHour={7} endDayHour={17} />
                        <GroupingState grouping={this.state.grouping} groupOrientation={this.groupOrientation}/>
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <ViewSwitcher />
                        <ConfirmationDialog messages="Etes vous sur de vouloir supprimer cette maintenance ?" />
                        <Appointments appointmentComponent={UneMaintenance} appointmentContentComponent={MaintenanceContent} />
                        <Resources data={RessourceFormulaire} mainResourceName={'niveau'} />
                        <IntegratedGrouping />
                        <GroupingPanel />
                        <AppointmentTooltip headerComponent={PopHeader} contentComponent={PopContent} showDeleteButton showCloseButton />
                        <CurrentTimeIndicator shadePreviousCells="true" shadePreviousAppointments="true" updateInterval="20000" />
                        <DragDropProvider />
                    </Scheduler>
                </Paper>
            </div>
        );
    }
}
