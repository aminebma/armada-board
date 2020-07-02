import React, { Component } from 'react';
import Maintenance_details from './Maintenance_details';
import MAJMaintenance from './MAJ_Maintenance/MAJ_Maintenance';
import Button from '@material-ui/core/Button';
import ExportPlanning from './Export_Planning/Export_Planning';
import './Maintenance.css';
import Planning from './Planning/Planning';


class Maintenance extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: null,
            AfficherMAJ: false,
            AfficherExport: false,
        }
        this.Show_Export_Planning = this.Show_Export_Planning.bind(this);
        this.Show_MAJ_Maintenance = this.Show_MAJ_Maintenance.bind(this);
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
                    <MAJMaintenance data={this.state.data} var={this.Show_MAJ_Maintenance} />
                </div> : null}
                {this.state.AfficherExport ? <div>
                    <ExportPlanning var={this.Show_Export_Planning} />
                </div> : null}
                <div className="Working-Page">
                        <div className="button-under-maintenance">
                            <Planning data={this.state.data}/>
                            <Button variant="contained" color="primary" onClick={() => this.Show_MAJ_Maintenance()}>Mise à jour du calendrier</Button>
                            <Button variant="contained" color="primary" onClick={() => this.Show_Export_Planning()}>exporter le planning</Button>
                        </div>
                </div >
            </div >
        )
    }
}

export default Maintenance;

