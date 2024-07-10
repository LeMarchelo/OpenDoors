import {useState} from 'react';
import urls from '../../urls'
import axios from 'axios';
import Cookies from "universal-cookie";
import { useAlerts } from './useAlerts';
import { useNavigate } from 'react-router-dom';

export const useLoginBasicUsers = () => {
    const [userName, setuserName] = useState("");    
    const cookies = new Cookies();
    const [basicAlert] = useAlerts();
    const history = useNavigate(); 
  
    function handleUserName(e) {
      setuserName(e.target.value);
    }
  
    function  checkLoginBasicUsers(u) {
      if(u != "")
      {
        axios.get(`${urls.urlUsers}/LoginBasicUsers/${u}`)
        .then(function (response) {                
          if(response.data.userName)
          {
            cookies.set('id', response.data.id, { path: '/' });
            cookies.set('userName', response.data.userName, { path: '/' });
            cookies.set('type', response.data.type, { path: '/' });

            localStorage.setItem("id", response.data.id);
            localStorage.setItem("userName", response.data.userName);
            localStorage.setItem("type", response.data.type);

            basicAlert("Bienvenido",response.data.userName,"success");
            history("/dashboard");            
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
      else
      {
        basicAlert("Advertencia","No se ha escrito el Nombre de Usuario","warning"); 
      }
    }
  
    return [userName, handleUserName, checkLoginBasicUsers]
}
export default useLoginBasicUsers;