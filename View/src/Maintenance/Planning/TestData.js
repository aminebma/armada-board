import React, { Component } from 'react'
import { render } from 'react-dom'

class TestDeMerde extends Component {

  constructor(props) {
    super(props);
    this.state = {
      test: null,
    }
    this.getData = this.getData.bind(this)
  }



  componentWillMount() {
    this.getData();
  }

  async getData() {
    // http request first method

    // create a new XMLHttpRequest

    const xhr = new XMLHttpRequest();

    // get a callback when the server responds

    xhr.addEventListener('load', () => {
      // update the state of the component with the result here

      this.setState({ test: JSON.parse(xhr.responseText) })

    });

    // open the request with the verb and the url

    xhr.open('GET', 'http://localhost:3001/api/maintenances/planning/all/1', false)

    // send the request

    xhr.send();

  }

  render() {
    return (
      <div>
        <p>Ton resultat de merde: {this.state.test[3].type}</p>
      </div>
    )
  }
}
export { TestDeMerde };



export const MaintenanceData = [
  {
    title: 'Changement plaquette de frein',
    startDate: new Date(2020, 5, 25, 9, 35),
    endDate: new Date(2020, 5, 25, 13, 30),
    id: 0,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 5,
    echelon_maintenance: 3,
    Besoin: 'Plaquette de freins neuf',
  }, {
    title: 'Changement de pneu',
    startDate: new Date(2020, 5, 25, 12, 11),
    endDate: new Date(2020, 5, 25, 16, 0),
    id: 1,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'pneus neuf'
  }, {
    title: 'Remplacement des bougies',
    startDate: new Date(2020, 5, 25, 14, 30),
    endDate: new Date(2020, 5, 25, 18, 35),
    id: 2,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'bougie neuf'
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 26, 10, 0),
    endDate: new Date(2020, 5, 26, 14, 0),
    id: 3,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 5,
    echelon_maintenance: 1,
    Besoin: 'Aucune'
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 26, 15, 0),
    endDate: new Date(2020, 5, 26, 19, 35),
    id: 4,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 26, 14, 30),
    endDate: new Date(2020, 5, 26, 15, 45),
    id: 5,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 27, 9, 45),
    endDate: new Date(2020, 5, 27, 11, 15),
    id: 6,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 27, 12, 0),
    endDate: new Date(2020, 5, 27, 14, 0),
    id: 7,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 27, 15, 15),
    endDate: new Date(2020, 5, 27, 16, 30),
    id: 8,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 28, 11, 0),
    endDate: new Date(2020, 5, 28, 12, 0),
    id: 9,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 28, 11, 0),
    endDate: new Date(2020, 5, 28, 13, 30),
    id: 10,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 28, 14, 0),
    endDate: new Date(2020, 5, 28, 15, 30),
    id: 11,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Create Icons for Website',
    startDate: new Date(2020, 5, 29, 10, 0),
    endDate: new Date(2020, 5, 29, 11, 30),
    id: 12,
    location: 'Room 2',
  }, {
    title: 'Controle technique',
    startDate: new Date(2020, 5, 29, 14, 30),
    endDate: new Date(2020, 5, 29, 16, 0),
    id: 13,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Submit New Website Design',
    startDate: new Date(2020, 5, 29, 16, 30),
    endDate: new Date(2020, 5, 29, 18, 0),
    id: 14,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Launch New Website',
    startDate: new Date(2020, 5, 29, 12, 20),
    endDate: new Date(2020, 5, 29, 14, 0),
    id: 15,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Website Re-Design Plan',
    startDate: new Date(2020, 6, 2, 9, 30),
    endDate: new Date(2020, 6, 2, 15, 30),
    id: 16,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2020, 6, 2, 12, 0),
    endDate: new Date(2020, 6, 2, 13, 0),
    id: 17,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2020, 6, 2, 14, 30),
    endDate: new Date(2020, 6, 2, 17, 30),
    id: 18,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2020, 6, 2, 16, 0),
    endDate: new Date(2020, 6, 3, 9, 0),
    id: 19,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Final Budget Review',
    startDate: new Date(2020, 6, 3, 10, 15),
    endDate: new Date(2020, 6, 3, 13, 35),
    id: 20,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'New Brochures',
    startDate: new Date(2020, 6, 3, 14, 30),
    endDate: new Date(2020, 6, 3, 15, 45),
    id: 21,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Install New Database',
    startDate: new Date(2020, 6, 3, 15, 45),
    endDate: new Date(2020, 6, 4, 12, 15),
    id: 22,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2020, 6, 4, 12, 35),
    endDate: new Date(2020, 6, 4, 14, 15),
    id: 23,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2020, 6, 4, 15, 15),
    endDate: new Date(2020, 6, 4, 20, 30),
    id: 24,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Customer Workshop',
    startDate: new Date(2020, 6, 5, 6, 0),
    endDate: new Date(2020, 6, 5, 14, 20),
    id: 25,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Customer Workshop',
    startDate: new Date(2020, 6, 5, 14, 35),
    endDate: new Date(2020, 6, 5, 16, 20),
    id: 26,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Customer Workshop 2',
    startDate: new Date(2020, 6, 5, 10, 0),
    endDate: new Date(2020, 6, 5, 11, 20),
    id: 27,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2020, 6, 5, 20, 0),
    endDate: new Date(2020, 6, 6, 13, 30),
    id: 28,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Brochure Design Review',
    startDate: new Date(2020, 6, 6, 14, 10),
    endDate: new Date(2020, 6, 6, 15, 30),
    id: 29,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Create Icons for Website',
    startDate: new Date(2020, 6, 6, 10, 0),
    endDate: new Date(2020, 6, 7, 14, 30),
    id: 30,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Upgrade Server Hardware',
    startDate: new Date(2020, 6, 3, 9, 30),
    endDate: new Date(2020, 6, 3, 12, 25),
    id: 31,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Submit New Website Design',
    startDate: new Date(2020, 6, 3, 12, 30),
    endDate: new Date(2020, 6, 3, 18, 0),
    id: 32,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Launch New Website',
    startDate: new Date(2020, 6, 3, 12, 20),
    endDate: new Date(2020, 6, 3, 14, 10),
    id: 33,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2020, 5, 26, 0, 0),
    endDate: new Date(2020, 5, 27, 0, 0),
    id: 34,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Customer Workshop',
    startDate: new Date(2020, 5, 29, 10, 0),
    endDate: new Date(2020, 5, 30, 14, 30),
    id: 35,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Google AdWords Strategy',
    startDate: new Date(2020, 6, 3, 0, 0),
    endDate: new Date(2020, 6, 4, 10, 30),
    id: 36,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Rollout of New Website and Marketing Brochures',
    startDate: new Date(2020, 6, 5, 10, 0),
    endDate: new Date(2020, 6, 9, 14, 30),
    id: 37,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Update NDA Agreement',
    startDate: new Date(2020, 6, 1, 10, 0),
    endDate: new Date(2020, 6, 3, 14, 30),
    id: 38,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  }, {
    title: 'Customer Workshop',
    startDate: new Date(2020, 6, 1),
    endDate: new Date(2020, 6, 2),
    allDay: true,
    id: 39,
    véhicule: 'No chassis :78-FR-5F-DE-DE-VF-85-7E',
    modèle: 'mercedes-class B',
    Niveau_maintenance: 2,
    echelon_maintenance: 1,
    Besoin: 'Plaquette de freins neuf'
  },
];