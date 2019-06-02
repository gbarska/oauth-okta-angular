using SugarLevelTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebApplication1.Controllers
{
    public class DefaultController : ApiController
    {
        // GET: api/SugarLevels
        public List<SugarLevel> Get()
        {
            var lista = new List<SugarLevel>();
            lista.Add(new SugarLevel());
            return lista;
            
        }

        // GET: api/SugarLevels/5
        [ResponseType(typeof(SugarLevel))]
        public async Task<IHttpActionResult> Get(int id)
        {
            SugarLevel sugarLevel = new SugarLevel();
            if (sugarLevel == null)
            {
                return NotFound();
            }

            return Ok(sugarLevel);
        }

        // POST: api/Default
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Default/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Default/5
        public void Delete(int id)
        {
        }
    }
}
