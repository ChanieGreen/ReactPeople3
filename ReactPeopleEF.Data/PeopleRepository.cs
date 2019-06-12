using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ReactPeopleEF.Data
{
    public class PeopleRepository
    {
        private string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IEnumerable<Person> GetPeople()
        {
            using (var context = new PeopleContext(_connectionString))
            {
                return context.People.ToList();
            }
        }

        public void Add(Person person)
        {
            using (var context = new PeopleContext(_connectionString))
            {
                context.People.Add(person);
                context.SaveChanges();
            }
        }

        public void Delete(IEnumerable<int> ids)
        {
            using (var context = new PeopleContext(_connectionString))
            {
                var people = ids.Select(i => new Person {Id = i});
                context.People.RemoveRange(people);
                context.SaveChanges();
            }
        }

        public Person GetPerson(int id)
        {
            using(var context = new PeopleContext(_connectionString))
            {
                return context.People.FirstOrDefault(p => p.Id == id);
            }
        }

        public void EditPerson (Person person)
        {
            using(var context = new PeopleContext(_connectionString))
            {
                context.Database.ExecuteSqlCommand(
                    "UPDATE People SET FirstName = @firstName, LastName = @lastName, Age = @age WHERE Id = @id",
                    new SqlParameter("@id", person.Id),
                    new SqlParameter("@firstName", person.FirstName),
                    new SqlParameter("@lastName", person.LastName),
                    new SqlParameter("@age", person.Age));
            }
        }
    }
}