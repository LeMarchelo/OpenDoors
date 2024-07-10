import Cookies from "universal-cookie";
import { useLocation, useNavigate } from 'react-router-dom';
import urls from '../../urls'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useAlerts } from './useAlerts';

export const useSession = () => {
    const cookies = new Cookies();
    const history = useNavigate();
    const location = useLocation();
    const [basicAlert] = useAlerts();

    function checkCookiesAndLocal()
    {        
        const localId = localStorage.getItem("id");
        const localUserName = localStorage.getItem("userName");
        const localType = localStorage.getItem("type");

        if(localId != null)
        {   
            axios.get(`${urls.urlUsers}/GetUser/${localId}`)
            .then(function (response) {                
                if(response.data)
                {   
                    if(response.data.active == true && response.data.loged == true)
                    {
                        cookies.set('id', localId, { path: '/' });
                        cookies.set('userName', localUserName, { path: '/' });
                        cookies.set('type', localType, { path: '/' });
                        history("/dashboard");
                    }
                    else if(response.data.active == false || (response.data.active == true && response.data.loged == false)) {
                        cookies.remove('id', { path: '/' });
                        cookies.remove('userName', { path: '/' });
                        cookies.remove('type', { path: '/' });
                        localStorage.removeItem("id");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("type");
                        history("/SelectTypeUser"); 
                    }
                }          
            })
            .catch(function (error) {
                console.log(error);
            })                     
        }
        else
        {            
            if(cookies.get('id') != undefined && cookies.get('type') == "Admin")
            {                
                if(location.pathname != "/users" && location.pathname != "/doors")
                {
                    history("/users");
                }              
            }      
            else if(cookies.get('id') == undefined && location.pathname != "/SelectTypeUser" && location.pathname != "/LoginAdmins" && location.pathname != "/LoginBasicUsers")
            {   
                history("/SelectTypeUser");
            }             
        }
    }

    function closeSession()
    {
        const localId = localStorage.getItem("id");

        Swal.fire({
            title: "¿Cerrar Sesión?",      
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "green",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red"
        }).then((result) => {
            if (result.isConfirmed) {
                if(cookies.get('type') == "Admin")
                {
                    cookies.remove('id', { path: '/' });
                    cookies.remove('userName', { path: '/' });
                    cookies.remove('type', { path: '/' });
                    basicAlert("Sesión Cerrada","","success");
                }
                else if(cookies.get('type') == "Basic")
                {
                    axios.patch(`${urls.urlUsers}/CloseSessionBasicUser/${localId}`)
                    .then(function (response) {                                       
                        cookies.remove('id', { path: '/' });
                        cookies.remove('userName', { path: '/' });
                        cookies.remove('type', { path: '/' });
                        localStorage.removeItem("id");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("type");
                        basicAlert("Sesión Cerrada","","success");    
                        history("/SelectTypeUser"); 
                    })
                    .catch(function (error) {
                        console.log(error);
                    })                                                       
                }
                history("/SelectTypeUser");
                basicAlert("Sesión Cerrada","","success");
            }
          });        
    } 
    
    return [checkCookiesAndLocal, closeSession]
}
export default useSession;