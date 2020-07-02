import React, { Component } from 'react';
import Maintenance_details from './Maintenance_details';
import MAJMaintenance from './MAJ_Maintenance/MAJ_Maintenance';
import Button from '@material-ui/core/Button';
import ExportPlanning from './Export_Planning/Export_Planning';
import './Maintenance.css';
import Planning from './Planning/Planning';


class Maintenance extends Component {

    state = {
        AfficherMAJ: false,
        AfficherExport: false,
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

    }

    render() {
        return (
            <div className="div-global">
                {this.state.AfficherMAJ ? <div>
                    <MAJMaintenance var={this.Show_MAJ_Maintenance} />
                </div> : null}
                {this.state.AfficherExport ? <div>
                    <ExportPlanning var={this.Show_Export_Planning} />
                </div> : null}
                <div className="Working-Page">
                        <div className="button-under-maintenance">
                            <Planning/>
                            <Button variant="contained" color="primary" onClick={() => this.Show_MAJ_Maintenance()}>Mise à jour du calendrier</Button>
                            <Button variant="contained" color="primary" onClick={() => this.Show_Export_Planning()}>exporter le planning</Button>
                        </div>
                </div >
            </div >
        )
    }
}

export default Maintenance;

