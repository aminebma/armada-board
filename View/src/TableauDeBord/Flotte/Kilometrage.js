import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        "name": "Région 01",
        "Véhicule 01": 4000,
        "Véhicule 02": 2400,
        "Véhicule 03" : 3500,
        "Véhicule 04": 4000,
    },
    {
        "name": "Région 02",
        "Véhicule 01": 5000,
        "Véhicule 02": 2100,
        "Véhicule 03" : 3100,
        "Véhicule 04": 1100,
    },
    {
        "name": "Région 03",
        "Véhicule 01": 4100,
        "Véhicule 02": 2300,
        "Véhicule 03" : 3200,
        "Véhicule 04": 1400,
    },
    {
        "name": "Région 04",
        "Véhicule 01": 4300,
        "Véhicule 02": 2200,
        "Véhicule 03" : 1800,
        "Véhicule 04": 2200,
    },
    {
        "name": "Région 05",
        "Véhicule 01": 5200,
        "Véhicule 02": 3100,
        "Véhicule 03" : 1200,
        "Véhicule 04": 1000,
    },
    {
        "name": "Région 06",
        "Véhicule 01": 3900,
        "Véhicule 02": 2000,
        "Véhicule 03" : 2900,
        "Véhicule 04": 1300,
    },
  ]

export default class Kilometrage extends PureComponent {

  render() {
    return (
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Véhicule 01" fill='#0088FE' />
            <Bar dataKey="Véhicule 02" fill='#00C49F' />
            <Bar dataKey="Véhicule 03" fill='#FFBB28' />
            <Bar dataKey="Véhicule 04" fill='#FF8042' />
        </BarChart>
    );
  }
}