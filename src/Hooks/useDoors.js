import { useState } from 'react';

import Swal from 'sweetalert2'
import urls from '../../urls'
import axios from 'axios';
import { useAlerts } from './useAlerts';

export const useDoors = () => {
    const [basicAlert] = useAlerts();
    const [door, setDoor] = useState("");
    const [doors, setDoors] = useState("");

    function getDoor()
    {
      axios.get(`${urls.urlDoors}/GetDoor/1`)
      .then(function (response) {                
        if(response.data.doorName)
        {
          setDoor(response.data);            
        }          
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    function doorActivation(id, active)
    {
      if(active == true)
        {
          axios.patch(`${urls.urlDoors}/DoorActivation/${id}`)
          .then(function (response) {                
            if(response.data.doorName)
            {
              setDoor(response.data);     
              basicAlert("Porton Activado","","success")       
            }          
            else
            {          
              basicAlert(response.data.title,response.data.text,response.data.icon); 
              getDoor();
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        }
    }

    function activeDoor(id, state, doorName)
    {
      let title = "Desactivar Porton";
      let title2 = "Desactivado";
      
      if(state == false)
        {
          title = "Activar Porton";
          title2 = "Activado";
      }

      Swal.fire({
        title: `${title} ${doorName}`,      
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "green",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red"
        }).then((result) => {
          if (result.isConfirmed)
          {
            axios.patch(`${urls.urlDoors}/ActiveDoor/${id}/${state}`)
            .then(function (response) {                
              if(response.data.doorName)
              {
                setDoor(response.data);     
                getDoors();   
                
                basicAlert(`Porton ${title2}`, doorName, "success");
              }          
              else
              {          
                basicAlert(response.data.title,response.data.text,response.data.icon); 
              }
            })
            .catch(function (error) {
              console.log(error);
            })
          }
      });                 
    }

    function renameDoor(id, doorname)
    {
      Swal.fire({
        showCancelButton: true,
        title: `Renombrar Porton ${doorname}`,
        input: "text",
        inputLabel: "Escribe un nombre",
        inputValue: "",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "green",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red"        
      }).then((result) => {
        if (result.isConfirmed)
        {              
          axios.patch(`${urls.urlDoors}/RenameDoor/${id}/${result.value}`)
          .then(function (response) {                
            if(response.data)
            {
              basicAlert(response.data.title,response.data.text,response.icon);  
              getDoors();          
              getBasicUsers();            
            }          
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      });   
    }
    
    function getDoors()
    {
      axios.get(`${urls.urlDoors}/GetDoors`)
        .then(function (response) {                
          if(response.data)
          {
            setDoors(response.data);            
          }          
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    return [door, getDoor, doorActivation, activeDoor, renameDoor, getDoors, doors]
}
export default useDoors;