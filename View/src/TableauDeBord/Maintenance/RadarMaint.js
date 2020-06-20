import React, {Component} from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer  } from 'recharts';
import { Grid } from '@material-ui/core';


const data = [
    {
      zone: 'Région 1', A: 120, B: 30, summ : 150,
    },
    {
        zone: 'Région 2', A: 90, B: 10, summ : 100,
    },
    {
        zone: 'Région 3', A: 50, B: 20, summ : 70,
    },
    {
        zone: 'Région 4', A: 100, B: 20, summ : 120,
    },
    {
        zone: 'Région 5', A: 70, B: 20, summ : 90,
    },
    {
        zone: 'Région 6', A: 60, B: 50, summ : 110,
    },
  ];
  
export default class RadarMaint extends Component {
    render() {
        return (
            <div style={{width : "350px", height : "350px"}}>
            <ResponsiveContainer width="99%">
                <RadarChart cx={200} cy={135} outerRadius={100} width={300} height={300} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="zone" />
                    <PolarRadiusAxis angle={30} domain={[0, 200]} />
                    <Radar name="Maintenances" dataKey="summ" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Effectuées" dataKey="A" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="En attentes" dataKey="B" stroke="#d50000" fill="#d50000" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
            </div>
            
        );
    }
}