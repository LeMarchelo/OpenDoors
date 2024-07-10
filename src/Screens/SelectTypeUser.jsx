import { useSession } from '../Hooks/useSession';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export const SelectTypeUser = () => {
    const [checkCookiesAndLocal] = useSession();

    useEffect(() => {
        checkCookiesAndLocal();
    },[])

    return (

        <React.Fragment>

        <h3>Seleccionar Tipo de Usuario</h3> 

        <br/>  

        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Administrador</h5>
            </div>
        
            <div className='card-body'>        
                <form>
                    <br/>  
                    <div className="mb-3">                                  
                        <Link id="btnDoor" to="/LoginAdmins" type="button" className="btn btn-primary btn-lg  btn-block">Seleccionar</Link>                       
                    </div>          
                </form>
            </div>
        </div>

        <br/>

        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Básico</h5>
            </div>        
            <div className='card-body'>            
                <form>
                    <br/>  
                    <div className="mb-3">              
                        <Link id="btnDoor" to="/LoginBasicUsers" type="button" className="btn btn-warning btn-lg  btn-block">Seleccionar</Link>
                    </div>
                </form>
            </div>

        </div>

        </React.Fragment>
    )
}
export default SelectTypeUser;