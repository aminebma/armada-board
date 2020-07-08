import React, {Component} from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer  } from 'recharts';
import { Grid, Typography } from '@material-ui/core';


const data = [
    {
        "name": "Région 01",
        "Véhicule 01": 40,
        "Véhicule 02": 14,
        "Véhicule 03" : 31,
        "Véhicule 04": 36,
    },
    {
        "name": "Région 02",
        "Véhicule 01": 20,
        "Véhicule 02": 12,
        "Véhicule 03" : 16,
        "Véhicule 04": 28,
    },
    {
        "name": "Région 03",
        "Véhicule 01": 48,
        "Véhicule 02": 10,
        "Véhicule 03" : 31,
        "Véhicule 04": 14,
    },
    {
        "name": "Région 04",
        "Véhicule 01": 64,
        "Véhicule 02": 16,
        "Véhicule 03" : 7,
        "Véhicule 04": 13,
    },
    {
        "name": "Région 05",
        "Véhicule 01": 51,
        "Véhicule 02": 32,
        "Véhicule 03" : 28,
        "Véhicule 04": 17,
    },
    {
        "name": "Région 06",
        "Véhicule 01": 42,
        "Véhicule 02": 25,
        "Véhicule 03" : 36,
        "Véhicule 04": 14,
    },
  ]
  
export default class MissionRadar extends Component {
    render() {
        return (
            <div style={{width : "350px", height : "350px"}}>
                <Typography variant='body2'>Nombre de missions par type de véhicule et région</Typography>
                <ResponsiveContainer width="99%">
                    <RadarChart cx={180} cy={135} outerRadius={100} width={300} height={300} data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 70]} />
                        <Radar name="Véhicule 01" dataKey="Véhicule 01" stroke='#0088FE' fill='#0088FE' fillOpacity={0.6} />
                        <Radar name="Véhicule 02" dataKey="Véhicule 02" stroke='#00C49F' fill='#00C49F' fillOpacity={0.6} />
                        <Radar name="Véhicule 03" dataKey="Véhicule 03" stroke='#FFBB28' fill='#FFBB28' fillOpacity={0.6} />
                        <Radar name="Véhicule 04" dataKey="Véhicule 04" stroke='#FF8042' fill='#FF8042' fillOpacity={0.6} />
                        <Legend />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            
        );
    }
}