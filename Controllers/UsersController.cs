using Microsoft.AspNetCore.Mvc;
using backOpenDoors.Context;
using backOpenDoors.Models;

namespace backOpenDoors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: GetBasicUsers
        [HttpGet("GetBasicUsers")]
        public  ActionResult<List<User>> GetBasicUsers()
        {
            try
            {
                var users = _context.Users.Where(u => u.Type.Equals("Basic")).ToList();                
                return users;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: GetUser/id
        [HttpGet("GetUser/{id}")]
        public ActionResult<User> GetUser(int id)
        {
            try
            {
                var user = _context.Users.Where(u => u.Id.Equals(id)).First();                
                return user;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
                
        // GET: LoginAdmins/userName/password
        [HttpGet("LoginAdmins/{userName}/{password}")]
        public ActionResult<User> LoginAdmins(string userName, string password)
        {
            ResponseSa responseSa = new("Advertencia","El nombre de usuario o contraseña son incorrectos","warning");
            try
            {                
                var user = _context.Users.Where(u => u.UserName.Equals(userName) & u.Password.Equals(password)).First();

                if(user != null)
                {
                    return Ok(user);
                }
                else
                {
                    return Ok(responseSa);
                }
            }
            catch (Exception ex)
            {                
                if(ex.Message == "Sequence contains no elements")
                {
                    return Ok(responseSa);
                }
                else{
                    return BadRequest(ex.Message);
                }                
            }
        }

        // GET: LoginBasicUsers/userName
        [HttpGet("LoginBasicUsers/{userName}")]
        public ActionResult<User> LoginBasicUsers(string userName)
        {
            ResponseSa responseSa = new("Advertencia","El nombre de usuario es incorrectos","warning");
            try
            {                
                var user = _context.Users.Where(u => u.UserName.Equals(userName)).First();

                if(user != null)
                {
                    if(user.Loged == true || user.Active == false)
                    {
                        responseSa.Text = "Cierre sesión en su otro dispostivo o contacte a su administrador";
                        return Ok(responseSa);
                    }
                    else
                    {                 
                        user.Loged = true;
                        _context.SaveChanges();       
                        return Ok(user);
                    }
                }
                else
                {
                    return Ok(responseSa);
                }
            }
            catch (Exception ex)
            {                
                if(ex.Message == "Sequence contains no elements")
                {
                    return Ok(responseSa);
                }
                else{
                    return BadRequest(ex.Message);
                }                
            }
        }


        // POST: CreateBasicUser
        [HttpPost("CreateBasicUser")]
        public ActionResult<ResponseSa> CreateBasicUser(User newUser)  
        {
            try
            {  
                ResponseSa responseSa = new("","Error","");
                var usersList = GetBasicUsers();                
                bool newUserNameDuplicated = false;

                if(usersList.Value != null)
                {
                    foreach(User userList in usersList.Value)
                    {
                        if(userList.UserName == newUser.UserName)
                        {
                            newUserNameDuplicated = true;                        
                            responseSa.Title = "Advertencia";
                            responseSa.Text = $"El nombre de usuario {newUser.UserName} ya se encuentra en uso";
                            responseSa.Icon = "warning";
                            return responseSa;
                        }                        
                    }

                    if(newUserNameDuplicated == false)
                    {
                        newUser.Password = "";
                        newUser.Active = true;
                        newUser.Type = "Basic";
                        newUser.PwReset = false;
                        newUser.Loged = false;
                        _context.Users.Add(newUser);
                        _context.SaveChanges();
                                   
                        responseSa.Title = "Usuario Creado";
                        responseSa.Text = newUser.UserName;
                        responseSa.Icon = "success";                        
                    }
                }                            
                return responseSa;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // PATCH: CloseSessionBasicUsers/id
        [HttpPatch("CloseSessionBasicUser/{id}")]
        public ActionResult<User> CloseSessionBasicUsers(int id)
        {
            ResponseSa responseSa = new("Advertencia","El usuario es incorrectos","warning");
            try
            {                
                var user = _context.Users.Where(u => u.Id.Equals(id)).First();

                if(user != null)
                {                          
                    user.Loged = false;
                    _context.SaveChanges();       
                    return Ok(user);            
                }
                else
                {
                    return Ok(responseSa);
                }
            }
            catch (Exception ex)
            {                
                if(ex.Message == "Sequence contains no elements")
                {
                    return Ok(responseSa);
                }
                else{
                    return BadRequest(ex.Message);
                }                
            }
        }

        // PATCH: ActivateBasicUser/id/state
        [HttpPatch("ActivateBasicUser/{id}/{state}")]
        public ActionResult<User> ActivateBasicUser(int id, bool state)
        {
            ResponseSa responseSa = new("Advertencia","El usuario es incorrecto","warning");
            try
            {                
                var user = _context.Users.Where(u => u.Id.Equals(id)).First();

                if(user != null)
                {               
                    if(state == true)
                    {
                        user.Active = false;
                        user.Loged = false;
                        _context.SaveChanges();       
                    }           
                    else 
                    {
                        user.Active = true;
                        _context.SaveChanges();       
                    }
                    return Ok(user);            
                }
                else
                {
                    return Ok(responseSa);
                }
            }
            catch (Exception ex)
            {                
                if(ex.Message == "Sequence contains no elements")
                {
                    return Ok(responseSa);
                }
                else{
                    return BadRequest(ex.Message);
                }                
            }
        }
        
        // PATCH: RenameBasicUser/id/state
        [HttpPatch("RenameBasicUser/{id}/{newUserName}")]
        public ActionResult<ResponseSa> RenameBasicUser(int id, string newUserName)
        {
            ResponseSa responseSa = new("Advertencia","El usuario es incorrecto","warning");
            try
            {                
                var user = _context.Users.Where(u => u.Id.Equals(id)).First();
                var usersList = GetBasicUsers();                
                bool newUserNameDuplicated = false;

                if(user != null && usersList.Value != null)
                {                          
                    foreach(User userList in usersList.Value)
                    {
                        if(userList.UserName == newUserName)
                        {
                            newUserNameDuplicated = true;                        
                            responseSa.Title = "Advertencia";
                            responseSa.Text = $"El nombre de usuario {user.UserName} ya se encuentra en uso";
                            responseSa.Icon = "warning";
                            return responseSa;
                        }                        
                    }

                    if(newUserNameDuplicated == false)
                    {
                        responseSa.Title = "Usuario Actualizado";
                        responseSa.Text = $"{user.UserName} => {newUserName}";
                        responseSa.Icon = "success";
                        user.UserName = newUserName;
                        _context.SaveChanges();                          
                    }                                      
                    return responseSa;                       
                }
                else
                {
                    return responseSa;
                }
            }
            catch (Exception ex)
            {                
                if(ex.Message == "Sequence contains no elements")
                {
                    return responseSa;
                }
                else{
                    return BadRequest(ex.Message);
                }                
            }
        }
        
        
        // DELETE: DeleteBasicUser/id/state
        [HttpDelete("DeleteBasicUser/{id}")]
        public ActionResult<ResponseSa> RenameBasicUser(int id)
        {
            ResponseSa responseSa = new("Advertencia","El usuario es incorrecto","warning");
            try
            {                
                var user = _context.Users.Where(u => u.Id.Equals(id)).First();
    
                if(user != null )
                {                                             
                    responseSa.Title = "Usuario Eliminado";
                    responseSa.Text = $"{user.UserName}";
                    responseSa.Icon = "success";                    
                    _context.Remove(user);                          
                    _context.SaveChanges();                                                                                   
                    return responseSa;                       
                }
                else
                {
                    return responseSa;
                }
            }
            catch (Exception ex)
            {                
                if(ex.Message == "Sequence contains no elements")
                {
                    return responseSa;
                }
                else{
                    return BadRequest(ex.Message);
                }                
            }
        }
    }
}