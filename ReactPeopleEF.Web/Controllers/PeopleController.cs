using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleEF.Data;
using ReactPeopleEF.Web.Models;

namespace ReactPeopleEF.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public IEnumerable<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        [Route("delete")]
        public void DeleteMany(DeleteViewModel dvm)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(dvm.PersonIds);
        }

        [HttpGet]
        [Route("getperson")]
        public Person GetPerson(int personId)
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetPerson(personId);
        }

        [HttpPost]
        [Route("edit")]
        public void EditPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.EditPerson(person);
        }
    }
}