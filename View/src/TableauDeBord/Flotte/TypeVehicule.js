import React, { Component } from 'react';
import {
    PieChart, Pie, Sector, Cell,
  } from 'recharts';
import { Grid, Typography } from '@material-ui/core';


export default class TypeVehicule extends Component {
    render (){
        const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                        {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

        const RADIAN = Math.PI / 180;
        return(
            <Grid container spacing={2}>
                <PieChart width={200} height={150} onMouseEnter={this.onPieEnter}>
                    <Pie
                    data={data} 
                    cx={105} 
                    cy={80} 
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80} 
                    fill="#8884d8"
                    paddingAngle={5}
                    >
                        {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>
                </PieChart>
                <Typography variant="body1">Région 01</Typography>
            </Grid>
        );
    }
}