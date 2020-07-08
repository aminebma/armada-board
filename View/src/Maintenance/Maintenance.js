import React, { Component } from 'react';
import Maintenance_details from './Maintenance_details';
import MAJMaintenance from './MAJ_Maintenance/MAJ_Maintenance';
import Button from '@material-ui/core/Button';
import ExportPlanning from './Export_Planning/Export_Planning';
import './Maintenance.css';
import Planning from './Planning/Planning';


class Maintenance extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null, //les maintenance du plannings
            AfficherMAJ: false,
            AfficherExport: false,
        }
        this.Show_Export_Planning = this.Show_Export_Planning.bind(this);
        this.Show_MAJ_Maintenance = this.Show_MAJ_Maintenance.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
    }

    //fonction qui sera transmise au child pour pouvoir changer la variable data du state parent ( maintenance.js)
    onChangeData(newdata) {
        this.setState({ data: newdata })
        //window.location.reload(false)
        //alert(this.state.data[5].title)
    }

    // fonction par défaut qui s'éxécute lors de l'affichage de la page
    // elle exécutera la fonction getMaintenanceData qui ramènera les maintenances de la BDD
    componentWillMount() {
        this.getMaintenanceData();
    }

    //Fonction pour charger les maintenances de la BDD et les mettre dans la variable data du state
    getMaintenanceData() {
        // create a new XMLHttpRequest
        const xhr = new XMLHttpRequest();
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            this.setState({ data: JSON.parse(xhr.responseText) }) //MAJ de la variable data du state avec la réponse de la requette
        });
        // open the request with the verb and the url
        xhr.open('GET', `http://localhost:3001/api/maintenances/planning/all/${localStorage.getItem('affectation')}`, false)
        // send the request
        xhr.send();
    }

    Show_MAJ_Maintenance = () => {
        this.setState(prevState => {
            return ({ AfficherMAJ: !prevState.AfficherMAJ })
        })
    }

    Show_Export_Planning = () => {
        this.setState(prevState => {
            return ({ AfficherExport: !prevState.AfficherExport })
        })
    };

    render() {
        const donnee = this.state.data
        return (
            <div className="div-global">
                {this.state.AfficherMAJ ? <div>
                    <MAJMaintenance data={donnee} var={this.Show_MAJ_Maintenance} onChangeData={this.onChangeData} />
                </div> : null}
                {this.state.AfficherExport ? <div>
                    <ExportPlanning var={this.Show_Export_Planning} />
                </div> : null}
                <div>
                <Planning data={donnee} onChangeData={this.onChangeData}/>
                    <div className="button-under-maintenance">
                        <Button variant="contained" color="primary" onClick={() => this.Show_MAJ_Maintenance()}>Mise à jour du calendrier</Button>
                        <Button variant="contained" color="primary" onClick={() => this.Show_Export_Planning()}>exporter le planning</Button>
                    </div>
                </div >
            </div >
        )
    }
}

export default Maintenance;

