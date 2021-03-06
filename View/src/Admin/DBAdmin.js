import React from 'react';
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Drawer, AppBar, makeStyles, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, List, Container, CardMedia, Grid } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import Unites from '../Admin/Unites';
import Utilisateurs from '../Admin/Utilisateurs';
import Vehicules from '../Admin/Vehicules';
import Fichiers from '../Admin/Fichiers';
import RefMaintenance from '../Admin/RefMaintenance';
import Login from '../Layouts/Login';
import MaintenanceNav from '../TableauDeBord/TBindex'

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

export default function DBAdmin (){
    
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
                        <Link to="/admin" className={classes.link}>
                            <ListItem 
                            button
                            selected={choice === 0}
                            onClick={(e) => handleListItemClick(e, 0)}
                            >
                                <ListItemIcon style={{color : (choice ===0) ? 'white' : '#424242'}}><HomeIcon/></ListItemIcon>
                                <ListItemText style={{color : (choice ===0) ? 'white' : '#424242'}} primary={"Accueil"}/>
                            </ListItem>
                        </Link>
                        <Link to="/admin/unites" className={classes.link}>
                            <ListItem 
                            button
                            selected={choice === 1}
                            onClick={(e) => handleListItemClick(e, 1)}
                            >
                                <ListItemIcon style={{color : (choice ===1) ? 'white' : '#424242'}}><AccountBalanceIcon/></ListItemIcon>
                                <ListItemText style={{color : (choice ===1) ? 'white' : '#424242'}} primary={"Gestion des unités"}/>
                            </ListItem>
                        </Link>
                        <Link to="/admin/Utilisateurs" className={classes.link}>
                            <ListItem 
                                button
                                selected={choice === 2}
                                onClick={(e) => handleListItemClick(e, 2)}
                            >
                                <ListItemIcon style={{color : (choice ===2) ? 'white' : '#424242'}}><RecentActorsIcon  /></ListItemIcon>
                                <ListItemText style={{color : (choice ===2) ? 'white' : '#424242'}} primary={"Gestion des utilisateurs"}/>
                            </ListItem>
                        </Link>
                        <Link to="/admin/Vehicules" className={classes.link}>
                            <ListItem 
                                button
                                selected={choice === 3}
                                onClick={(e) => handleListItemClick(e, 3)}
                            >
                                <ListItemIcon style={{color : (choice ===3) ? 'white' : '#424242'}}><DirectionsCarIcon  /></ListItemIcon>
                                <ListItemText style={{color : (choice ===3) ? 'white' : '#424242'}} primary={"Gestion des vehicules"}/>
                            </ListItem>
                        </Link>
                        <Link to="/admin/Fichiers" className={classes.link}>
                            <ListItem 
                                button
                                selected={choice === 4}
                                onClick={(e) => handleListItemClick(e, 4)}
                            >
                                <ListItemIcon style={{color : (choice ===4) ? 'white' : '#424242'}}><DescriptionIcon  /></ListItemIcon>
                                <ListItemText style={{color : (choice ===4) ? 'white' : '#424242'}} primary={"Gestion des fichiers"}/>
                            </ListItem>
                        </Link>
                        <Link to="/admin/RefMaintenance" className={classes.link}>
                            <ListItem 
                                button
                                selected={choice === 5}
                                onClick={(e) => {
                                    handleListItemClick(e, 5)
                                }}
                            >
                                <ListItemIcon style={{color : (choice ===5) ? 'white' : '#424242'}}><AssignmentIcon  /></ListItemIcon>
                                <ListItemText style={{color : (choice ===5) ? 'white' : '#424242'}} primary={"Gestion Ref. Maintenance"}/>
                            </ListItem>
                        </Link>
                        <Link to="/login" className={classes.link}>
                            <ListItem 
                                button
                                selected={choice === 6}
                                onClick={(e) => {
                                    localStorage.clear()
                                    window.location='/login'
                                    handleListItemClick(e, 6)
                                }}
                            >
                                <ListItemIcon style={{color : (choice ===6) ? 'white' : '#424242'}}><ExitToAppIcon  /></ListItemIcon>
                                <ListItemText style={{color : (choice ===6) ? 'white' : '#424242'}} primary={"Deconnexion"}/>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <Switch>
                    <Route exact path="/admin">
                        <Grid container style={{paddingTop : '55px'}}>
                            <Grid item xs={12}>
                                <MaintenanceNav/>
                            </Grid>
                        </Grid>
                    </Route>
                    <Route exact path="/admin/unites">
                        <Container style={{paddingTop : '50px'}}>
                            <Unites/>
                        </Container>
                    </Route>
                    <Route exact path="/admin/Utilisateurs">
                        <Container style={{paddingTop : '50px'}}>
                            <Utilisateurs />
                        </Container>
                    </Route>
                    <Route exact path="/admin/Vehicules">
                        <Vehicules />
                    </Route>
                    <Route exact path="/admin/Fichiers">
                        <Grid container style={{paddingTop : '55px'}}>
                            <Grid item xs={12}>
                                <Fichiers />
                            </Grid>
                        </Grid>
                    </Route>
                    <Route exact path="/admin/RefMaintenance">
                    <Grid container style={{paddingTop : '55px'}}>
                        <Grid item xs={12}>
                            <RefMaintenance />
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