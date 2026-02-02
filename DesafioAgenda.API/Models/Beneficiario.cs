using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DesafioAgenda.API.Models
{
    //Usar [Table antes do ("") com o nome da tabala no bd, ficando assim: [Table("beneficiarios")]
    [Table("beneficiarios")]
    public class Beneficiario
    {
        [Key] //usar sempre para chaves Primarias no BD.
        [Column("id")] //Mapeia apontando para a coluna Id do BD.
        public int Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; } = string.Empty; // string.Empty indica que Inicia vazio para não dar erro de nulo no BD.

        [Column("cpf")]
        public string Cpf { get; set; } = string.Empty;

        [Column("email")]
        public string? Email { get; set; } // O ? indic que pode aceitar nulo para esta coluna.

        [Column("tipobeneficio")]
        public string TipoBeneficio { get; set; } = string.Empty;

        [Column("datanascimento")]
        public DateOnly DataNascimento { get; set; }
    }
}