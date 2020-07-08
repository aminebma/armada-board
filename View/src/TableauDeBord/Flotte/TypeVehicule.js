import React, { Component } from 'react';
import {
    PieChart, Pie, Sector, Cell,
  } from 'recharts';
import { Grid, Typography, Button } from '@material-ui/core';


export default class TypeVehicule extends Component {
    render (){
        const data1 = [{name: 'Group A', value: 1450}, {name: 'Group B', value: 300},
                        {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
        const data2 = [{name: 'Group A', value: 1872}, {name: 'Group B', value: 360},
                        {name: 'Group C', value: 750}, {name: 'Group D', value: 200}];
        const data3 = [{name: 'Group A', value: 1300}, {name: 'Group B', value: 300},
                        {name: 'Group C', value: 650}, {name: 'Group D', value: 280}];
        const data4 = [{name: 'Group A', value: 1100}, {name: 'Group B', value: 430},
                        {name: 'Group C', value: 210}, {name: 'Group D', value: 250}];
        const data5 = [{name: 'Group A', value: 1500}, {name: 'Group B', value: 230},
                        {name: 'Group C', value: 325}, {name: 'Group D', value: 240}];
        const data6 = [{name: 'Group A', value: 1400}, {name: 'Group B', value: 365},
                        {name: 'Group C', value: 230}, {name: 'Group D', value: 111}];
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

        const RADIAN = Math.PI / 180;
        return(
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <PieChart width={200} height={150} onMouseEnter={this.onPieEnter}>
                        <Pie
                        data={data1} 
                        cx={105} 
                        cy={80} 
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80} 
                        fill="#8884d8"
                        paddingAngle={5}
                        >
                            { data1.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                        </Pie>
                    </PieChart>
                </Grid>
                <Grid item xs={2}>
                <PieChart width={200} height={150} onMouseEnter={this.onPieEnter}>
                    <Pie
                    data={data2} 
                    cx={105} 
                    cy={80} 
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80} 
                    fill="#8884d8"
                    paddingAngle={5}
                    >
                        { data2.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                    </Pie>
                </PieChart>
                
                </Grid> 
                <Grid item xs={2}>
                <PieChart width={200} height={150} onMouseEnter={this.onPieEnter}>
                    <Pie
                    data={data3} 
                    cx={105} 
                    cy={80} 
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80} 
                    fill="#8884d8"
                    paddingAngle={5}
                    >
                        { data3.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                    </Pie>
                </PieChart>
                
                </Grid> 
                <Grid item xs={2}>
                <PieChart width={200} height={150} onMouseEnter={this.onPieEnter}>
                    <Pie
                    data={data4} 
                    cx={105} 
                    cy={80} 
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80} 
                    fill="#8884d8"
                    paddingAngle={5}
                    >
                        { data4.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                    </Pie>
                </PieChart>
                
                </Grid> 
                <Grid item xs={2}>
                <PieChart width={200} height={150} onMouseEnter={this.onPieEnter}>
                    <Pie
                    data={data5} 
                    cx={105} 
                    cy={80} 
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80} 
                    fill="#8884d8"
                    paddingAngle={5}
                    >
                        { data5.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                    </Pie>
                </PieChart>
                
                </Grid> 
                <Grid item xs={2}>
                    <PieChart width={200} height={150} onMouseEnter={this.onPieEnter}>
                        <Pie
                        data={data6} 
                        cx={105} 
                        cy={80} 
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80} 
                        fill="#8884d8"
                        paddingAngle={5}
                        >
                            { data6.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                        </Pie>
                    </PieChart>
                </Grid> 
                <Grid item xs={2}>
                    <Typography variant="h6" style={{textAlign : "center"}}> Région 01 </Typography>
                </Grid> 
                <Grid item xs={2}>
                    <Typography variant="h6" style={{textAlign : "center"}}> Région 02 </Typography>
                </Grid> 
                <Grid item xs={2}>
                    <Typography variant="h6" style={{textAlign : "center"}}> Région 03 </Typography>
                </Grid> 
                <Grid item xs={2}>
                    <Typography variant="h6" style={{textAlign : "center"}}> Région 04 </Typography>
                </Grid> 
                <Grid item xs={2}>
                    <Typography variant="h6" style={{textAlign : "center"}}> Région 05 </Typography>
                </Grid> 
                <Grid item xs={2}>
                    <Typography variant="h6" style={{textAlign : "center"}}> Région 06 </Typography>
                </Grid> 
                    <Grid item xs={3}>
                        <Button variant="contained" disabled style={{background : '#0088FE', color : 'white', textAlign : "center"}}>
                            Véhicule 1
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" disabled style={{background : '#00C49F', color : 'white', textAlign : "center"}}>
                            Véhicule 2
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" disabled style={{background : '#FFBB28', color : 'white', textAlign : "center"}}>
                            Véhicule 3
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" disabled style={{background : '#FF8042', color : 'white', textAlign : "center"}}>
                            Véhicule 4
                        </Button>
                    </Grid>
                </Grid>   
        );
    }
}