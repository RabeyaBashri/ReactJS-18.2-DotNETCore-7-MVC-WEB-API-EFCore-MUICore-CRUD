using EmployeeCRUDReactJSCoreMVCEF.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Data;
using System.Security.AccessControl;

namespace EmployeeCRUDReactJSCoreMVCEF.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoreAPIController : ControllerBase
    {
        private readonly EmployeeContext _context;
        public CoreAPIController(EmployeeContext context)
        {
            _context = context;
        }

        [HttpGet("GetDepartments")]
        public string GetDepartments()
        {
            string JSONString = String.Empty;

            try
            {
                List<Department> deptList = _context.Departments.ToList();

                if (deptList != null && deptList.Count > 0)
                {
                    JSONString = JsonConvert.SerializeObject(
                     new
                     {
                         returnStatus = "Success",
                         returnMsg = string.Empty,
                         data = JsonConvert.SerializeObject(deptList),
                     });
                }
                else
                {
                    JSONString = JsonConvert.SerializeObject(
                    new
                    {
                        returnStatus = "Fail",
                        returnMsg = "No data found. Please try again later.",
                        data = string.Empty,
                    });
                }
            }
            catch (Exception ex)
            {
                JSONString = JsonConvert.SerializeObject(
                new
                {
                    returnStatus = "Fail",
                    returnMsg = ex.Message,
                    data = string.Empty,
                });
            }
            return JSONString;
        }

        [HttpGet("GetEmployeesByDepartment/{departmentID}")]
        public string GetEmployeesByDepartment(long departmentID)
        {
            string JSONString = String.Empty;

            try
            {
                List<Employee> empList = _context.Employees.Where(x => x.DepartmentId == departmentID).ToList();

                if (empList != null && empList.Count > 0)
                {
                    JSONString = JsonConvert.SerializeObject(
                     new
                     {
                         returnStatus = "Success",
                         returnMsg = string.Empty,
                         data = JsonConvert.SerializeObject(empList),
                     });
                }
                else
                {
                    JSONString = JsonConvert.SerializeObject(
                    new
                    {
                        returnStatus = "Fail",
                        returnMsg = "No data found. Please try again later.",
                        data = string.Empty,
                    });
                }
            }
            catch (Exception ex)
            {
                JSONString = JsonConvert.SerializeObject(
                new
                {
                    returnStatus = "Fail",
                    returnMsg = ex.Message,
                    data = string.Empty,
                });
            }

            return JSONString;
        }
        [HttpPost("Create")]
        public string Create([FromBody]string jsonStringEmployeeObj)
        {
            string JSONString = String.Empty;
            try
            {
                if (!string.IsNullOrEmpty(jsonStringEmployeeObj))
                {
                    Employee? emp = Newtonsoft.Json.JsonConvert.DeserializeObject<Employee>(jsonStringEmployeeObj);
                    if (emp != null)
                    {
                        _context.Add(emp);
                        _context.SaveChanges();
                        JSONString = JsonConvert.SerializeObject(
                         new
                         {
                             returnStatus = "Success",
                             returnMsg = string.Empty,
                             data = JsonConvert.SerializeObject(emp),
                         });
                    }
                    else
                    {
                        JSONString = JsonConvert.SerializeObject(
                        new
                        {
                            returnStatus = "Fail",
                            returnMsg = "Data not saved. Please try again later.",
                            data = string.Empty,
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                JSONString = JsonConvert.SerializeObject(
                   new
                   {
                       returnStatus = "Fail",
                       returnMsg = ex.Message,
                       data = string.Empty,
                   });
            }
            return JSONString;
        }
        [HttpPut("Update/{emdID}")]
        public string Update(int emdID, [FromBody] string jsonStringEmployeeObj)
        {
            string JSONString = String.Empty;
            try
            {
                if (!string.IsNullOrEmpty(jsonStringEmployeeObj) && emdID != 0)
                {
                    Employee? emp = Newtonsoft.Json.JsonConvert.DeserializeObject<Employee>(jsonStringEmployeeObj);
                    if (emp != null && emp.Id == emdID)
                    {
                        //  _context.Update(emp);
                        _context.Employees.Add(emp);
                        _context.Entry(emp).State = EntityState.Modified;
                        _context.SaveChanges();

                        JSONString = JsonConvert.SerializeObject(
                         new
                         {
                             returnStatus = "Success",
                             returnMsg = string.Empty,
                             data = JsonConvert.SerializeObject(emp),
                         });
                    }
                    else
                    {
                        JSONString = JsonConvert.SerializeObject(
                        new
                        {
                            returnStatus = "Fail",
                            returnMsg = "Data not saved. Please try again later.",
                            data = string.Empty,
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                JSONString = JsonConvert.SerializeObject(
                   new
                   {
                       returnStatus = "Fail",
                       returnMsg = ex.Message,
                       data = string.Empty,
                   });
            }
            return JSONString;
        }

        [HttpDelete("Delete/{emdID}")]
        public string Delete(long emdID)
        {

            string JSONString = String.Empty;
            try
            {
                var emp = _context.Employees.Where(x=>x.Id == emdID).FirstOrDefault();
                _context.Employees.Remove(emp);
                _context.SaveChangesAsync();

                JSONString = JsonConvert.SerializeObject(
                         new
                         {
                             returnStatus = "Success",
                             returnMsg = string.Empty
                         });

            }
            catch (Exception ex)
            {
                JSONString = JsonConvert.SerializeObject(
                   new
                   {
                       returnStatus = "Fail",
                       returnMsg = ex.Message,
                       data = string.Empty,
                   });
            }
            return JSONString;
        }
    }
}
