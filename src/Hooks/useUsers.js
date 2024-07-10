import { useState } from 'react';
import urls from '../../urls'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useAlerts } from './useAlerts';

export const useUsers = () => {
    const [basicAlert] = useAlerts();
    const [users, setUsers] = useState("");

    function getBasicUsers()
    {
        axios.get(`${urls.urlUsers}/GetBasicUsers`)
        .then(function (response) {                
          if(response.data)
          {
            setUsers(response.data);            
          }          
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    function activeBasicUser(id, loged, userName)
    {
      let title = "Desactivar Usuario";
        
      if(title == false)
      {
          title = "Activar Usuario";
      }

      Swal.fire({
        title: `${title} ${userName}`,      
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "green",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red"
        }).then((result) => {
          if (result.isConfirmed)
          {
            axios.patch(`${urls.urlUsers}/ActivateBasicUser/${id}/${loged}`)
            .then(function (response) {                
            if(response.data)
            {
              getBasicUsers();    
              basicAlert("Usario Modificado", userName, "success");
              }          
            })
            .catch(function (error) {
              console.log(error);
            })
          }
      });         
    }

    function closeSessionBasicUser(id, loged, userName)
    {
      if(loged == true)
      {
        let title = "Desactivar Usuario";
        
        if(title == false)
        {
            title = "Activar Usuario";
        }

        Swal.fire({
          title: `${title} ${userName}`,      
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          confirmButtonColor: "green",
          cancelButtonText: "Cancelar",
          cancelButtonColor: "red"
          }).then((result) => {
            if (result.isConfirmed)
            {              
              axios.patch(`${urls.urlUsers}/CloseSessionBasicUser/${id}`)
              .then(function (response) {                
                if(response.data)
                {   
                  getBasicUsers();            
                }          
              })
              .catch(function (error) {
                console.log(error);
              })
            }
        });         
      }
    }

    function createBasicUser(){
      Swal.fire({
        showCancelButton: true,
        title: "Crear Usuario",
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
          axios.post(`${urls.urlUsers}/CreateBasicUser`, {id:0,userName:result.value,password:"",type:""})
          .then(function (response) {                
            if(response.data)
            {
              basicAlert(response.data.title,response.data.text,response.icon);            
              getBasicUsers();            
            }          
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      });   
    }

    function renameBasicUser(id, userName){
      Swal.fire({
        showCancelButton: true,
        title: `Renombrar Usuario ${userName}`,
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
          axios.patch(`${urls.urlUsers}/RenameBasicUser/${id}/${result.value}`)
          .then(function (response) {                
            if(response.data)
            {
              basicAlert(response.data.title,response.data.text,response.icon);            
              getBasicUsers();            
            }          
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      });   
    }

    function deleteBasicUser(id, userName){
      Swal.fire({
        showCancelButton: true,
        title: `Eliminar Usuario ${userName}`,        
        confirmButtonText: "Aceptar",
        confirmButtonColor: "green",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red"        
      }).then((result) => {
        if (result.isConfirmed)
        {              
          axios.delete(`${urls.urlUsers}/DeleteBasicUser/${id}`)
          .then(function (response) {                
            if(response.data)
            {
              basicAlert(response.data.title,response.data.text,response.icon);            
              getBasicUsers();            
            }          
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      });   
    }

    return [users, getBasicUsers, activeBasicUser, closeSessionBasicUser, createBasicUser, renameBasicUser, deleteBasicUser]
}
export default useUsers;