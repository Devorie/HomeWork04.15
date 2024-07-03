using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeWork0415.Data
{
    public class PersonRepository
    {
        private readonly string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }

        public List<Car> GetAllCars(int PersonId)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == PersonId).ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void AddCar(Car car)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }
        public void DeleteCars(int PersonId)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Cars.RemoveRange(context.Cars.Where(c => c.PersonId == PersonId));
            context.SaveChanges();
        }

        public Person Get(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
    }
}
