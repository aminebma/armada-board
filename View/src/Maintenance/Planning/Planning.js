import React, { Component } from 'react';
import { ViewState, EditingState, IntegratedEditing, IntegratedGrouping, GroupingState } from '@devexpress/dx-react-scheduler';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors';
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
    EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';

import { UneMaintenance, MaintenanceContent, PopHeader, PopContent } from './Planning.tsx';

const styles = ({ spacing, palette, typography }) => ({
    formControlLabel: {
        padding: spacing(1),
        paddingLeft: spacing(95),
    },
    text: {
        ...typography.caption,
        color: palette.text.secondary,
        fontWeight: 'medium',
        fontSize: '1rem',
    },
});


//const isWeekOrMonthView = viewName => viewName === 'Week' || viewName === 'Month';

const groupOrientation = viewName => "Vertical"

const GroupOrderSwitcher = withStyles(styles, { name: 'ResourceSwitcher' })(
    ({
        isGroupByNiveau, onChange, classes,
    }) => (
            <FormControlLabel
                control={
                    <Checkbox checked={isGroupByNiveau} onChange={onChange} color="primary" />
                }
                label="Grouper par niveau de maintenance"
                className={classes.formControlLabel}
                classes={{ label: classes.text }}
            />
        ),
);

const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
        return null;
    } return <AppointmentForm.TextEditor {...props} />;
};

//composant du formulaire de modificatione et d'ajout d'une maintenance
const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onMatriculeChange = (nextValue) => {
        onFieldChange({ vehicule: nextValue });
    };

    const onAffectationChange = (nextValue) => {
        onFieldChange({ affectation: nextValue });
    };

    const onEchelonChange = (nextValue) => {
        onFieldChange({ echelon: nextValue });
    };

    const onBesoinChange = (nextValue) => {
        onFieldChange({ _text: nextValue });
    };
    const onQuantiteChange = (nextValue) => {
        onFieldChange({ besoin: nextValue });
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Matricule"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.vehicule}
                onValueChange={onMatriculeChange}
                placeholder="matricule externe du véhicule"
            />
            <AppointmentForm.Label
                text="Affiliation"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.affectation}
                onValueChange={onAffectationChange}
                type="numberEditor"
                placeholder="affectation du véhicule"
            />
            <AppointmentForm.Label
                text="échelon"
                type="title"
            />
            <AppointmentForm.Select
                value={appointmentData.echelon}
                placeholder="Echelon de la maintenance"
                availableOptions={[
                    { id: 1, text: "1" },
                    { id: 2, text: "2" },
                    { id: 3, text: "3" },
                    { id: 4, text: "4" },
                    { id: 5, text: "5" },
                ]}
                onValueChange={onEchelonChange}
            />
            <AppointmentForm.Label
                text="Besoin"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.besoin.contenu.intitule._text}
                onValueChange={onBesoinChange}
                placeholder="Besoin requis de la maintenance"
            />
            <AppointmentForm.Label
                text="Quantité"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.besoin.contenu.quantite._text}
                onValueChange={onQuantiteChange}
                placeholder="quantite du besoin"
            />
        </AppointmentForm.BasicLayout>
    );
};

export default class Planning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data, //transmetre la variable data du parent dans le state du child
            currentViewName: 'Month',
            RessourceFormulaire: [{
                fieldName: 'niveau',
                title: 'niveau',
                instances: [
                    { id: 1, text: 'Niveau 1', color: orange },
                    { id: 2, text: 'Niveau 2', color: '#58C9B9' },
                    { id: 3, text: 'Niveau 3', color: blue },
                    { id: 4, text: 'Niveau 4', color: '#174a84' },
                    { id: 5, text: 'Niveau 5', color: '#2E294E' },
                ],
                allowMultiple: true,
            }],
            grouping: [{
                resourceName: 'niveau',
            }],
            //groupByDate: isWeekOrMonthView,
            isGroupByNiveau: false,
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.onGroupOrderChange = () => {
            const { isGroupByNiveau } = this.state;
            this.setState({
                isGroupByNiveau: !isGroupByNiveau,
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
        let donnee = this.state.data
        if (changed) {
            donnee = donnee.map(appointment => (
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
              this.setState({data:donnee})  
              this.props.onChangeData(this.state.data)
        }
        if (deleted) {
            donnee = donnee.filter(appointment => appointment.id !== deleted);
            this.setState({data:donnee})
            this.props.onChangeData(this.state.data)
            /*
            const xhr = new XMLHttpRequest();
            let formData = new FormData();
            formData.append("id",data.id)
            xhr.addEventListener('load', () => {
            });
            xhr.open('DELETE', 'http://localhost:3001/api/maintenances/', false)
            xhr.send(formData);*/
        }
    }

    render() {
        let donnee = this.state.data
        // rendement du planning
        // chaque composant à des propriétés par défaut, qu'on peut ou doit spécifer
        // par exemple le composant EditingState doit avoir bligatoirement la propriété onCommitChanges
        // par exemple le composant appointment peut être utilisé sans propriétés, il affichera des rendez vous avec la structure par défaut
        // mais vu qu'on a écrasé les propriétés appointmentComponent et appointmentContentComponent par les composants crées dans planning.tsx, l'affichage est personnalisé et non par défaut
        // plus d'information sur les propriétés de chaque composant sur https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/
        return (
            <div>
                <div>
                    <GroupOrderSwitcher isGroupByNiveau={this.state.isGroupByNiveau} onChange={this.onGroupOrderChange} />
                </div>
                <Paper className="Calendar">
                    <Scheduler local="fr-FR" data={donnee} >
                        <ViewState currentViewName={this.state.currentViewName} onCurrentViewNameChange={this.currentViewNameChange} />
                        <EditingState onCommitChanges={this.commitChanges} />
                        <EditRecurrenceMenu />
                        <IntegratedEditing />
                        <WeekView cellDuration="60" name="Week" displayName="semaine" excludedDays={[6, 7]} startDayHour={8} endDayHour={19} />
                        <MonthView name="Month" displayName="Mois" />
                        <DayView cellDuration="60" name="Day" displayName="Jour" startDayHour={8} endDayHour={19} />
                        <GroupingState grouping={this.state.grouping} groupOrientation={groupOrientation} groupByDate={this.state.groupByDate} />
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <ViewSwitcher />
                        <ConfirmationDialog confirmDeleteMessage="Etes vous sur de vouloir supprimer cette maintenance ?" confirmCancelMessage="Abandonner les changements ?"/>
                        <Appointments appointmentComponent={UneMaintenance} appointmentContentComponent={MaintenanceContent} />
                        <Resources data={this.state.RessourceFormulaire} mainResourceName="niveau" />
                        {this.state.isGroupByNiveau ? <IntegratedGrouping /> : null}
                        {this.state.isGroupByNiveau ? <GroupingPanel /> : null}
                        <AppointmentTooltip headerComponent={PopHeader} contentComponent={PopContent} showDeleteButton showCloseButton showOpenButton />
                        <AppointmentForm basicLayoutComponent={BasicLayout} textEditorComponent={TextEditor} />
                        <DragDropProvider />
                        <CurrentTimeIndicator shadePreviousCells="true" shadePreviousAppointments="true" updateInterval="20000" />
                        <DragDropProvider />
                    </Scheduler>
                </Paper>
            </div>
        );
    }
}
