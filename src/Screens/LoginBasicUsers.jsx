
import { useSession } from '../Hooks/useSession';
import React, { useEffect } from 'react';
import useLoginBasicUsers from '../Hooks/useLoginBasicUsers'

export const LoginBasicUsers = () => {
    const [checkCookiesAndLocal] = useSession();
    const [userName, handleUserName, checkLoginBasicUsers] = useLoginBasicUsers();
    
    useEffect(() => {
        checkCookiesAndLocal();
    },[])

  return (
    <React.Fragment>

      <div className="card">      
        <div className="card-header">
            <h5 className="card-title">Iniciar Sesión</h5>
        </div>
       
       <div className='card-body'>
        
        <div>
            <div className="mb-3">              

                <label className="form-label">Nombre de Usuario</label>
                <input type="username" className="form-control" aria-describedby="emailHelp" onChange={handleUserName}/>

                <br/>

                <button className="btn btn-primary" onClick={() => checkLoginBasicUsers(userName)}>Enviar</button>
            
            </div>
                 
        </div>

       </div>

      </div>

    </React.Fragment>
  )
}
export default LoginBasicUsers;