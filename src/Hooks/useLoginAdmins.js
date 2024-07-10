import Cookies from "universal-cookie";
import {useState} from 'react';
import urls from '../../urls'
import axios from 'axios';
import { useAlerts } from './useAlerts';
import { useNavigate } from 'react-router-dom';

export const useLoginAdmins = () => {
    const cookies = new Cookies();
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [basicAlert] = useAlerts();
    const history = useNavigate(); 
  
    function handleUserName(e) {
      setuserName(e.target.value);
    }
  
    function handlePassword(e) {
      setPassword(e.target.value);
    }
  
    function  checkLoginAdmins(u,p) {
      if(u != "" && p != "")
      {
        axios.get(`${urls.urlUsers}/LoginAdmins/${u}/${p}`)
        .then(function (response) {                
          if(response.data.userName)
          {
            cookies.set('id', response.data.id, { path: '/' });
            cookies.set('userName', response.data.userName, { path: '/' });
            cookies.set('type', response.data.type, { path: '/' });

            basicAlert("Bienvenido",response.data.userName,"success");
            history("/users");
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
        basicAlert("Advertencia","La campos no estan completados","warning"); 
      }
    }
  
    return [userName, password, handleUserName, handlePassword, checkLoginAdmins]
}
export default useLoginAdmins;