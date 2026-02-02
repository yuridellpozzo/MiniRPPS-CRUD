using DesafioAgenda.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DesafioAgenda.API.Data
{
    // o DbContext representa uma sessão com o banco de dados e pode ser usado para consultar e salvar instâncias das entidades.
    public class AppDbContext : DbContext
    {
        // o Construtotor: recebe as opções de configuração do DbContext, que são passadas para a classe base DbContext por meio da palavra-chave base
        // como a string de conexão.
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        //Cria-se uma tabela de acesso para Beneficiarios.
        public DbSet<Beneficiario> Beneficiarios { get; set; }
    }
}