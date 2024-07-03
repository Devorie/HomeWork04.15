using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using HomeWork0415.Data;
using HomeWork0415.Web.Models;

namespace HomeWork0415.Web.Controllers
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

        [Route("getall")]
        public List<Person> GetPeople()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car car)
        {
            var repo = new PersonRepository(_connectionString);
            repo.AddCar(car);
        }

        [HttpPost]
        [Route("deletecars")]
        public void DeleteCars(DeleteCarsViewModel vm)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteCars(vm.PersonId);
        }

        [HttpGet]
        [Route("getcars")]
        public List<Car> GetCars(DeleteCarsViewModel vm)
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAllCars(vm.PersonId);
        }

        [HttpGet]
        [Route("getperson")]
        public Person GetById(int id)
        {
            var repo = new PersonRepository(_connectionString);
            return repo.Get(id);
        }

    }
}
