
import { useSession } from '../Hooks/useSession';
import React, { useEffect } from 'react';
import useLoginAdmins from '../Hooks/useLoginAdmins';

export const Login = () => {
  const [checkCookiesAndLocal] = useSession();
  const [userName, password, handleUserName, handlePassword, checkLoginAdmins] = useLoginAdmins();
  
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
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" onChange={handlePassword}/>
            </div>

            <button className="btn btn-primary" onClick={() => checkLoginAdmins(userName, password)}>Enviar</button>

            <br/>            
        </div>

       </div>

      </div>

    </React.Fragment>
  )
}
export default Login;