using Microsoft.AspNetCore.Mvc;
using backOpenDoors.Context;
using backOpenDoors.Models;

namespace backOpenDoors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoorsController : Controller
    {
        private readonly AppDbContext _context;
        public DoorsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: GetDoors
        [HttpGet("GetDoors")]
        public ActionResult<List<Door>> GetDoors()
        {
            try
            {
                var doors = _context.Doors.ToList();                
                return doors;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: GetDoor/id
        [HttpGet("GetDoor/{id}")]
        public ActionResult<Door> GetDoor(int id)
        {
            try
            {
                var door = _context.Doors.Where(u => u.Id.Equals(id)).First();                
                return door;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: IoTDeviceCheckDoorActivation/id
        [HttpGet("IoTDeviceCheckDoorActivation/{id}")]
        public ActionResult<ResponseSa> IoTDeviceCheckDoorActivation(int id)
        {
            ResponseSa responseSa = new("0","","success");
            try
            {                
                var user = _context.Doors.Where(d => d.Id.Equals(id)).First();

                if(user != null)
                {                        
                    if(user.ActivationStatus == true)
                  
                        responseSa.Title = "1";                
                        responseSa.Text = "";                
                        responseSa.Icon = "success";
                        user.ActivationStatus = false;
                        _context.SaveChanges();       
                             
                    }                                     
                    
                    return responseSa;                                                        
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


        // PATCH: ActiveDoor/id
        [HttpPatch("ActiveDoor/{id}/{state}")]
        public ActionResult<Door> ActiveDoor(int id, bool state)
        {
            ResponseSa responseSa = new("Advertencia","El Porton es incorrecto","warning");
            try
            {                
                var door = _context.Doors.Where(d => d.Id.Equals(id)).First();

                if(door != null)
                {                          
                    if(state == true)
                    {
                        door.Active = false;
                        _context.SaveChanges();       
                    }           
                    else 
                    {
                        door.Active = true;
                        _context.SaveChanges();       
                    }    
                    return Ok(door);            
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

        // PATCH: DoorActivation/id
        [HttpPatch("DoorActivation/{id}")]
        public ActionResult<Door> DoorActivation(int id)
        {
            ResponseSa responseSa = new("Advertencia","El Porton es incorrecto","warning");
            try
            {                
                var door = _context.Doors.Where(d => d.Id.Equals(id)).First();

                if(door != null)
                {                        
                    if(door.Active == true)
                    {
                        DateTime dateTime = DateTime.Now;
                        door.ActivationStatus = true;                    
                        door.LastActivation = dateTime;
                        _context.SaveChanges();       
                    
                        return door;            
                    }
                    else
                    {
                        responseSa.Title = "Advertencia";
                        responseSa.Text = "El Porton no esta activo";
                        responseSa.Icon = "warning";
                        return Ok(responseSa);
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

            // PATCH: RenameDoor/id/state
        [HttpPatch("RenameDoor/{id}/{newDoorName}")]
        public ActionResult<ResponseSa> RenameDoor(int id, string newDoorName)
        {
            ResponseSa responseSa = new("Advertencia","El Porton es incorrecto","warning");
            try
            {                
                var door = _context.Doors.Where(u => u.Id.Equals(id)).First();
                var doorsList = GetDoors();                
                bool newUserNameDuplicated = false;

                if(door != null && doorsList.Value != null)
                {                          
                    foreach(Door userList in doorsList.Value)
                    {
                        if(userList.DoorName == newDoorName)
                        {
                            newUserNameDuplicated = true;                        
                            responseSa.Title = "Advertencia";
                            responseSa.Text = $"El nombre {door.DoorName} ya se encuentra en uso";
                            responseSa.Icon = "warning";
                            return responseSa;
                        }                        
                    }

                    if(newUserNameDuplicated == false)
                    {
                        responseSa.Title = "Porton Actualizado";
                        responseSa.Text = $"{door.DoorName} => {newDoorName}";
                        responseSa.Icon = "success";
                        door.DoorName = newDoorName;
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
    }
}