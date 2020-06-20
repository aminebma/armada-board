import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function TableMaint() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'ID',
        field: 'id',
        width: 100,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Effectuée',
        field: 'effectuee',
        width: 150,
      },
      {
        label: 'Date Attribution',
        field: 'dateAttrinution',
        width: 200,
      },
      {
        label: 'Date Réalisation',
        field: 'dateRealisation',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Niveau',
        field: 'niveau',
        sort: 'disabled',
        width: 100,
      },
    ],
    rows: [
      
    ],
  });
  const [checkbox1, setCheckbox1] = React.useState('');

  const showLogs2 = (e) => {
    setCheckbox1(e);
  };

  return (
    <div>
      <MDBDataTableV5
        hover
        entriesOptions={[5, 10, 15]}
        entries={5}
        pagesAmount={4}
        data={datatable}
        checkbox
        headCheckboxID='id2'
        bodyCheckboxID='checkboxes2'
        getValueCheckBox={(e) => {
          showLogs2(e);
        }}
      />
    </div>
  );
}