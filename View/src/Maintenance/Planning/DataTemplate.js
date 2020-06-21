import React from 'react';
import { MaintenanceData } from './TestData';
import Query from 'devextreme/data/query';
import './Planning.css';


function getMaintenanceById(id) {
    return Query(MaintenanceData).filter(['id', id]).toArray()[0];
  }

  
export default function DataTemplate(model) {

    const UneMaintenance = getMaintenanceById(model.id) || {};
    return (
      <div className="maintenance-preview">
        <div> {UneMaintenance.title}</div>
        <div>
          véhicule: <strong>${ UneMaintenance.véhicule}</strong>
        </div>
        <div>
          Modèle: <strong>${ model.modèle}</strong>
        </div>
        <div>
          Niveau de Maintenance: <strong>${ model.Niveau_Maintenance}</strong>
        </div>
        <div>
          échelon de Maintenance: <strong>${ model.echelon_maintenance}</strong>
        </div>
        <div>
          Besoin: <strong>${ model.besoin}</strong>
        </div>
        <div>
          <strong>${ model.startDate}</strong>
        </div>
        <div>
          <strong>${ model.endDate}</strong>
        </div>
      </div>
    );
  }