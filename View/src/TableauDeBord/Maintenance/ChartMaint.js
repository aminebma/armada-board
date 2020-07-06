import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Région 1', Maintenances: 40,
  },
  {
    name: 'Région 2', Maintenances: 30,
  },
  {
    name: 'Région 3', Maintenances: 20,
  },
  {
    name: 'Région 4', Maintenances: 28,
  },
  {
    name: 'Région 5', Maintenances: 19,
  },
  {
    name: 'Région 6', Maintenances: 24,
  },
];

export default class MaintPerDay extends PureComponent {

  render() {
    return (
      <BarChart
        width={750}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Maintenances" fill= "#26a69a" />
      </BarChart>
    );
  }
}