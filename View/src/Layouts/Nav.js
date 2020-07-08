import React from 'react';
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Drawer, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import MapIcon from '@material-ui/icons/Map';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import SettingsIcon from '@material-ui/icons/Settings';
import Maintenance from '../Maintenance/Maintenance'
import MaintenanceNav from '../TableauDeBord/TBindex'
import KpiList from '../Reporting/indexReport'
import SimpleMap from '../Cartographie/CartographieIndex'
import Cartographie from '../Cartographie/CartographieIndex'
import Login from '../Layouts/Login'

const useStyles = makeStyles((theme) => ({
    drawerPaper: { 
        width: 'inherit',
        background : '#2196f3',
        color : 'white'
    },
    appBar: {
        zIndex: theme.zIndex.drawer - 1,
        background : 'white',
        color : 'black'
      },
    typoPadding : {
        paddingLeft : '250px',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    },
}))

export default function Nav (){
    
    const classes = useStyles();
    
    const [choice, setChoice]  = React.useState(0);
    
    const handleListItemClick = (e, choice) => {
        setChoice(choice);
      };
    
      return (
        <Router>
            <div style={{display : 'flex'}}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography 
                            variant="h3"
                            className={classes.typoPadding}
                        >
                            Armada Board
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer 
                    style={{ width: '233px' }}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    classes={{paper : classes.drawerPaper}}
                >
                    <Toolbar />
                    <img src="https://i.ibb.co/nfMwgg2/AB.png" alt="Logo" height="149" width="166" style={{ marginLeft :30, marginBottom : 20 }} />
                    <List component="nav">
                        <ListItem alignItems="flex-start" >
                        </ListItem>
                        <Link to="/Maintenance" className={classes.link}>
                            <ListItem 
                            button
                            selected={choice === 0}
                            onClick={(e) => handleListItemClick(e, 0)}
                            >
                                <ListItemIcon style={{color : (choice ===0) ? 'white' : '#424242'}}><BuildIcon/></ListItemIcon>
                                <ListItemText style={{color : (choice ===0) ? 'white' : '#424242'}} primary={"Maintenance"}/>
                            </ListItem>
                        </Link>
                        <Link to="/Cartographie" className={classes.link}>
                            <ListItem 
                                button
                                selected={choice === 1}
                                onClick={(e) => handleListItemClick(e, 1)}
                            >
                                <ListItemIcon style={{color : (choice ===1) ? 'white' : '#424242'}}><MapIcon /></ListItemIcon>
                                <ListItemText style={{color : (choice ===1) ? 'white' : '#424242'}} primary={"Cartographie"}/>
                            </ListItem>
                        </Link>
                        <Link to="/TableauDeBord" className={classes.link}>
                            <ListItem 
                                button
                                selected={choice === 2}
                                onClick={(e) => handleListItemClick(e, 2)}
                            >
                                <ListItemIcon style={{color : (choice ===2) ? 'white' : '#424242'}}><DashboardIcon /></ListItemIcon>
                                <ListItemText style={{color : (choice ===2) ? 'white' : '#424242'}} primary={"Tableau de bord"}/>
                            </ListItem>
                        </Link>
                        <Link to="/Reporting" className={classes.link}>
                            <ListItem 
                                button
                                selected={choice === 3}
                                onClick={(e) => handleListItemClick(e, 3)}
                            >
                                <ListItemIcon style={{color : (choice ===3) ? 'white' : '#424242'}}><LineStyleIcon /></ListItemIcon>
                                <ListItemText style={{color : (choice ===3) ? 'white' : '#424242'}} primary={"Reporting"}/>
                            </ListItem>
                        </Link>
                        <Link to="/login" className={classes.link}>
                            <ListItem 
                                button
                                selected={choice === 4}
                                onClick={(e) => {
                                    localStorage.clear()
                                    window.location='/login'
                                    handleListItemClick(e, 4)
                                }}
                            >
                                <ListItemIcon style={{color : (choice ===4) ? 'white' : '#424242'}}><SettingsIcon /></ListItemIcon>
                                <ListItemText style={{color : (choice ===4) ? 'white' : '#424242'}} primary={"Deconnexion"}/>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <Switch>
                    <Route exact path="/">
                        <Grid container style={{paddingTop : '55px'}}>
                            <Grid item xs={12}>
                                <MaintenanceNav />
                            </Grid>
                        </Grid>
                    </Route>
                    <Route exact path="/Reporting">
                        <Container style={{paddingTop : '50px'}}>
                            <KpiList/>
                        </Container>
                    </Route>
                    <Route exact path="/Cartographie">
                        <Container style={{paddingTop : '50px'}}>
                            <SimpleMap />
                        </Container>
                    </Route>
                    <Route exact path="/Maintenance">
                        <Maintenance />
                    </Route>
                    <Route exact path="/TableauDeBord">
                        <Grid container style={{paddingTop : '55px'}}>
                            <Grid item xs={12}>
                                <MaintenanceNav />
                            </Grid>
                        </Grid>
                    </Route>
                    <Route exact path="/login">
                            <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}