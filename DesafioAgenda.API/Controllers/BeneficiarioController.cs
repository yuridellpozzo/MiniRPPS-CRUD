using DesafioAgenda.API.Data;
using DesafioAgenda.API.Models;
// Microsoft.AspNetCore.Mvc fornece atributos e classes para construir controladores e ações da Web API.
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DesafioAgenda.API.Controllers
{
    // Define a rota base para o controlador como "api/beneficiario"
    [Route("api/[controller]")]
    // Indica que este controlador responde a solicitações da Web API
    [ApiController]
    public class BeneficiarioController : ControllerBase
    {
        private readonly AppDbContext _context;

        // INJEÇÃO DE DEPENDÊNCIA (Igual ao @Autowired do Spring)
        // O C# injeta o banco de dados aqui automaticamente
        public BeneficiarioController(AppDbContext context)
        {
            _context = context;
        }

        // 1. LISTAR TODOS (GET: api/beneficiario)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beneficiario>>> GetBeneficiarios()
        {
            // O "await" é para não travar o servidor enquanto vai no banco
            return await _context.Beneficiarios.ToListAsync();
        }

        // 2. BUSCAR POR ID (GET: api/beneficiario/5)
        [HttpGet("{id}")]
        public async Task<ActionResult<Beneficiario>> GetBeneficiario(int id)
        {
            var beneficiario = await _context.Beneficiarios.FindAsync(id);

            if (beneficiario == null)
            {
                return NotFound(); // Retorna 404
            }

            return beneficiario;
        }

        // 3. CRIAR NOVO (POST: api/beneficiario)
        [HttpPost]
        public async Task<ActionResult<Beneficiario>> PostBeneficiario(Beneficiario beneficiario)
        {
            _context.Beneficiarios.Add(beneficiario);
            await _context.SaveChangesAsync();

            // Retorna 201 Created e mostra onde consultar o novo item
            return CreatedAtAction("GetBeneficiario", new { id = beneficiario.Id }, beneficiario);
        }

        // 4. ALTERAR (PUT: api/beneficiario/5)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBeneficiario(int id, Beneficiario beneficiario)
        {
            if (id != beneficiario.Id)
            {
                return BadRequest();
            }

            // Marca o objeto como "Modificado" para o Entity Framework saber que precisa updatear
            _context.Entry(beneficiario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Beneficiarios.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Retorna 204 (Sucesso sem conteúdo)
        }

        // 5. DELETAR (DELETE: api/beneficiario/5)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBeneficiario(int id)
        {
            var beneficiario = await _context.Beneficiarios.FindAsync(id);
            if (beneficiario == null)
            {
                return NotFound();
            }

            _context.Beneficiarios.Remove(beneficiario);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}