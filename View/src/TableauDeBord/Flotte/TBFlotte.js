import React, {Component} from 'react'
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import TypeVehicule from './TypeVehicule'
import Kilometrage from './Kilometrage'
import MissionRadar from './Mission'
import TableFlotte from './TableFlotte'


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
                        <Typography variant='body2'>Nombre de véhicule par type et région</Typography>
                        <TypeVehicule/>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Typography variant='body2'>Kilométrage parcourrus par chaque type de véhicule par région</Typography>
                        <Kilometrage />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <MissionRadar/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant='body2'>Table de tous les véhicules</Typography>
                        <TableFlotte />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Flotte)