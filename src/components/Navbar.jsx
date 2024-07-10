import Cookies from "universal-cookie";
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPowerOff, faTableColumns, faUsers, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useSession } from "../Hooks/useSession";

export const Navbar = () => {
    const cookies = new Cookies();
    const [checkCookiesAndLocal, closeSession] = useSession();

    return (

    <React.Fragment>

        <div id='navbarTop'>

            {/*Button Menu*/}
                
                {cookies.get('type') == "Admin" &&
                    <div className="button-menu-wrapper" data-bs-toggle="dropdown">
                        <FontAwesomeIcon className="button-menu" icon={faBars} />
                    </div>
                }
            
                <div className="dropdown-menu">                    
                    <Link to={'/users'} className="dropdown-item" type="button">
                        <FontAwesomeIcon className="dropdown-user-icon" icon={faUsers}/>                                &nbsp; Usuarios
                    </Link>
                    <Link to={'/doors'} className="dropdown-item" type="button">
                        <FontAwesomeIcon className="dropdown-user-icon" icon={faDoorOpen}/>
                        &nbsp; Portones
                    </Link>
                </div>
            

            {/*Button Close*/
                cookies.get('id') != undefined &&

                <div className="button-close-wrapper" onClick={() => closeSession()}>
                    <FontAwesomeIcon className="button-close" icon={faPowerOff}/>
                </div>
            }
            
        </div>

        <div id="navbarBottom">
            <h4>OpenDoors</h4>
        </div>

    </React.Fragment>
  )
}
export default Navbar;