using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeopleEF.Web.Models
{
    public class DeleteViewModel
    {
        public IEnumerable<int> PersonIds { get; set; }
    }
}
