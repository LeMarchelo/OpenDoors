import Cookies from "universal-cookie";
import { useSession } from '../Hooks/useSession';
import React, { useEffect } from 'react';
import { useDoors } from "../Hooks/useDoors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';

export const Dashboard = () => {
    const cookies = new Cookies();
    const [checkCookiesAndLocal] = useSession();    
    const [door, getDoor, doorActivation] = useDoors();    
    const lastActivationConvert = new Date(door.lastActivation);    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    useEffect(() => {
        checkCookiesAndLocal();        
        setInterval(() => getDoor(), 2000);        
    },[])

    return (
    <React.Fragment>   

        <h3>Buen día {cookies.get('userName')}</h3> 

        <br/>  

        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Apertura:</h5>
            </div>

            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Estado: &nbsp;
                    <div className={door.activationStatus == true ? "btn btn-success" : "btn btn-warning"}>
                        {door.activationStatus == true ? <FontAwesomeIcon icon={faToggleOn}/> : <FontAwesomeIcon icon={faToggleOff}/>}
                    </div>
                </h6>
                <button id="btnDoor" type="button" disabled={door.active == false || door.activationStatus == true ? true : false} className="btn btn-primary btn-lg  btn-block" onClick={() => doorActivation(door.id, door.active)}>Activar</button>
            </div>
        </div>

        <br/>

        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Estatus:</h5>                
            </div>

            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Porton: {door.doorName}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Estado: &nbsp;
                    <div className={door.active == true ? "btn btn-success" : "btn btn-danger"}>
                        {door.active == true ? <FontAwesomeIcon icon={faToggleOn}/> : <FontAwesomeIcon icon={faToggleOff}/>}
                    </div>
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">Última activación: {lastActivationConvert.toLocaleDateString(undefined, options)}</h6>
            </div>
        </div>

    </React.Fragment>
  )
}
export default Dashboard;