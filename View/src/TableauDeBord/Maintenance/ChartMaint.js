import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Région 1', Maintenances: 4000,
  },
  {
    name: 'Région 2', Maintenances: 3000,
  },
  {
    name: 'Région 3', Maintenances: 2000,
  },
  {
    name: 'Région 4', Maintenances: 2780,
  },
  {
    name: 'Région 5', Maintenances: 1890,
  },
  {
    name: 'Région 6', Maintenances: 2390,
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