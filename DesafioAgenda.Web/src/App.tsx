import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import './App.css';

interface Beneficiario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  tipoBeneficio: string;
  dataNascimento: string;
}

function App() {
  const [lista, setLista] = useState<Beneficiario[]>([]);
  const [carregando, setCarregando] = useState(true);
  
  // Estado para saber se estamos Editando alguém (se null, é cadastro novo)
  const [idEmEdicao, setIdEmEdicao] = useState<number | null>(null);

  // Campos do Formulário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("");
  const [nascimento, setNascimento] = useState("");

  // --- FUNÇÕES AUXILIARES ---

  // Transforma "2023-12-25" em "25/12/2023" visualmente
  const formatarDataBR = (data: string) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  // --- 1. BUSCAR (GET) ---
  const buscarDados = async () => {
    try {
      const resposta = await axios.get('http://localhost:5166/api/Beneficiario');
      setLista(resposta.data);
      setCarregando(false);
    } catch (erro) {
      alert("Erro ao buscar dados!");
    }
  };

  // --- 2. SALVAR (CADASTRAR ou ATUALIZAR) ---
  const salvar = async (event: FormEvent) => {
    event.preventDefault();

    // REGRA DE NEGÓCIO: Validação de Data Futura
    const dataEscolhida = new Date(nascimento);
    const hoje = new Date();
    // Zeramos a hora de "hoje" para comparar apenas a data
    hoje.setHours(0, 0, 0, 0); 
    // Ajuste de fuso horário simples (adiciona 12h para garantir que caia no dia certo na comparação)
    const dataEscolhidaAjustada = new Date(dataEscolhida.getTime() + 12 * 60 * 60 * 1000);

    if (dataEscolhidaAjustada > hoje) {
      alert("⚠️ Erro: A data de nascimento não pode ser no futuro!");
      return; // Para tudo aqui
    }

    try {
      const dadosUsuario = {
        id: idEmEdicao || 0, // Se for novo manda 0, se for edição manda o ID
        nome: nome,
        cpf: cpf,
        email: email,
        tipoBeneficio: tipo,
        dataNascimento: nascimento
      };

      if (idEmEdicao === null) {
        // MODO CRIAR (POST)
        await axios.post('http://localhost:5166/api/Beneficiario', dadosUsuario);
        alert("Cadastrado com sucesso!");
      } else {
        // MODO EDITAR (PUT)
        await axios.put(`http://localhost:5166/api/Beneficiario/${idEmEdicao}`, dadosUsuario);
        alert("Atualizado com sucesso!");
        setIdEmEdicao(null); // Sai do modo edição
      }
      
      limparFormulario();
      buscarDados(); // Atualiza a tabela

    } catch (erro) {
      console.error(erro);
      alert("Erro ao salvar! Verifique o console.");
    }
  };

  // --- 3. PREPARAR EDIÇÃO (Joga os dados no formulário) ---
  const editar = (item: Beneficiario) => {
    setNome(item.nome);
    setCpf(item.cpf);
    setEmail(item.email);
    setTipo(item.tipoBeneficio);
    setNascimento(item.dataNascimento);
    setIdEmEdicao(item.id); // Liga o "Modo Edição"
  };

  // --- 4. EXCLUIR (DELETE) ---
  const deletar = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      try {
        await axios.delete(`http://localhost:5166/api/Beneficiario/${id}`);
        buscarDados();
      } catch (erro) {
        alert("Erro ao excluir.");
      }
    }
  };

  const limparFormulario = () => {
    setNome(""); setCpf(""); setEmail(""); setTipo(""); setNascimento("");
    setIdEmEdicao(null);
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>🚀 Gestão Completa (CRUD)</h1>

      {/* --- FORMULÁRIO INTELIGENTE --- */}
      <div style={{ background: '#eee', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: idEmEdicao ? '2px solid orange' : 'none' }}>
        <h3>{idEmEdicao ? `✏️ Editando Beneficiário #${idEmEdicao}` : "➕ Novo Beneficiário"}</h3>
        
        <form onSubmit={salvar} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
          <input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} required />
          <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Tipo Benefício" value={tipo} onChange={e => setTipo(e.target.value)} required />
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{fontSize: '12px'}}>Data Nascimento:</label>
            <input type="date" value={nascimento} onChange={e => setNascimento(e.target.value)} required />
          </div>

          {/* Botões do Formulário */}
          <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
            <button type="submit" style={{ 
              backgroundColor: idEmEdicao ? '#ffc107' : '#28a745', 
              color: idEmEdicao ? 'black' : 'white', 
              padding: '10px 20px', border: 'none', cursor: 'pointer', marginRight: '10px', fontWeight: 'bold' 
            }}>
              {idEmEdicao ? "💾 Salvar Alterações" : "✅ Cadastrar"}
            </button>

            {idEmEdicao && (
              <button type="button" onClick={limparFormulario} style={{ padding: '10px', cursor: 'pointer' }}>
                Cancelar Edição
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- TABELA COMPLETA --- */}
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <table width="100%" border={1} cellPadding={8} style={{ borderCollapse: 'collapse', borderColor: '#ddd' }}>
          <thead style={{ background: '#007bff', color: 'white' }}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Benefício</th>
              <th>Nascimento (BR)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item) => (
              <tr key={item.id} style={{ textAlign: 'center', backgroundColor: idEmEdicao === item.id ? '#fff3cd' : 'white' }}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.cpf}</td>
                <td>{item.email}</td>
                <td>{item.tipoBeneficio}</td>
                {/* AQUI APLICAMOS A MÁSCARA BR */}
                <td>{formatarDataBR(item.dataNascimento)}</td>
                <td>
                  <button 
                    onClick={() => editar(item)}
                    style={{ background: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer', marginRight: '5px', borderRadius: '4px' }}
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => deletar(item.id)}
                    style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;