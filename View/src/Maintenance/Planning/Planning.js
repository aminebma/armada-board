import React, { Component } from 'react';
import { ViewState ,EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import Paper from '@material-ui/core/Paper';
import {
    Scheduler,
    WeekView,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    ViewSwitcher,
    AppointmentTooltip,
    ConfirmationDialog,
    DayView,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments } from './TestData';
import BuildIcon from '@material-ui/icons/Build';

class Planning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: appointments,
            currentViewName: 'Week',
        };
        this.currentViewNameChange = (currentViewName) => {
            this.setState({ currentViewName });
        };
        this.commitChanges = this.commitChanges.bind(this);
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
        const { data, currentViewName } = this.state;
        return (
            <Paper className="Calendar">
                <Scheduler data={data}>
                    <ViewState defaultCurrentDate={Date.currentDate} currentViewName={currentViewName} onCurrentViewNameChange={this.currentViewNameChange} />
                    <EditingState
                        onCommitChanges={this.commitChanges}
                    />
                    <IntegratedEditing />
                    <WeekView startDayHour={7} endDayHour={19} />
                    <WeekView name="work-week" displayName="Work Week" excludedDays={[6, 7]} startDayHour={7} endDayHour={19} />
                    <MonthView />
                    <DayView startDayHour={9} endDayHour={19} />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <ConfirmationDialog />
                    <Appointments recurringIconComponent={<BuildIcon></BuildIcon>}/>
                    <AppointmentTooltip showOpenButton
                        showDeleteButton />
                    <AppointmentForm />
                </Scheduler>
            </Paper>
        );
    }

}

export default Planning;