import { useSession } from '../Hooks/useSession';
import React, {useEffect}  from "react";
import DataTable from "react-data-table-component";
import useDoors from "../Hooks/useDoors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';

export const Doors = () => {    
    const [checkCookiesAndLocal] = useSession(); 
    const [door, getDoor, doorActivation, activeDoor, renameDoor, getDoors, doors] = useDoors();

    useEffect(() => {
      checkCookiesAndLocal();
      getDoors();
  },[])

    const columns = [
      {
          name: "Nombre",
          selector: (row) => row.doorName,
          sortable: true,
      },
      {
          name: "Estado",
          cell: (row) =>                            
              <button className={row.active == true ? "btn btn-success" : "btn btn-danger"} onClick={() => activeDoor(row.id, row.active, row.doorName)}>
                  {row.active == true ? <FontAwesomeIcon icon={faToggleOn}/> : <FontAwesomeIcon icon={faToggleOff}/>}
              </button>,
          sortable: true,
      },              
      {
          name: "Dirección",
          cell: (row) =>
              <p>
                {`${row.street} ${row.district}, ${row.city} ${row.country}, ${row.postalCode}`}  
              </p>,
          sortable: true,
      },    
      {
          name: "Renombrar",
          cell: (row) =>
              <div className="btn btn-primary" onClick={() => renameDoor(row.id, row.doorName)}>
                  <FontAwesomeIcon icon={faEdit}/>
              </div>,
          sortable: true,
      },    
  ];

    return (
        <React.Fragment>
        
        <div className="row">

            {/*<div className="col-9 col-lg-11">
                <input type="search" className="form-control" placeholder="Buscar porton..." aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            
            <div id="btnAdd" className="col-3 col-lg-1">
                <button type="button" className="btn btn-primary">Agregar</button>
            </div>*/}

        </div>

        <br />

        <div className="card">

            <div className="card-header">
                <h5 className="card-title">Portones</h5>
            </div>

            <div className="container">
                <DataTable columns={columns} data={doors} />
            </div>

        </div>

    </React.Fragment>
    )
}
export default Doors;