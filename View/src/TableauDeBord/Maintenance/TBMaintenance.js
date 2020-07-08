import React, {Component} from 'react'
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import RadarMaint from './RadarMaint'
import TableMaint from './TableMaint'
import MaintPerDay from './ChartMaint'


const styles = theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
})

class Maintenance extends Component{
    render(){
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Typography variant='h6'>Nombre de maintenances par région.</Typography>
                        <MaintPerDay/>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography variant='h6'>Nombre de maintenances par état et par région.</Typography>
                        <RadarMaint/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant='h6'>Tableau des maintenances.</Typography>
                        <TableMaint />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Maintenance)