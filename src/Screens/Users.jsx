import { useSession } from '../Hooks/useSession';
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useUsers } from "../Hooks/useUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faMinusCircle, faSpinner, faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';

export const Users = () => {    
    const [checkCookiesAndLocal] = useSession(); 
    const [users, getBasicUsers, activeBasicUser, closeSessionBasicUser, createBasicUser, renameBasicUser, deleteBasicUser] = useUsers(); 

    useEffect(() => {
        checkCookiesAndLocal();
        getBasicUsers();
    },[])

    const columns = [
        {
            name: "Nombre",
            selector: (row) => row.userName,
            sortable: true,
        },
        {
            name: "Estado",
            cell: (row) =>                            
                <button className={row.active == true ? "btn btn-success" : "btn btn-danger"} onClick={() => activeBasicUser(row.id, row.active, row.userName)}>
                    {row.active == true ? <FontAwesomeIcon icon={faToggleOn}/> : <FontAwesomeIcon icon={faToggleOff}/>}
                </button>,
            sortable: true,
        },              
        {
            name: "Sesión",
            cell: (row) =>
                <div className={row.loged == true ? "btn btn-warning" : ""} onClick={() => closeSessionBasicUser(row.id, row.loged, row.userName)}>
                    {row.loged == true ? <FontAwesomeIcon icon={faSpinner}/> : "No Iniciada"}
                </div>,
            sortable: true,
        },    
        {
            name: "Renombrar",
            cell: (row) =>
                <div className="btn btn-primary" onClick={() => renameBasicUser(row.id, row.userName)}>
                    <FontAwesomeIcon icon={faEdit}/>
                </div>,
            sortable: true,
        },    
        {
            name: "Eliminar",
            cell: (row) =>
                <div className="btn btn-danger" onClick={() => deleteBasicUser(row.id, row.userName)}>
                    <FontAwesomeIcon icon={faMinusCircle}/>
                </div>,
            sortable: true,
        },    
    ];

    return (
        <React.Fragment>
        
        <div className="row">

            <div className="col-9 col-lg-11">
            <input type="search" className="form-control" placeholder="Buscar usuario..." aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            
            <div id="btnAdd" className="col-3 col-lg-1">
                <button type="button" className="btn btn-primary"   onClick={() => createBasicUser()}>Agregar</button>
            </div>

        </div>

        <br />

        <div className="card">

            <div className="card-header">
            <h5 className="card-title">Usuarios</h5>
            </div>

            <div className="container">
            <DataTable columns={columns} data={users}/>
            </div>

        </div>
        </React.Fragment>
    );
};
export default Users;