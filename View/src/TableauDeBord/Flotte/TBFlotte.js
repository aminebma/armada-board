import React, {Component} from 'react'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import TypeVehicule from './TypeVehicule'


const styles = theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
})

class Flotte extends Component{
    render(){
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <TypeVehicule/>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Flotte)