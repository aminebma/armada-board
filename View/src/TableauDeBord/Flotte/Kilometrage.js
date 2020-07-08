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
        "Véhicule 01": 4000,
        "Véhicule 02": 2400,
        "Véhicule 03" : 3500,
        "Véhicule 04": 4000,
    },
    {
        "name": "Région 03",
        "Véhicule 01": 4000,
        "Véhicule 02": 2400,
        "Véhicule 03" : 3500,
        "Véhicule 04": 4000,
    },
    {
        "name": "Région 04",
        "Véhicule 01": 4000,
        "Véhicule 02": 2400,
        "Véhicule 03" : 3500,
        "Véhicule 04": 4000,
    },
    {
        "name": "Région 05",
        "Véhicule 01": 4000,
        "Véhicule 02": 2400,
        "Véhicule 03" : 3500,
        "Véhicule 04": 4000,
    },
    {
        "name": "Région 06",
        "Véhicule 01": 4000,
        "Véhicule 02": 2400,
        "Véhicule 03" : 3500,
        "Véhicule 04": 4000,
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